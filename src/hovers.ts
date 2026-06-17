const md = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, s, i) => acc + s + (i < values.length ? String(values[i]) : ''), '');

export const HOVER_MAP: Record<string, string> = {

  // ── Structural keywords ───────────────────────────────────────────────────

  then: md`**then** — begins the body of an \`if\` or \`elif\` branch
\`\`\`zsh
if [[ condition ]]; then
  ...
fi
\`\`\``,

  elif: md`**elif** — else-if branch within an \`if\` statement
\`\`\`zsh
if [[ condition ]]; then
  ...
elif [[ other ]]; then
  ...
else
  ...
fi
\`\`\``,

  else: md`**else** — fallback branch of an \`if\` statement; runs when no prior condition matched
\`\`\`zsh
if [[ condition ]]; then
  ...
else
  ...
fi
\`\`\``,

  fi: md`**fi** — ends an \`if\` statement (\`if\` spelled backwards)
\`\`\`zsh
if [[ condition ]]; then
  ...
fi
\`\`\``,

  do: md`**do** — begins the body of a \`for\`, \`while\`, \`until\`, or \`select\` loop
\`\`\`zsh
for item in list; do
  ...
done

while [[ condition ]]; do
  ...
done
\`\`\``,

  done: md`**done** — ends a \`for\`, \`while\`, \`until\`, or \`select\` loop
\`\`\`zsh
for item in list; do
  ...
done
\`\`\``,

  in: md`**in** — introduces the list in a \`for\`, \`case\`, or \`select\` construct
\`\`\`zsh
for item in one two three; do ...

case $var in
  pattern) ... ;;
esac

select item in list; do ...
\`\`\``,

  esac: md`**esac** — ends a \`case\` statement (\`case\` spelled backwards)
\`\`\`zsh
case $var in
  pattern) ... ;;
esac
\`\`\``,

  end: md`**end** — ends a \`foreach\` loop *(zsh csh-style)*
\`\`\`zsh
foreach f (*.txt)
  echo $f
end
\`\`\``,

  // ── Control flow ──────────────────────────────────────────────────────────

  if: md`**if** — conditional branch
\`\`\`zsh
if [[ condition ]]; then
  ...
elif [[ other ]]; then
  ...
else
  ...
fi
\`\`\``,

  for: md`**for** — iterate over a list or counter
\`\`\`zsh
for item in one two three; do
  echo $item
done

# C-style arithmetic loop
for (( i = 0; i < 10; i++ )); do
  echo $i
done

# Glob expansion
for f in **/*.ts; do echo $f; done
\`\`\``,

  while: md`**while** — loop while condition is true
\`\`\`zsh
while [[ condition ]]; do
  ...
done

# Read lines from a file
while IFS= read -r line; do
  echo $line
done < file.txt
\`\`\``,

  until: md`**until** — loop until condition becomes true (opposite of while)
\`\`\`zsh
until [[ -f /tmp/ready ]]; do
  sleep 1
done
\`\`\``,

  case: md`**case** — pattern-matching branch
\`\`\`zsh
case $var in
  start|begin) echo "starting" ;;
  stop)        echo "stopping" ;;
  *.zsh)       echo "zsh file" ;;
  *)           echo "no match" ;;
esac
\`\`\``,

  select: md`**select** — interactive numbered menu
\`\`\`zsh
select color in red green blue quit; do
  [[ $color == quit ]] && break
  echo "You chose: $color"
done
\`\`\``,

  repeat: md`**repeat** — run a command N times *(zsh-specific)*
\`\`\`zsh
repeat 3; do echo "hello"; done

repeat 5 echo "hi"
\`\`\``,

  foreach: md`**foreach** — csh-style loop *(zsh-specific)*
\`\`\`zsh
foreach f (*.txt)
  echo $f
end
\`\`\``,

  function: md`**function** — define a function
\`\`\`zsh
function greet {
  echo "Hello, $1"
}

# Shorthand (POSIX-compatible)
greet() { echo "Hello, $1"; }

# Autoloadable: define body in a file on $fpath
autoload -Uz greet
\`\`\``,

  return: md`**return** — exit a function with a status code
\`\`\`zsh
return 0    # success
return 1    # failure
return      # use last exit status
\`\`\``,

  exit: md`**exit** — exit the shell or script
\`\`\`zsh
exit 0    # success
exit 1    # failure
\`\`\``,

  break: md`**break** — exit a loop
\`\`\`zsh
break      # exit innermost loop
break 2    # exit 2 levels of nesting
\`\`\``,

  continue: md`**continue** — skip to next loop iteration
\`\`\`zsh
continue      # next iteration of innermost loop
continue 2    # continue the outer loop
\`\`\``,

  // ── Variables & scope ─────────────────────────────────────────────────────

  local: md`**local** — declare a variable scoped to the current function
\`\`\`zsh
function example {
  local name="value"
  local -i count=0       # integer
  local -a items=()      # indexed array
  local -A map=()        # associative array
  local -r CONST="x"     # readonly
}
\`\`\``,

  typeset: md`**typeset** — declare variables with attributes *(zsh/ksh)*
\`\`\`zsh
typeset -i  count=0       # integer (arithmetic coercion)
typeset -A  config        # associative array
typeset -a  files         # indexed array
typeset -r  PI=3.14159    # readonly
typeset -x  PATH          # export to environment
typeset -U  path          # keep unique values only
typeset -l  lower="ABC"   # auto-lowercase
typeset -u  upper="abc"   # auto-uppercase
typeset -g  global        # global scope inside a function
\`\`\``,

  declare: md`**declare** — alias for typeset in zsh/bash
\`\`\`zsh
declare -i count=0
declare -A map=([key]=value)
declare -a arr=(one two three)
\`\`\``,

  export: md`**export** — mark variables for the environment
\`\`\`zsh
export PATH="$HOME/bin:$PATH"
export EDITOR=vim

# Unexport (remove from env, keep value)
export -n VAR
\`\`\``,

  unset: md`**unset** — remove a variable or function
\`\`\`zsh
unset var         # unset variable
unset -f func     # unset function
unset 'arr[2]'    # unset one array element
\`\`\``,

  readonly: md`**readonly** — make a variable immutable
\`\`\`zsh
readonly CONST=value
readonly -A map
\`\`\``,

  // ── I/O & streams ─────────────────────────────────────────────────────────

  echo: md`**echo** — print to stdout
\`\`\`zsh
echo "text"
echo -n "no newline"
echo -e "with\\tescapes"

# Prefer print in zsh for reliable escape handling
print -P '%F{green}ok%f'
\`\`\``,

  print: md`**print** — zsh's enhanced output builtin *(zsh-specific)*
\`\`\`zsh
print "text"
print -n "no newline"
print -l one two three   # one item per line
print -c one two three   # columnated
print -P '%F{red}error%f %B%S$var%s%b'  # prompt escapes
print -z "git status"    # push to the input buffer (ZLE)
print -r -- "$raw"       # no escape processing
\`\`\``,

  read: md`**read** — read input into variables
\`\`\`zsh
read -r line              # one line, no backslash interpretation
read -A words             # split into array (zsh: -A, bash: -a)
read -s password          # silent (no echo)
read -t 10 input          # timeout after 10 seconds
read -p "Prompt: " answer # (bash compat; zsh uses vared for interactive)
read first rest < file    # read from file
\`\`\``,

  // ── Zsh builtins ──────────────────────────────────────────────────────────

  setopt: md`**setopt** — enable shell options *(zsh-specific)*
\`\`\`zsh
setopt EXTENDED_GLOB      # #, ~, ^ patterns
setopt NO_CASE_GLOB       # case-insensitive globs
setopt GLOB_DOTS          # match dotfiles without leading dot
setopt AUTO_CD            # type dir name to cd into it
setopt HIST_IGNORE_DUPS   # skip duplicate history entries
setopt HIST_IGNORE_SPACE  # skip commands starting with space
setopt SHARE_HISTORY      # share history across sessions
setopt NULL_GLOB          # failed globs expand to nothing
setopt CORRECT            # suggest corrections for typos
\`\`\`
See \`man zshoptions\` for the full list.`,

  unsetopt: md`**unsetopt** — disable shell options *(zsh-specific)*
\`\`\`zsh
unsetopt BEEP             # no bell on errors
unsetopt CASE_GLOB        # re-enable case-sensitive globs
\`\`\`
See \`man zshoptions\` for the full list.`,

  autoload: md`**autoload** — lazily load a function from \`$fpath\` *(zsh-specific)*
\`\`\`zsh
autoload -Uz compinit     # load compinit; -U = no alias expansion, -z = zsh style
autoload -Uz vcs_info
autoload -Uz add-zsh-hook

# Define myfunc in a file named 'myfunc' somewhere in $fpath
autoload -Uz myfunc
\`\`\``,

  bindkey: md`**bindkey** — bind keys to ZLE widgets *(zsh-specific)*
\`\`\`zsh
bindkey -e                   # emacs key bindings (default)
bindkey -v                   # vi key bindings

bindkey '^R' history-incremental-search-backward
bindkey '^[[A' up-line-or-search    # up arrow
bindkey '^[[B' down-line-or-search  # down arrow
bindkey '^[[1;5C' forward-word      # ctrl+right

# List all bindings
bindkey
\`\`\``,

  zle: md`**zle** — Zsh Line Editor control *(zsh-specific)*
\`\`\`zsh
# Define and register a custom widget
my-widget() { BUFFER="git status"; zle accept-line; }
zle -N my-widget
bindkey '^G' my-widget

zle reset-prompt      # redraw the prompt (e.g. after async update)
zle -la               # list all widgets
\`\`\``,

  compinit: md`**compinit** — initialize the completion system *(zsh-specific)*
\`\`\`zsh
autoload -Uz compinit
compinit                          # basic init
compinit -d ~/.cache/zsh/zcompdump  # custom dump file

# Faster: only rebuild dump once a day
if [[ -n ~/.zcompdump(#qN.mh+24) ]]; then
  compinit
else
  compinit -C
fi
\`\`\``,

  compdef: md`**compdef** — assign a completion function to a command *(zsh-specific)*
\`\`\`zsh
compdef _git mygit          # use _git completions for mygit
compdef myfunc=git          # clone git's completions for myfunc
compdef '_files -g "*.json"' jsonlint  # custom spec
\`\`\``,

  zstyle: md`**zstyle** — configure completion and other zsh subsystems *(zsh-specific)*
\`\`\`zsh
zstyle ':completion:*' menu select
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}' # case-insensitive
zstyle ':completion:*' list-colors "\${(s.:.)LS_COLORS}"
zstyle ':completion:*:descriptions' format '%B%d%b'
zstyle ':vcs_info:git:*' formats '%b'
\`\`\``,

  zmodload: md`**zmodload** — load a zsh module *(zsh-specific)*
\`\`\`zsh
zmodload zsh/datetime    # $EPOCHSECONDS, strftime
zmodload zsh/mathfunc    # sin(), cos(), log(), etc.
zmodload zsh/stat        # zstat builtin
zmodload zsh/net/tcp     # TCP socket builtins
zmodload zsh/zprof       # profiling (use with zprof at end)
zmodload zsh/parameter   # access to $functions, $commands, etc.
\`\`\``,

  zparseopts: md`**zparseopts** — parse options from \`$@\` *(zsh-specific)*
\`\`\`zsh
local -A opts
zparseopts -D -E -A opts -- f: v h

# -D: remove parsed options from $@
# -E: stop at first non-option
# -A: store in associative array
# f: means -f takes an argument

[[ -n $opts[-v] ]] && echo "verbose"
[[ -n $opts[-f] ]] && echo "file: $opts[-f]"
\`\`\``,

  vared: md`**vared** — interactively edit a variable *(zsh-specific)*
\`\`\`zsh
vared PATH
vared -p 'Enter name: ' -c name
\`\`\``,

  fc: md`**fc** — manipulate the history list
\`\`\`zsh
fc -l         # list recent history
fc -l 1 20    # list entries 1–20
fc -l -10     # last 10 entries
fc            # open last command in $EDITOR
fc -e vim     # open last command in vim
fc -e - s/foo/bar/  # replace and re-execute
\`\`\``,

  // ── Navigation ────────────────────────────────────────────────────────────

  cd: md`**cd** — change directory
\`\`\`zsh
cd              # go to $HOME
cd -            # go to previous directory
cd -2           # jump to stack entry 2 (with AUTO_PUSHD)
cd /old /new    # replace 'old' with 'new' in $PWD (zsh-specific)
\`\`\``,

  pushd: md`**pushd** — push directory onto the stack and cd
\`\`\`zsh
pushd ~/projects    # cd and push current dir onto stack
pushd +2            # rotate stack to entry 2
pushd -q ~/tmp      # quiet (no printing)
\`\`\``,

  popd: md`**popd** — pop directory from the stack and cd
\`\`\`zsh
popd         # cd to top of stack, remove it
popd +2      # remove entry 2 without cd
popd -q      # quiet
\`\`\``,

  dirs: md`**dirs** — display the directory stack
\`\`\`zsh
dirs         # show stack
dirs -v      # with index numbers
dirs -p      # one per line
dirs -c      # clear the stack
\`\`\``,

  // ── Process control ───────────────────────────────────────────────────────

  source: md`**source** — execute a file in the current shell
\`\`\`zsh
source ~/.zshrc
source ~/.zshenv

# POSIX alias
. ~/.profile
\`\`\``,

  jobs: md`**jobs** — list background jobs
\`\`\`zsh
jobs          # list all jobs
jobs -l       # with PIDs
jobs -r       # running only
jobs -s       # stopped only
\`\`\``,

  disown: md`**disown** — remove job from job table so it survives shell exit
\`\`\`zsh
disown %1         # detach job 1
disown -h %1      # mark: don't send SIGHUP on exit
disown %%         # detach most recent job
\`\`\``,

  wait: md`**wait** — wait for background jobs to finish
\`\`\`zsh
wait          # wait for all background jobs
wait $!       # wait for last background process
wait $pid     # wait for specific PID
\`\`\``,

  trap: md`**trap** — run a command when a signal is received
\`\`\`zsh
trap 'echo "exiting"' EXIT
trap 'echo "interrupted"' INT
trap 'cleanup' ERR

trap -        # reset all signals to default
trap - INT    # reset INT to default
trap '' TSTP  # ignore Ctrl-Z
\`\`\``,

  exec: md`**exec** — replace the shell process or redirect file descriptors
\`\`\`zsh
exec zsh                  # replace current shell with a new zsh
exec env -i zsh           # clean environment

exec 3< input.txt         # open fd 3 for reading
exec 4> output.txt        # open fd 4 for writing
exec > output.log 2>&1    # redirect all output for the rest of the script
exec 3>&-                 # close fd 3
\`\`\``,

  // ── Misc builtins ─────────────────────────────────────────────────────────

  alias: md`**alias** — define command shortcuts
\`\`\`zsh
alias ll='ls -lahF'
alias g=git

# Global alias: expands anywhere in a command line (zsh-specific)
alias -g L='| less'
alias -g G='| grep'
alias -g NE='2>/dev/null'

# Suffix alias: open matched files with the given program (zsh-specific)
alias -s txt=vim
alias -s pdf=open

# List all aliases
alias
\`\`\``,

  unalias: md`**unalias** — remove an alias
\`\`\`zsh
unalias ll
unalias -a    # remove all aliases
\`\`\``,

  eval: md`**eval** — evaluate a string as shell code
\`\`\`zsh
eval "\$(brew shellenv)"
eval "\$(ssh-agent -s)"
eval "result_\$key=value"  # dynamic variable names (prefer typeset -g)
\`\`\``,

  shift: md`**shift** — remove positional parameters from the left
\`\`\`zsh
shift         # remove $1, shift $2→$1 etc.
shift 2       # remove $1 and $2
\`\`\``,

  getopts: md`**getopts** — parse short options in a script
\`\`\`zsh
while getopts ":f:vq" opt; do
  case $opt in
    f) file=$OPTARG ;;
    v) verbose=1 ;;
    q) quiet=1 ;;
    :) echo "Option -$OPTARG requires an argument" ;;
    ?) echo "Unknown option: -$OPTARG" ;;
  esac
done
shift $(( OPTIND - 1 ))   # remove parsed options from $@
\`\`\``,

  time: md`**time** — time a pipeline or command
\`\`\`zsh
time sleep 1
time ( make && make test )

# Configure output format
TIMEFMT='%J  %U user  %S sys  %E real  %P cpu'
\`\`\``,

  coproc: md`**coproc** — start a coprocess (bidirectional pipe) *(zsh/bash)*
\`\`\`zsh
coproc cat -n
echo "hello" >&p
read -p line
echo $line
\`\`\``,

  noglob: md`**noglob** — disable filename expansion for one command *(zsh-specific)*
\`\`\`zsh
noglob find . -name '*.ts'   # * is passed literally
noglob rsync src/* dest/
\`\`\``,

  nocorrect: md`**nocorrect** — disable spelling correction for one command *(zsh-specific)*
\`\`\`zsh
nocorrect mkdir mynewdir
\`\`\``,

  command: md`**command** — bypass aliases and functions; run the external command directly
\`\`\`zsh
command ls          # run /bin/ls, not any alias named ls
command -v git      # print path to git (POSIX: like which)
command -p ls       # use default $PATH
\`\`\``,

  builtin: md`**builtin** — call a builtin directly, bypassing any function of the same name
\`\`\`zsh
builtin cd ..       # call the cd builtin, not a cd function
builtin echo "hi"
\`\`\``,

  // ── Query & lookup ────────────────────────────────────────────────────────

  whence: md`**whence** — describe how a name would be interpreted *(zsh-specific)*
\`\`\`zsh
whence ls           # /bin/ls
whence -v ls        # ls is /bin/ls
whence -a python    # all matches in $PATH
whence -f myfunc    # print function body
\`\`\``,

  where: md`**where** — show all locations of a command *(zsh-specific)*
\`\`\`zsh
where python        # lists every python in $PATH
where ls
\`\`\``,

  which: md`**which** — locate a command
\`\`\`zsh
which git           # /usr/bin/git
which -a python     # all matches

# Prefer whence -v in zsh for full detail
\`\`\``,

  type: md`**type** — describe a command name
\`\`\`zsh
type ls             # ls is /bin/ls
type ll             # ll is an alias for ...
type compinit       # compinit is a shell function
\`\`\``,

  hash: md`**hash** — manipulate the command hash table
\`\`\`zsh
hash                # show entire hash table
hash git            # add git to the hash table
hash -d proj=~/projects   # named directory hash (zsh-specific)
rehash              # rebuild command hash (alias: hash -r)
\`\`\``,

  rehash: md`**rehash** — rebuild the command hash table after installing new executables
\`\`\`zsh
rehash    # picks up new commands added to $PATH
\`\`\``,

  emulate: md`**emulate** — set zsh emulation mode *(zsh-specific)*
\`\`\`zsh
emulate bash         # emulate bash for rest of script
emulate -L sh        # emulate sh, local to current scope
emulate -LR zsh      # reset to native zsh behavior, local scope

# Common pattern: make a function portable
my_func() {
  emulate -L zsh
  setopt LOCAL_OPTIONS EXTENDED_GLOB
  ...
}
\`\`\``,

  limit: md`**limit** — set or show resource limits *(zsh-specific; prefer ulimit)*
\`\`\`zsh
limit               # show all limits
limit coredumpsize 0    # disable core dumps
limit -s            # set as soft limit
\`\`\``,

  sched: md`**sched** — schedule a command to run after a delay *(zsh-specific)*
\`\`\`zsh
sched +10 echo "10 seconds elapsed"
sched +1:00 notify "1 minute"
sched        # list scheduled events
sched -1     # remove first scheduled event
\`\`\``,

  // ── Output & formatting ───────────────────────────────────────────────────

  printf: md`**printf** — formatted output (more portable than echo)
\`\`\`zsh
printf '%s\\n' "hello"
printf '%-20s %d\\n' "$name" "$count"
printf '%05d\\n' 42        # 00042
printf '%x\\n' 255         # ff
printf -v var '%s' "value" # store in variable (bash/zsh)
\`\`\``,

  // ── Process & environment ─────────────────────────────────────────────────

  kill: md`**kill** — send a signal to a process or job
\`\`\`zsh
kill %1             # SIGTERM to job 1
kill -9 $pid        # SIGKILL by PID
kill -STOP %2       # pause job 2
kill -CONT %2       # resume job 2
kill -l             # list all signal names
\`\`\``,

  true: md`**true** — return exit status 0 (success)
\`\`\`zsh
true                     # always succeeds
command || true          # ignore failure
while true; do ...; done # infinite loop
\`\`\``,

  false: md`**false** — return exit status 1 (failure)
\`\`\`zsh
false                    # always fails
false || echo "fallback"
\`\`\``,

  pwd: md`**pwd** — print the current working directory
\`\`\`zsh
pwd           # print $PWD (resolves symlinks by default in zsh)
pwd -P        # physical path (resolve all symlinks)
pwd -L        # logical path (use $PWD as-is)
\`\`\``,

  umask: md`**umask** — get or set the file creation mask
\`\`\`zsh
umask           # show current mask (e.g. 022)
umask 027       # new files: owner rw, group r, others nothing
umask -S        # symbolic display (e.g. u=rwx,g=rx,o=rx)
\`\`\``,

  ulimit: md`**ulimit** — get or set resource limits
\`\`\`zsh
ulimit -a           # show all limits
ulimit -n 4096      # max open file descriptors
ulimit -c 0         # disable core dumps
ulimit -s unlimited # unlimited stack size
\`\`\``,

  suspend: md`**suspend** — suspend the shell (send SIGSTOP to itself)
\`\`\`zsh
suspend    # pause; resume with fg in parent shell
\`\`\``,

  '[[': md`**[[** — extended conditional expression *(preferred over \`[\` in zsh/bash)*
\`\`\`zsh
# File tests
[[ -f file ]]      # exists and is a regular file
[[ -d dir ]]       # directory exists
[[ -e path ]]      # exists (any type)
[[ -s file ]]      # exists and non-empty
[[ -r file ]]      # readable; also -w (writable), -x (executable)

# String tests
[[ -z "$str" ]]           # empty
[[ -n "$str" ]]           # non-empty
[[ "$a" == "$b" ]]        # equal (no word-splitting; glob on right side ok)
[[ "$a" != "$b" ]]        # not equal
[[ "$a" < "$b" ]]         # lexicographic less-than

# Regex match (zsh/bash 3.2+)
[[ "$str" =~ ^[0-9]+$ ]]  # captured groups in $match (zsh) / $BASH_REMATCH (bash)

# Combine
[[ -f file && -r file ]]
[[ -z "$a" || -z "$b" ]]
\`\`\``,

  '((': md`**(( ))** — arithmetic evaluation
\`\`\`zsh
(( count++ ))
(( total = a + b ))
(( n > 10 )) && echo "big"

if (( n % 2 == 0 )); then
  echo "even"
fi

(( result = 2 ** 10 ))   # 1024
\`\`\``,
};
