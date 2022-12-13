import { Cli } from 'clipanion'
import { HelloCommand } from './commands/hello'
import { InitCommand } from './commands/init'

/* eslint-disable unicorn/prevent-abbreviations */
const [node, app, ...args] = process.argv
/* eslint-enable unicorn/prevent-abbreviations */

const cli = new Cli({
  binaryLabel: `tnez-dev: cli`,
  binaryName: `${node} ${app}`,
  binaryVersion: '0.0.0',
})

cli.register(HelloCommand)
cli.register(InitCommand)
cli.runExit(args)
