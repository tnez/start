module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:unicorn/recommended',
		'prettier',
		'turbo',
	],
	env: {
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	ignorePatterns: ['node_modules/', 'dist/', 'coverage/', 'build/'],
}
