import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { basename, extname, join } from 'node:path';

const ICON_TEMPLATE = `
<script setup lang="ts">
defineProps(['outlined']);
</script>

<template>
  <template v-if="outlined !== undefined && outlined !== false">
    <!-- outline -->
  </template>
  <template v-else>
    <!-- solid -->
  </template>
</template>
`;

const OUTPUT_DIR = './web/src/icons';
const KEYWORDS = {
  'academic-cap': [
    'degree',
    'diploma',
    'graduation',
    'hat',
    'school',
    'university',
  ],
  'adjustments-horizontal': ['filter', 'settings', 'sliders'],
  'adjustments-vertical': ['filter', 'settings', 'sliders'],
  'archive-box': ['box', 'store'],
  'archive-box-arrow-down': ['box', 'download', 'store'],
  'archive-box-x-mark': ['box', 'cancel', 'delete', 'remove', 'store'],
  'arrow-down-on-square': ['download'],
  'arrow-down-on-square-stack': ['download'],
  'arrow-down-tray': ['download'],
  'arrow-left-on-rectangle': ['logout', 'sign-out'],
  'arrow-path': ['refresh', 'reload', 'restart', 'update'],
  'arrow-right-on-rectangle': ['login', 'sign-in'],
  'arrow-top-right-on-square': ['external'],
  'arrow-trending-down': ['analytics', 'decrease'],
  'arrow-trending-up': ['analytics', 'increase'],
  'arrow-up-on-square': ['upload'],
  'arrow-up-on-square-stack': ['upload'],
  'arrow-up-tray': ['upload'],
  'arrow-uturn-left': ['back', 'previous'],
  'arrow-uturn-right': ['forward', 'next'],
  'arrows-pointing-in': ['collapse'],
  'arrows-pointing-out': ['expand'],
  'arrows-right-left': ['switch'],
  'arrows-up-down': ['switch'],
  'at-symbol': ['@', 'email'],
  backspace: ['delete', 'remove'],
  backward: ['previous', 'rewind'],
  banknotes: ['bill', 'cash', 'money', 'payment', 'price'],
  'bars-2': ['hamburger', 'menu'],
  'bars-3': ['hamburger', 'menu'],
  'bars-4': ['hamburger', 'menu'],
  beaker: ['chemical', 'chemistry', 'formula', 'potion', 'science'],
  bell: ['alert', 'notification'],
  'bell-alert': ['notification'],
  'bell-slash': ['notification', 'silence'],
  'bell-snooze': ['notification', 'silence'],
  bolt: ['electric', 'electricity', 'flash', 'lightning', 'power', 'zap'],
  'bolt-slash': [
    'electric',
    'electricity',
    'flash',
    'lightning',
    'power',
    'zap',
  ],
  bookmark: ['favorite', 'save'],
  'bookmark-slash': ['delete', 'favorite', 'remove', 'save'],
  'bookmark-square': ['favorite', 'save'],
  briefcase: ['business', 'job', 'office', 'work'],
  'building-library': ['administration', 'institution'],
  'building-office': ['apartment', 'flat', 'skyscraper', 'work'],
  'building-office-2': ['apartment', 'flat', 'skyscraper', 'work'],
  'building-storefront': ['shop'],
  cake: ['birthday', 'celebrate', 'party'],
  calculator: ['mathematics', 'maths', 'numbers'],
  calendar: ['date', 'day', 'event', 'month', 'year'],
  'calendar-days': ['date', 'event', 'month', 'year'],
  camera: ['photo', 'picture'],
  'chart-bar': ['analytics', 'graph', 'statistics', 'stats'],
  'chart-bar-square': ['analytics', 'graph', 'statistics', 'stats'],
  'chart-pie': ['analytics', 'graph', 'statistics', 'stats'],
  'chat-bubble-bottom-center': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  'chat-bubble-bottom-center-text': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  'chat-bubble-left': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  'chat-bubble-left-ellipsis': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  'chat-bubble-left-right': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  'chat-bubble-oval-left': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  'chat-bubble-oval-left-ellipsis': [
    'bubble',
    'comment',
    'discussion',
    'message',
    'response',
    'speech',
  ],
  check: ['confirm', 'correct', 'ok', 'tick', 'valid', 'verified'],
  'check-badge': ['confirm', 'correct', 'tick', 'verified'],
  'check-circle': ['confirm', 'correct', 'tick', 'verified'],
  'chevron-double-down': ['arrow-double-down'],
  'chevron-double-left': ['arrow-double-left'],
  'chevron-double-right': ['arrow-double-right'],
  'chevron-double-up': ['arrow-double-up'],
  'chevron-down': ['arrow-down', 'caret-down'],
  'chevron-left': ['arrow-left', 'caret-left'],
  'chevron-right': ['arrow-right', 'caret-right'],
  'chevron-up': ['arrow-up', 'caret-up'],
  'chevron-up-down': ['select', 'option'],
  'circle-stack': ['collection', 'database', 'storage'],
  clipboard: ['copy', 'cut', 'paste'],
  'clipboard-document': ['copy', 'cut', 'paste'],
  'clipboard-document-check': ['clipboard-tick'],
  'clipboard-document-list': ['copy', 'cut', 'paste'],
  clock: ['time', 'watch'],
  cog: ['gear', 'settings'],
  'cog-6-tooth': ['gear', 'settings'],
  'cog-8-tooth': ['gear', 'settings'],
  'command-line': ['cli', 'code', 'console', 'terminal'],
  'computer-desktop': ['mac', 'monitor', 'pc', 'windows'],
  'cpu-chip': ['computer', 'electronics', 'pc'],
  'credit-card': ['debit', 'money', 'payment', 'price'],
  cube: ['3d'],
  'currency-dollar': ['money', 'payment', 'price', 'usd'],
  'currency-euro': ['eur', 'euro', 'money', 'payment', 'price'],
  'currency-pound': ['gbp', 'money', 'payment', 'price'],
  'currency-rupee': ['inr', 'money', 'payment', 'price'],
  'currency-yen': ['money', 'payment', 'price'],
  'cursor-arrow-rays': ['cursor-pointer', 'mouse-click'],
  'cursor-arrow-ripple': ['cursor-pointer', 'mouse-click'],
  'device-phone-mobile': ['android', 'iphone', 'phone', 'smartphone'],
  'device-tablet': ['ipad', 'kindle'],
  document: ['pdf', 'sim'],
  'document-duplicate': ['clone', 'copy'],
  'document-magnifying-glass': ['search'],
  'document-minus': ['document-delete'],
  'ellipsis-horizontal': ['meatballs', 'more'],
  'ellipsis-horizontal-circle': ['more', 'options'],
  'ellipsis-vertical': ['kebab', 'more'],
  envelope: ['letter', 'mail', 'message'],
  'envelope-open': ['letter', 'mail', 'message'],
  'exclamation-circle': ['caution', 'error', 'warning'],
  'exclamation-triangle': ['caution', 'error', 'warning'],
  eye: ['public', 'seen', 'visible'],
  'eye-slash': ['hidden', 'invisible', 'private', 'unseen'],
  'face-frown': ['emoji', 'sad'],
  'face-smile': ['emoji', 'happy'],
  film: ['cinema', 'movie'],
  'finger-print': ['touch-id'],
  fire: ['burn', 'flame', 'hot', 'lit'],
  flag: ['report'],
  'folder-arrow-down': ['folder-download'],
  'folder-minus': ['folder-delete', 'folder-remove'],
  'folder-plus': ['folder-add', 'folder-new'],
  forward: ['fast-forward', 'next', 'skip'],
  funnel: ['adjustments', 'filter'],
  gif: ['animation', 'image'],
  gift: ['present', 'reward'],
  'gift-top': ['present', 'reward'],
  'globe-alt': ['earth', 'planet', 'website', 'world', 'www'],
  'globe-americas': ['earth', 'planet', 'website', 'world', 'www'],
  'globe-asia-australia': ['earth', 'planet', 'website', 'world', 'www'],
  'globe-europe-africa': ['earth', 'planet', 'website', 'world', 'www'],
  'hand-raised': ['grab'],
  'hand-thumb-down': ['dislike'],
  'hand-thumb-up': ['like'],
  hashtag: ['octothorp', 'pound-sign'],
  heart: ['love', 'relationship'],
  home: ['building', 'house'],
  'home-modern': ['building', 'house'],
  inbox: ['email', 'message'],
  'inbox-arrow-down': ['email', 'message'],
  'inbox-stack': ['email', 'message'],
  'information-circle': ['help'],
  language: ['i18n', 'international', 'intl', 'l10n', 'translate'],
  lifebuoy: ['help', 'life-ring', 'overboard'],
  'light-bulb': ['insight'],
  link: ['attachment', 'connect', 'url'],
  'lock-closed': ['secure', 'security'],
  'lock-open': ['security', 'unlock'],
  'magnifying-glass': ['search'],
  'magnifying-glass-circle': ['search'],
  'magnifying-glass-minus': ['zoom-out'],
  'magnifying-glass-plus': ['zoom-in'],
  'map-pin': ['location', 'marker'],
  microphone: ['audio', 'podcast', 'record'],
  minus: ['delete', 'remove', 'subtract'],
  'minus-circle': ['delete', 'remove', 'subtract'],
  moon: ['dark', 'night'],
  'musical-note': ['song'],
  'no-symbol': [
    'bad',
    'block',
    'end',
    'halt',
    'not-allowed',
    'stop',
    'unauthorized',
  ],
  'paper-airplane': ['send'],
  'paper-clip': ['attachment', 'document', 'link'],
  pencil: ['edit', 'note', 'write'],
  'pencil-square': ['edit', 'note', 'write'],
  photo: ['gallery', 'image', 'picture'],
  plus: ['add', 'create', 'new'],
  'plus-circle': ['add', 'create'],
  'puzzle-piece': ['add-on', 'addon', 'game', 'jigsaw'],
  'question-mark-circle': ['help'],
  scale: ['balance', 'weigh'],
  scissors: ['cut'],
  'shield-check': ['secure', 'shield-tick'],
  'shield-exclamation': ['shield-error', 'shield-warning'],
  'shopping-bag': ['cart'],
  sparkles: ['glitter', 'stars'],
  'speaker-wave': ['audio', 'loud', 'sound', 'unmute', 'volume'],
  'speaker-x-mark': ['audio', 'mute', 'quiet', 'sound', 'volume'],
  star: ['achievement', 'favorite', 'rating', 'score'],
  sun: ['brightness', 'day', 'light'],
  swatch: ['colors', 'palette'],
  'table-cells': ['data', 'grid', 'spreadsheet'],
  tag: ['category', 'group', 'label'],
  trash: ['bin', 'delete', 'garbage', 'remove', 'rubbish'],
  truck: ['lorry', 'vehicle'],
  user: ['account', 'person', 'profile'],
  'user-circle': ['account', 'person', 'profile'],
  'user-plus': ['account', 'person', 'profile', 'user-add'],
  'user-minus': ['account', 'person', 'profile', 'user-delete', 'user-remove'],
  'video-camera': ['movie', 'record'],
  'video-camera-slash': ['movie', 'record', 'stop'],
  wifi: ['connection', 'online', 'signal', 'wireless'],
  wrench: ['options', 'settings', 'tool'],
  'wrench-screwdriver': ['options', 'settings', 'tool'],
  'x-circle': ['cancel', 'close', 'delete', 'remove', 'stop'],
  'x-mark': ['cancel', 'close', 'delete', 'remove', 'stop'],
};

