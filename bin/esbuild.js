const esbuild = require('esbuild');

/** @type {esbuild.CommonOptions} */
const options = {
	target: 'es2020',
	sourcemap: false,
	treeShaking: true,
	minifySyntax: true,
	minifyIdentifiers: true,
	platform: 'node'
}

/**
 * @param {string} input
 * @param {string} output
 * @param {string[]} [externals]
 */
exports.build = function (input, output, externals=[]) {
	return esbuild.build({
		...options,
		bundle: true,
		format: 'esm',
		outfile: output,
		entryPoints: [input],
		external: externals,
	});
}

/**
 * @param {string} source
 * @param {esbuild.TransformOptions} [overrides]
 */
exports.transform = function (source, overrides={}) {
	return esbuild.transformSync(source, {
		...options, format: 'cjs', ...overrides
	});
}
