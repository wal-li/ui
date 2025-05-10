import { writeFileSync } from 'fs';
import { readdir, readFile, stat } from 'fs/promises';
import { join, resolve } from 'path';

const ENTRIES = [
  '@/components/ui',
  'index.html',
  'tsconfig.json',
  'tsconfig.app.json',
  'vite.config.ts',
  'src/vite-env.d.ts',
  'src/style.css',
];

async function start() {
  const result: Record<string, string> = {};

  for (const entry of ENTRIES) {
    const entryPath = resolve('./web/', entry.replace(/^\@/g, './src'));
    const entries = [];

    if ((await stat(entryPath)).isDirectory()) {
      const ls = await readdir(entryPath);

      for (const fileName of ls) {
        const filePath = join(entryPath, fileName);
        if ((await stat(filePath)).isDirectory()) continue;
        entries.push([join(entry, fileName), filePath]);
      }
    } else {
      entries.push([entry, entryPath]);
    }

    for (const [key, filePath] of entries) {
      if ((await stat(filePath)).isDirectory()) continue;

      const content = await readFile(filePath);

      console.log(`Added ${key}`);
      result[key] = content.toString();
    }
  }

  writeFileSync(resolve('./web/src/sources.json'), JSON.stringify(result));
}

start();
