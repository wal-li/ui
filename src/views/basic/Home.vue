<script setup>
import Input from '@/components/Input.vue';
import ViewSource from '@/components/ViewSource.vue';
</script>

<template>
  <div class="flex flex-col min-h-[25vh] justify-center gap-2 items-center">
    <h1 class="text-heading-1 font-black text-center">
      Walli
      <span
        class="relative before:content-[' '] before:absolute before:w-full before:h-3/5 before:top-1/5 before:z-[-1] before:bg-primary"
        >UI</span
      >
    </h1>
    <div class="uppercase tracking-widest font-lighter text-sm lg:text-base 2xl:text-lg text-center">
      UI Builder for Vite + Vue3 + TailwindCSS
    </div>
  </div>

  <div class="prose">
    <h2>Install</h2>

    <p>Run an installation command:</p>

    <pre class="select-all">npm i -D vue vite @tailwindcss/vite @vitejs/plugin-vue tailwindcss</pre>

    <p>Then create/edit following files:</p>

    <ViewSource
      src="package.json"
      content='{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}'
    />

    <ViewSource
      src="tsconfig.json"
      content='{
  "compilerOptions": {
    "target": "esnext",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "allowImportingTsExtensions": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* alias */
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "src/**/*.d.ts"],
  "exclude": ["dist", "node_modules", "example", "**/*.test.*"]
}
'
    ></ViewSource>

    <ViewSource
      src="vite.config.ts"
      content="import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
};
"
    />

    <ViewSource
      src="src/main.ts"
      content="import { createApp } from 'vue';

import '@/style.css';

import App from '@/App.vue';

const app = createApp(App);
app.mount('#app');
"
    />

    <ViewSource
      src="src/style.css"
      content="@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: oklch(65% 0.3 220.392);
  --color-secondary: oklch(65% 0.3 100.404);
  --color-accent: oklch(65% 0.3 340.38);
  --color-surface: oklch(94% 0 0);
  --color-border: oklch(80% 0 0);
  --color-success: oklch(65% 0.302 144.684);
  --color-danger: oklch(65% 0.302 24.66);
  --color-warning: oklch(65% 0.302 114.66);
  --color-info: oklch(65% 0.302 269.712);
  --color-muted: oklch(50% 0 0);
  --color-background: oklch(98% 0 0);
  --color-foreground: oklch(20% 0 0);
  --color-black: oklch(0% 0 0);
  --color-white: oklch(100% 0 0);
  --color-adaptive: oklch(20% 0 0);

  --breakpoint-3xl: 112rem;
  --breakpoint-4xl: 128rem;

  --container-8xl: 88rem;
  --container-9xl: 96rem;
  --container-10xl: 112rem;
  --container-11xl: 120rem;
  --container-12xl: 128rem;

  --text-10xl: 10rem;

  --text-heading-1: clamp(3rem, 7.81vw, 10rem);
  --text-heading-2: clamp(2.25rem, 6.25vw, 8rem);
  --text-heading-3: clamp(1.875rem, 4.68vw, 6rem);
  --text-heading-4: clamp(1.5rem, 3.51vw, 4.5rem);
  --text-heading-5: clamp(1.25rem, 2.91vw, 3.75rem);
  --text-heading-6: clamp(1.125rem, 2.34vw, 3rem);

  --text-heading-1--line-height: 1;
  --text-heading-2--line-height: 1;
  --text-heading-3--line-height: 1;
  --text-heading-4--line-height: 1;
  --text-heading-5--line-height: 1.2;
  --text-heading-6--line-height: 1.3;

  --text-paragraph: 1.125rem;
  --text-paragraph--line-height: 1.5;

  --font-sans: Poppins, sans-serif;
}

@layer components {
  .prose h1 {
    @apply text-5xl font-black mt-8 mb-4 first:mt-0;
  }

  .prose h2 {
    @apply text-4xl font-black mt-8 mb-4 first:mt-0;
  }

  .prose h3 {
    @apply text-3xl font-black mt-8 mb-4 first:mt-0;
  }

  .prose h4 {
    @apply text-2xl font-bold mt-8 mb-4 first:mt-0;
  }

  .prose h5 {
    @apply text-xl font-bold mt-8 mb-4 first:mt-0;
  }

  .prose h6 {
    @apply text-lg font-bold mt-8 mb-4 first:mt-0;
  }

  .prose p,
  .prose pre,
  .prose blockquote {
    @apply text-paragraph my-4;
  }

  .prose img {
    @apply my-4 max-w-full w-fit mx-auto;
  }

  .prose img + i {
    @apply block w-fit mx-auto mb-4 text-center;
  }

  .prose ul {
    @apply list-disc ml-8 text-lg my-4;
  }

  .prose ol {
    @apply list-decimal ml-8 text-lg my-4;
  }

  .prose pre {
    @apply bg-surface p-4 rounded-lg text-sm font-mono overflow-auto;
  }

  .prose blockquote {
    @apply bg-surface p-4 border-l-4 border-muted;
  }

  .prose code {
    @apply bg-surface text-sm font-mono p-2 rounded;
  }
}

.dark {
  --color-background: oklch(20% 0 0);
  --color-foreground: oklch(98% 0 0);
  --color-surface: oklch(28% 0 0);
  --color-adaptive: oklch(98% 0 0);
}
"
    />
  </div>
</template>
