import { add } from './add';

export async function init() {
  await add(['style', 'tsconfig', 'tsconfig-app', 'vite-config', 'vite-env-d'], true);
}
