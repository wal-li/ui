import { cpSync } from 'fs';

import { resolve as resolvePath, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

cpSync(resolvePath(__dirname, '../package.json'), './dist/package.json');
cpSync(resolvePath(__dirname, '../src/theme.css'), './dist/theme.css');
