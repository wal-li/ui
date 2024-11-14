import camelcase from 'camelcase';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

import { basename, extname, join } from 'node:path';

function getIcons() {
  const ls = readdirSync(`./heroicons/optimized/24/solid`);

  return ls.map((i) => basename(i, extname(i)));
}

const data = getIcons();
const template = readFileSync('./templates/Icon.vue').toString();

if (!existsSync('./src/icons')) mkdirSync('./src/icons', { recursive: true });

const result = [];
let cjsIndex = '';
let mjsIndex = '';

for (const name of data) {
  const componentName = camelcase(name, { pascalCase: true }) + 'Icon';
  let content = template;

  let outline = readFileSync(join('./heroicons/optimized/24/outline', name + '.svg'))
    .toString()
    .replace('viewBox="0 0 24 24"', 'viewBox="2 2 20 20"');
  let solid = readFileSync(join('./heroicons/optimized/24/solid', name + '.svg'))
    .toString()
    .replace('viewBox="0 0 24 24"', 'viewBox="2 2 20 20"');

  content = content.replace(`<!-- outline -->`, outline);
  content = content.replace(`<!-- solid -->`, solid);

  writeFileSync(join('./src/icons', componentName + '.vue'), content);

  cjsIndex += `module.exports.${componentName} = require("./${componentName}.cjs");\n`;
  mjsIndex += `export { default as ${componentName} } from './${componentName}.mjs';\n`;

  result.push({
    name,
    componentName,
  });
}

if (!existsSync('./dist/icons')) mkdirSync('./dist/icons', { recursive: true });
writeFileSync('./dist/icons/index.cjs', cjsIndex);
writeFileSync('./dist/icons/index.mjs', mjsIndex);

writeFileSync('./src/icons.ts', `export default ${JSON.stringify(result, null, 2)}`);
