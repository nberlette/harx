const { parse, format, basename } = require('path');
const { 
	copyFileSync: copyFile, 
	existsSync: exists, 
	writeFileSync: writeFile, 
	chmodSync: chmod 
} = require('fs');
const { rewrite, save, table } = require('./format');
const { build } = require('./esbuild');
const pkg = require('../package.json');

const externals = ['harx', ...Object.keys(pkg.dependencies)];

/**
 * @param {string} input
 * @param {Record<'import'|'require', string>} files
 */
async function bundle(input, files, executable = false) {
	let cjs = save(files.require)
	  , mjs = save(files.import)
	  , dts = input.replace(/\.[mc]?[tj]s$/, '.d.ts');

	await build(input, mjs, externals);
	let commonjs = rewrite(files.import);
	if (executable) {
		chmod(mjs, 0755);
		chmod(cjs, 0755);
		commonjs = ['#!/usr/bin/env node', '"use strict";', '', commonjs].join('\n');
	}
	writeFile(cjs, commonjs);

	if (!exists(dts)) return console.warn('Missing "%s" file!', dts),process.exitCode=1;

	let info = parse(input);
	info.base = basename(dts);
	info.dir = 'dist';
	copyFile(dts, save(format(info)));
}

/**
 * init
 */
Promise.all([
	bundle('src/harx.ts', pkg.exports['.']),
	bundle('src/cli.ts', pkg.exports['./cli'], true)
]).then(table);
