aral
====

An Agnostic Resources Access Layer system

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/aral.svg)](https://npmjs.org/package/aral)
[![Downloads/week](https://img.shields.io/npm/dw/aral.svg)](https://npmjs.org/package/aral)
[![License](https://img.shields.io/npm/l/aral.svg)](https://github.com/11arn11/aral/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g aral
$ aral COMMAND
running command...
$ aral (-v|--version|version)
aral/0.2.38 darwin-x64 node-v8.11.4
$ aral --help [COMMAND]
USAGE
  $ aral COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`aral autocomplete [SHELL]`](#aral-autocomplete-shell)
* [`aral config`](#aral-config)
* [`aral destroy`](#aral-destroy)
* [`aral destroyAll`](#aral-destroyall)
* [`aral help [COMMAND]`](#aral-help-command)
* [`aral init`](#aral-init)
* [`aral prova [FILE]`](#aral-prova-file)
* [`aral set-host`](#aral-set-host)
* [`aral start`](#aral-start)

## `aral autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ aral autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ aral autocomplete
  $ aral autocomplete bash
  $ aral autocomplete zsh
  $ aral autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.1.0/src/commands/autocomplete/index.ts)_

## `aral config`

```
USAGE
  $ aral config
```

_See code: [src/commands/config.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/config.ts)_

## `aral destroy`

describe the command here

```
USAGE
  $ aral destroy
```

_See code: [src/commands/destroy.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/destroy.ts)_

## `aral destroyAll`

```
USAGE
  $ aral destroyAll
```

_See code: [src/commands/destroyAll.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/destroyAll.ts)_

## `aral help [COMMAND]`

display help for aral

```
USAGE
  $ aral help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `aral init`

describe the command here

```
USAGE
  $ aral init
```

_See code: [src/commands/init.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/init.ts)_

## `aral prova [FILE]`

describe the command here

```
USAGE
  $ aral prova [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/prova.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/prova.ts)_

## `aral set-host`

fix firefox issue adding a row in hosts file

```
USAGE
  $ aral set-host
```

_See code: [src/commands/set-host.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/set-host.ts)_

## `aral start`

```
USAGE
  $ aral start
```

_See code: [src/commands/start.ts](https://github.com/11arn11/aral/blob/v0.2.38/src/commands/start.ts)_
<!-- commandsstop -->
