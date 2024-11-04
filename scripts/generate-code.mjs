import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { resolve as resolvePath, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const ls = readdirSync(resolvePath(__dirname, '../src/views'));

const results = {};
for (const name of ls) {
  console.log(`Process: ${name}`);
  const filePath = resolvePath(__dirname, '../src/views', name);
  const content = readFileSync(filePath).toString();

  const rx = /<template.*?>((.|\n)*)<\/template>/gm;

  let rel = rx.exec(content);

  if (!rel) continue;

  const rpl = /<Playground.*?(id.*?=.*?\"(?<id>.*?)\".*?){1}.*?>(?<code>(.|\n)*?)<\/Playground>/gm;
  let rel2;

  while ((rel2 = rpl.exec(rel[1]))) {
    const id = rel2.groups.id;
    const code = rel2.groups.code;

    console.log(`+ Generate: ${id}`);

    const minTab = Math.min(
      ...code
        .split('\n')
        .filter((i) => i.trim())
        .map((line) => {
          let i;
          for (i = 0; i < line.length && line[i] === ' '; i++) {}
          return i;
        }),
    );
    results[id] = code.replace(new RegExp(`^\\s{${minTab}}`, 'gm'), '').trim();
  }
}

writeFileSync(resolvePath(__dirname, '../src/code.ts'), `export default ${JSON.stringify(results, null, 2)}`);
