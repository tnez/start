import { Command } from 'clipanion'
import prompts from 'prompts'
import { readFile, unlink, writeFile } from 'node:fs/promises'

export class InitCommand extends Command {
	static paths = [['init']]

	static usage = {
		description: 'Initialize a new project.',
	}

	async execute() {
		const response = await prompts([
			{
				type: 'text',
				name: 'projectName',
				message: 'Choose a name for your project',
			},
			{
				type: 'text',
				name: 'projectDesc',
				message: 'Provide a short description of your project',
			},
		])

		this.context.stdout.write(`...initializing readme\n`)

		await unlink('readme.md')
		await writeFile(
			'readme.md',
			generateReadmeContent({
				name: response.projectName,
				desc: response.projectDesc,
			}),
		)

		this.context.stdout.write(`...updating package.json\n`)
		const packageJsonContents = await readFile('package.json', 'utf-8')
		const newPackageJsonContents = packageJsonContents.replace(
			/"name": "(.*)"/,
			`"name": "${response.projectName}"`,
		)
		await writeFile('package.json', newPackageJsonContents, 'utf-8')

		this.context.stdout.write(`...done 🎉\n`)
	}
}

type GenerateReadeContentInput = {
	name: string
	desc: string
}
function generateReadmeContent({ name, desc }: GenerateReadeContentInput) {
	return `# ${name}

${desc}
`
}
