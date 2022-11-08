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

		const readmeContents = await generateReadmeContent({
			name: response.projectName,
			desc: response.projectDesc,
		})
		await unlink('readme.md')
		await writeFile('readme.md', readmeContents)

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

type GenerateReadmeContentInput = {
	name: string
	desc: string
}
async function generateReadmeContent({
	name,
	desc,
}: GenerateReadmeContentInput) {
	const templateContents = await readFile(
		'packages/cli/templates/readme.md',
		'utf-8',
	)

	return `# ${name}

${desc}

${templateContents}
`
}
