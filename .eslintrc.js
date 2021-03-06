module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: 'airbnb-base',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		'no-tabs': 0,
		indent: 0,
		'arrow-parens': 0,
		'wrap-iife': 0,
	},
};
