import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, extname } from 'node:path';

const ls = readdirSync('./src/components');

let cjsIndex = '';
let mjsIndex = '';

for (const name of ls) {
  const componentName = basename(name, extname(name));

  cjsIndex += `module.exports.${componentName} = require("./${componentName}.cjs");\n`;
  mjsIndex += `export { default as ${componentName} } from './${componentName}.mjs';\n`;
}

if (!existsSync('./dist/components')) mkdirSync('./dist/components', { recursive: true });
writeFileSync('./dist/components/index.cjs', cjsIndex);
writeFileSync('./dist/components/index.mjs', mjsIndex);
