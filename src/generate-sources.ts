import { writeFileSync } from 'fs';
import { readdir, readFile, stat } from 'fs/promises';
import { basename, extname, join, relative, resolve } from 'path';
import { cwd } from 'process';

const ENTRIES = [
  '@/components/ui',
  '@/icons',
  'index.html',
  'tsconfig.json',
  'tsconfig.app.json',
  'vite.config.ts',
  'src/vite-env.d.ts',
  'src/style.css',
];

type Source = {
  entry: string;
  path: string;
  content: string;
  dependencies: string[];
};

let kebabCase: any;

function pathToName(path: string) {
  return kebabCase(basename(path, extname(path)).replace(/[^a-z0-9]/gi, '-'));
}

async function start() {
  kebabCase = await import('change-case').then((mod) => mod.kebabCase);

  const result: Record<string, Source> = {};

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

    for (const [entry, entryPath] of entries) {
      if ((await stat(entryPath)).isDirectory()) continue;

      // read content
      const content = (await readFile(entryPath)).toString();
      const name = pathToName(entry);

      if (result[name]) {
        throw new Error(
          `Duplicate source "${name}" (${entry} vs ${result[name].entry})`,
        );
      }

      // include delependecies
      const r = /import.*from.*\'(.*)\'/gi;
      const dependencies = [];
      let rel;
      while ((rel = r.exec(content))) {
        dependencies.push(pathToName(rel[1]));
      }

      console.log(`Added ${name} -> ${entry}`);
      result[name] = {
        entry,
        path: relative(resolve('./web'), entryPath),
        content: content,
        dependencies,
      };
    }
  }

  // filter dependencies
  for (const name in result) {
    result[name].dependencies = result[name].dependencies.filter(
      (dep) => dep in result,
    );
  }

  const output = JSON.stringify(result, null, 2);
  writeFileSync(resolve('./web/src/sources.json'), output);
  writeFileSync(resolve('./cli/src/sources.json'), output);
}

start();
