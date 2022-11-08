const base = require('./node.cjs')

module.exports = {
	...base,
	extends: [...base.extends, 'plugin:@typescript-eslint/recommended'],
	overrides: [
		{
			files: ['*test.ts'],
			rules: { '@typescript-eslint/no-explicit-any': 'off' },
		},
	],
}
