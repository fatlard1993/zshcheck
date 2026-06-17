import * as vscode from 'vscode';
import { execFile } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { HOVER_MAP } from './hovers';

let collection: vscode.DiagnosticCollection;
let seq = 0;

// Our language contribution (firstLine, extensions, filenames) ensures any file
// we care about gets languageId 'zsh' before we see it. No fallback detection needed.
function isZsh(document: vscode.TextDocument): boolean {
  return document.languageId === 'zsh';
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const DEBOUNCE_MS = 300;
// Tracks the most recent lint version per document so stale async results are dropped.
const lintVersions = new Map<string, number>();
const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

function lint(document: vscode.TextDocument): void {
  const cfg = vscode.workspace.getConfiguration('zshcheck');
  if (!cfg.get<boolean>('enable', true) || !isZsh(document)) {
    collection.delete(document.uri);
    return;
  }

  const key     = document.uri.toString();
  const version = (lintVersions.get(key) ?? 0) + 1;
  lintVersions.set(key, version);

  const zsh     = cfg.get<string>('executablePath', 'zsh');
  const tmpFile = path.join(os.tmpdir(), `zshcheck-${process.pid}-${++seq}.zsh`);

  fs.writeFile(tmpFile, document.getText(), (writeErr) => {
    if (writeErr) { collection.delete(document.uri); return; }

    execFile(zsh, ['-n', tmpFile], (err, _stdout, stderr) => {
      fs.unlink(tmpFile, () => {});

      // Drop results if a newer lint has already started for this document.
      if (lintVersions.get(key) !== version) return;

      if ((err as NodeJS.ErrnoException | null)?.code === 'ENOENT') {
        vscode.window.showErrorMessage(
          `zshcheck: zsh not found at "${zsh}". Set zshcheck.executablePath.`,
        );
        collection.delete(document.uri);
        return;
      }

      // zsh -n: "file:LINE: message" on stderr, exit 0 = clean, exit 1 = errors
      const re = new RegExp(`${escapeRegex(tmpFile)}:(\\d+):\\s*(.+)`, 'g');
      const items: vscode.Diagnostic[] = [];
      let match: RegExpExecArray | null;

      while ((match = re.exec(stderr)) !== null) {
        const line    = Math.max(0, parseInt(match[1], 10) - 1);
        const message = match[2].trim();
        const docLine = document.lineAt(Math.min(line, document.lineCount - 1));
        const range   = new vscode.Range(line, 0, line, docLine.text.length);
        const d       = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error);
        d.source = 'zsh';
        items.push(d);
      }

      collection.set(document.uri, items);
    });
  });
}

function lintDebounced(document: vscode.TextDocument): void {
  const key = document.uri.toString();
  clearTimeout(debounceTimers.get(key));
  debounceTimers.set(key, setTimeout(() => lint(document), DEBOUNCE_MS));
}

const hoverProvider: vscode.HoverProvider = {
  provideHover(document, position) {
    const range = document.getWordRangeAtPosition(position, /\[\[|\(\(|[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!range) return null;
    const word = document.getText(range);
    const content = HOVER_MAP[word];
    if (!content) return null;
    return new vscode.Hover(new vscode.MarkdownString(content), range);
  },
};

export function activate(context: vscode.ExtensionContext): void {
  collection = vscode.languages.createDiagnosticCollection('zshcheck');
  context.subscriptions.push(
    collection,
    vscode.languages.registerHoverProvider({ language: 'zsh' }, hoverProvider),
    vscode.workspace.onDidOpenTextDocument(lint),
    vscode.workspace.onDidSaveTextDocument(lint),
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (vscode.workspace.getConfiguration('zshcheck').get<boolean>('runOnType', false)) {
        lintDebounced(e.document);
      }
    }),
    vscode.workspace.onDidCloseTextDocument((doc) => {
      collection.delete(doc.uri);
      lintVersions.delete(doc.uri.toString());
      clearTimeout(debounceTimers.get(doc.uri.toString()));
      debounceTimers.delete(doc.uri.toString());
    }),
  );
  vscode.workspace.textDocuments.forEach(lint);
}

export function deactivate(): void {
  collection?.clear();
}
