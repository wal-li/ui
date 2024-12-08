import camelcase from 'camelcase';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

import { basename, extname, join } from 'node:path';

function getIcons(dir) {
  const ls = readdirSync(dir);

  return ls.map((i) => basename(i, extname(i)));
}

// heroicons
const data = [
  ...getIcons(`./heroicons/optimized/24/solid`).map((name) => {
    return {
      name,
      solid: join('./heroicons/optimized/24/solid', name + '.svg'),
      outline: join('./heroicons/optimized/24/outline', name + '.svg'),
    };
  }),
  ...getIcons(`./custom-icons`).map((name) => {
    return {
      name,
      solid: join('./custom-icons', name + '.svg'),
      outline: join('./custom-icons', name + '.svg'),
    };
  }),
];
const template = readFileSync('./templates/Icon.vue').toString();

if (!existsSync('./src/icons')) mkdirSync('./src/icons', { recursive: true });

const result = [];
let cjsIndex = '';
let mjsIndex = '';

for (const item of data) {
  const { name } = item;
  const componentName = camelcase(name, { pascalCase: true }) + 'Icon';
  let content = template;

  const outline = readFileSync(item.outline).toString();
  const solid = readFileSync(item.solid).toString();

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
