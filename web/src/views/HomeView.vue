<script setup lang="ts">
import Colorize from '@/components/web/Colorize.vue';
import ViewSource from '@/components/web/ViewSource.vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <div class="flex flex-col min-h-[25vh] justify-center gap-2 items-center">
    <h1 class="text-heading-1 font-black text-center relative">
      wal-li/<span class="text-primary-contrast">ui</span>
      <span
        class="block bg-primary z-[-1] w-[1.20em] h-[1em] top-0 right-0 absolute"
      ></span>
      <span
        class="block bg-primary z-[-1] w-[1.3em] h-[0.5em] bottom-0 right-0 absolute"
      ></span>
    </h1>
    <div
      class="uppercase tracking-widest font-lighter text-sm lg:text-base 2xl:text-lg text-center"
    >
      UI Builder for Vite + Vue3 + TailwindCSS
    </div>
  </div>

  <div class="prose">
    <h2>1. Quickstart</h2>

    <pre class="select-all">npm i -g @wal-li/ui</pre>
    <pre class="select-all">npm create vite@latest</pre>
    <pre class="select-all">
npm i -D tailwindcss @tailwindcss/vite @types/node</pre
    >
    <pre class="select-all">wui init</pre>

    <pre class="select-all">wui add &lt;names...&gt;</pre>

    <h2>2. Setup Instructions</h2>

    <h3>2.1. Colors</h3>

    <Colorize class="my-4" />

    <h3>2.2. Create project</h3>
    <pre class="select-all">npm create vite@latest</pre>
    <p>with options:</p>
    <ul>
      <li>Vue</li>
      <li>TypeScript</li>
    </ul>

    <h3>2.3. Add Tailwind CSS</h3>
    <pre class="select-all">npm i -D tailwindcss @tailwindcss/vite</pre>
    <p>Replace everything in <code>src/index.css</code> with the following:</p>
    <ViewSource src="src/style.css">
      <pre class="p-4 text-sm select-all my-0">
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  {{ themeStore.themeCSS.split('\n').join('\n  ') }}
  --breakpoint-3xl: 112rem;
  --breakpoint-4xl: 128rem;

  --container-8xl: 88rem;
  --container-9xl: 96rem;
  --container-10xl: 112rem;
  --container-11xl: 120rem;
  --container-12xl: 128rem;

  --text-10xl: 10rem;

  --text-heading-1: clamp(4rem, 7.81vw, 10rem);
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

@source inline('bg-primary text-primary text-primary-contrast border-primary hover:bg-primary hover:text-primary-contrast hover:border-primary');
@source inline('bg-secondary text-secondary text-secondary-contrast border-secondary hover:bg-secondary hover:text-secondary-contrast hover:border-secondary');
@source inline('bg-accent text-accent text-accent-contrast border-accent hover:bg-accent hover:text-accent-contrast hover:border-accent');
@source inline('bg-surface text-surface text-surface-contrast border-surface hover:bg-surface hover:text-surface-contrast hover:border-surface');
@source inline('bg-success text-success text-success-contrast border-success hover:bg-success hover:text-success-contrast hover:border-success');
@source inline('bg-danger text-danger text-danger-contrast border-danger hover:bg-danger hover:text-danger-contrast hover:border-danger');
@source inline('bg-warning text-warning text-warning-contrast border-warning hover:bg-warning hover:text-warning-contrast hover:border-warning');
@source inline('bg-info text-info text-info-contrast border-info hover:bg-info hover:text-info-contrast hover:border-info');
@source inline('bg-foreground text-foreground text-foreground-contrast border-foreground hover:bg-foreground hover:text-foreground-contrast hover:border-foreground');

@layer components {
  .prose h1 {
    @apply text-5xl font-bold mt-8 mb-4 first:mt-0;
  }

  .prose h2 {
    @apply text-4xl font-bold mt-8 mb-4 first:mt-0;
  }

  .prose h3 {
    @apply text-3xl font-bold mt-8 mb-4 first:mt-0;
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
    @apply bg-surface p-4 border-l-4 border-primary;
  }

  .prose code {
    @apply bg-surface p-2 font-mono rounded;
  }
}
</pre
      >
    </ViewSource>

    <h3>2.4. Edit <code>tsconfig.json</code> file</h3>
    <ViewSource name="tsconfig" />

    <h3>2.5. Edit <code>tsconfig.app.json</code> file</h3>
    <ViewSource name="tsconfig-app" />

    <h3>2.6. Update <code>vite.config.ts</code></h3>
    <pre class="select-all">npm install -D @types/node</pre>
    <ViewSource name="vite-config" />

    <h3>2.7. Edit <code>src/vite-env.d.ts</code> file</h3>
    <ViewSource name="vite-env-d" />

    <h3>2.8. Run</h3>

    <pre class="select-all">npm run dev</pre>

    <h3>2.9. Build</h3>

    <pre class="select-all">npm run build</pre>

    <h2>Author</h2>
    <p><strong>HaoVA</strong></p>
    <ul>
      <li>Email: hi@haova.me</li>
      <li>
        Website:
        <a href="https://www.haova.me" target="_blank">https://www.haova.me</a>
      </li>
    </ul>

    <h2>License</h2>
    <p>MIT.</p>
  </div>
</template>
