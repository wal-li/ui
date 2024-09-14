import { writeFileSync, readFileSync } from 'fs';

import { resolve as resolvePath, dirname } from 'path';
import { fileURLToPath } from 'url';

function hexToRgb(str) {
  str = str
    .toLowerCase()
    .replace(/[^0-9a-f]/g, '')
    .padEnd(6, '0');
  const r = parseInt(str.substring(0, 2) || '0', 16);
  const g = parseInt(str.substring(2, 4) || '0', 16);
  const b = parseInt(str.substring(4, 6) || '0', 16);

  return [r, g, b].join(' ');
}
const __dirname = dirname(fileURLToPath(import.meta.url));

const colors = JSON.parse(readFileSync(resolvePath(__dirname, '../src/colors.json')));

let content = ':root {\n';

for (const color in colors) {
  if (typeof colors[color] === 'string') {
    content += `\t--${color}: ${hexToRgb(colors[color])};\n`;
    continue;
  }

  for (const key in colors[color]) {
    content += `\t--${color}-${key}: ${hexToRgb(colors[color][key])};\n`;
  }
}

content += '}';

writeFileSync(resolvePath(__dirname, '../src/theme.css'), content);
