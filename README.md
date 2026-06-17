# zshcheck

Zsh syntax checking and hover documentation for VS Code.

Uses `zsh -n` — the actual zsh parser, not a bash approximation. Syntax errors appear as diagnostics. The script never executes.

Hover over any of 83 keywords and builtins for examples: `setopt`, `typeset`, `autoload`, `[[`, `zparseopts`, `foreach`, and more.

## Recognized files

These are recognized as `zsh`:

- `.zsh` extension
- `#!/*zsh` shebang (any filename, with or without extension)
- `.zshrc`, `.zshenv`, `.zprofile`, `.zlogin`, `.zlogout`

This also prevents `timonwong.shellcheck` from running on them and reporting "ShellCheck only supports sh/bash/dash/ksh".

## Requirements

`zsh` on `$PATH`. If it isn't, set `zshcheck.executablePath`.

## Configuration

| Setting | Default | Description |
|---|---|---|
| `zshcheck.enable` | `true` | Kill switch |
| `zshcheck.executablePath` | `"zsh"` | Path to the `zsh` executable |
| `zshcheck.runOnType` | `false` | Lint on every keystroke (300ms debounce) |

## If you have `timonwong.shellcheck` installed

Reload the window after installing zshcheck. It registers the `zsh` language ID; shellcheck won't see those files.

If shellcheck errors persist: check the status bar. The language should show **Zsh**, not **Shell Script**. Shell Script means zshcheck hasn't loaded yet: reload the window or reinstall.
