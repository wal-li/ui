import SOURCES from './sources.json';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export async function add(names: string[], overwrite = false) {
  const queue = [...names];

  while (queue.length) {
    const name = queue.shift();

    if (!name) continue;

    if (!(SOURCES as any)[name]) {
      console.error(`${name}: invalid component`);
      continue;
    }

    const source = (SOURCES as any)[name];
    if (!overwrite && existsSync(source.path)) {
      console.error(`${name}: already exists -> skipped`);
      continue;
    }

    const dir = dirname(source.path);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    writeFileSync(source.path, source.content);
    console.error(`${name}: added`);

    for (const dep of source.dependencies) queue.unshift(dep);
  }
}
