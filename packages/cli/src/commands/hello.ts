import { Command, Option } from 'clipanion'

export class HelloCommand extends Command {
  // The name of the command
  static paths = [['hello']]
  // The description of the command
  static usage = {
    description: 'Prints a greeting.',
  }
  // The options of the command
  name = Option.String(`-n,--name`, { description: `Your name` })
  // The main method of the command
  async execute() {
    this.context.stdout.write(`Hello, ${this.name}!\n`)
  }
}
