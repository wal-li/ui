<script setup>
import Playground from '../test/Playground.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { computed } from 'vue';

const types = ['static', 'hidden', 'float'];
const sizes = ['full', 'short'];

const cases = [];
for (const from_type of types)
  for (const from_size of sizes)
    for (const to_type of types)
      for (const to_size of sizes)
        if (from_type !== to_type || from_size !== to_size)
          cases.push([
            [from_type, from_size],
            [to_type, to_size],
          ]);
</script>

<template>
  <div class="grid grid-cols-1 gap-4 mb-4">
    <Playground id="icon-sidebar">
      <Sidebar
        class="w-full relative overflow-hidden h-80 border border-secondary"
        v-slot="{ ready, isShort, isFloat, toggle }"
        :lg="[
          ['static', 'full'],
          ['static', 'short'],
        ]"
      >
        <!-- sidebar -->
        <div
          class="w-[--sidebar-width] left-[--sidebar-offset] top-0 h-full absolute transition-all z-20 bg-background border-r border-secondary overflow-hidden flex flex-col p-1"
        >
          <Transition :name="ready ? 'slideUp' : ''">
            <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">Overviews</label>
          </Transition>

          <a
            class="w-full text-sm leading-4 p-3 rounded cursor-pointer hover:bg-secondary overflow-hidden mb-1 font-bold bg-secondary"
          >
            <div class="w-[--sidebar-base] flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" class="w-4 h-4">
                <path
                  fill-rule="evenodd"
                  d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="w-0">Statistics</span>
            </div>
          </a>

          <Transition :name="ready ? 'slideUp' : ''">
            <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">Tools</label>
          </Transition>

          <a class="w-full text-sm leading-4 p-3 rounded cursor-pointer hover:bg-secondary overflow-hidden mb-1">
            <div class="w-[--sidebar-base] flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="2 2 20 20"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>

              <span class="w-0">Playground</span>
            </div>
          </a>
        </div>

        <!-- backdrop -->
        <Transition :name="ready ? 'fade' : ''">
          <label v-if="isFloat" class="absolute top-0 left-0 w-full h-full z-10 bg-zinc-950/50" @click="toggle"></label>
        </Transition>

        <!-- main -->
        <main class="pl-[--sidebar-padding] w-full h-full transition-all">
          <button @click="toggle">Main Content</button>
        </main>
      </Sidebar>
    </Playground>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
    <div v-for="item in cases" class="px-16">
      <div class="bg-sky-500/20 py-4">
        <Sidebar
          class="w-full h-32 relative"
          width="64"
          icon="24"
          :lg="item"
          :sm="item"
          v-slot="{ ready, isFloat, toggle }"
        >
          <!-- sidebar -->
          <div
            class="w-[--sidebar-width] left-[--sidebar-offset] top-0 h-full absolute transition-all z-20 bg-zinc-500/50"
          >
            <div class="w-[--sidebar-base] h-full border border-dashed border-zinc-500"></div>
          </div>

          <!-- backdrop -->
          <Transition :name="ready ? 'fade' : ''">
            <label
              v-if="isFloat"
              class="absolute top-0 left-0 w-full h-full z-10 bg-zinc-950/50"
              @click="toggle"
            ></label>
          </Transition>

          <!-- main -->
          <main class="pl-[--sidebar-padding] w-full h-full transition-all">
            <button
              class="w-full h-full flex items-center justify-center text-xs font-mono bg-sky-500/20"
              @click="toggle"
            >
              <div v-html="item.map((i) => i.join(',')).join('<br>to ')"></div>
            </button>
          </main>
        </Sidebar>
      </div>
    </div>
  </div>
</template>
