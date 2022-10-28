const base = require('./base.cjs')

module.exports = {
	...base,
	extends: [...base.extends, 'next/core-web-vitals'],
	ignorePatterns: [...base.ignorePatterns, '.next/', 'next-env.d.ts'],
	rules: {
		'@next/next/no-head-element': 'off',
	},
	overrides: [
		{ files: ['*.js', '*.cjs'], rules: { 'unicorn/prefer-module': 'off' } },
	],
}
