import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { resolve as resolvePath, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ls = readdirSync(resolvePath(__dirname, '../src/views'));

for (const name of ['Inputs.vue']) {
  const filePath = resolvePath(__dirname, '../src/views', name);
  const content = readFileSync(filePath).toString();

  const rx = /<template.*?>((.|\n)*)<\/template>/gm;

  let rel = rx.exec(content);
  const $ = cheerio.load(rel[0], { xmlMode: true });
  for (const example of $('Example')) {
    $(example).prop('raw', btoa($(example).html().trim()));
  }

  writeFileSync(filePath, content.split('<template>')[0] + $.xml());

  break;
}