function getIcons(dir: string) {
  const ls = readdirSync(dir);

  return ls.map((i) => basename(i, extname(i)));
}

async function start() {
  const pascalCase = await import('change-case').then((mod) => mod.pascalCase);

  // icons
  const data = [
    // heroicons
    ...getIcons(`./heroicons/optimized/24/solid`).map((name) => {
      return {
        name,
        solid: join('./heroicons/optimized/24/solid', name + '.svg'),
        outline: join('./heroicons/optimized/24/outline', name + '.svg'),
      };
    }),
  ];

  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const icons: Record<string, any> = {};
  let allIconsContent: string = `
<script setup lang="ts">
defineProps(['name', 'outlined']);
</script>

<template>
<template v-if="false"></template>
`;

  for (const item of data) {
    const { name } = item;
    const componentName =
      pascalCase(name, { mergeAmbiguousCharacters: true }) + 'Icon';
    let content = ICON_TEMPLATE;

    const outline = readFileSync(item.outline).toString();
    const solid = readFileSync(item.solid).toString();

    content = content.replace(`<!-- outline -->`, outline);
    content = content.replace(`<!-- solid -->`, solid);

    allIconsContent += `
<template v-else-if="(name === '${name}' || name === '${componentName}') && (outlined !== undefined && outlined !== false)">
  ${outline}
</template>
<template v-else-if="(name === '${name}' || name === '${componentName}') && (outlined === undefined || outlined === false)">
  ${solid}
</template>
`;

    writeFileSync(join(OUTPUT_DIR, componentName + '.vue'), content);

    icons[name] = {
      component: componentName,
      keywords: (KEYWORDS as any)[name] ?? '',
    };
  }

  allIconsContent += `
<template v-else></template>
</template>`;

  writeFileSync(join(OUTPUT_DIR, 'Icon.vue'), allIconsContent);
  writeFileSync(`./web/src/icons.json`, JSON.stringify(icons, null, 2));
}

start();
