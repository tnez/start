const base = require('./base.cjs')

module.exports = {
	...base,
	env: {
		...base.env,
		node: true,
	},
}
