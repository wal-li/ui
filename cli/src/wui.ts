#!/usr/bin/env node

import { program } from 'commander';
import { add } from './add';
import { init } from './init';

program.name('wui').description('wal-li/ui generator').version('3.0.0');

program.command('init').action(() => {
  init();
});

program
  .command('add')
  .argument('<names...>')
  .action((names) => {
    add(names);
  });

program.parse();
