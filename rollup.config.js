import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';

import { readdirSync } from 'fs';
import { resolve as resolvePath, join as joinPath, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const INPUT_DIR = './src/';
const OUTPUT_DIR = './dist/';

const entries = [];

readdirSync(resolvePath(__dirname, INPUT_DIR), { withFileTypes: true })
  .filter((dir) => dir.isDirectory() && dir.name !== 'views')
  .forEach(({ name: compName }) => {
    const fileList = readdirSync(resolvePath(__dirname, INPUT_DIR, compName));

    for (const fileName of fileList) {
      const ext = extname(fileName);

      if (ext === '.vue' || ext === '.js') {
        entries.push({
          input: INPUT_DIR + joinPath(compName, fileName),
          output: [
            {
              format: 'es',
              file: OUTPUT_DIR + joinPath(compName, `index.mjs`),
            },
            {
              format: 'cjs',
              file: OUTPUT_DIR + joinPath(compName, `index.cjs`),
            },
          ],
          plugins: [vue()],
        });
      }

      if (ext === '.ts') {
        entries.push({
          input: INPUT_DIR + joinPath(compName, fileName),
          output: [
            {
              format: 'es',
              file: OUTPUT_DIR + joinPath(compName, `index.mjs`),
            },
            {
              format: 'cjs',
              file: OUTPUT_DIR + joinPath(compName, `index.cjs`),
            },
          ],
          plugins: [typescript()],
        });
      }
    }
  });

export default entries;
