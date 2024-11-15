<script setup>
import Playground from '../test/Playground.vue';
import Sidebar from '../sidebar/Sidebar.vue';
import { computed } from 'vue';
import ChartPieIcon from '../icons/ChartPieIcon.vue';
import CommandLineIcon from '../icons/CommandLineIcon.vue';
import Bars3Icon from '../icons/Bars3Icon.vue';

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
        class="w-full relative overflow-hidden h-70 border border-secondary"
        v-slot="{ ready, isShort, isFloat, toggle }"
        :lg="[
          ['static', 'full'],
          ['static', 'short'],
        ]"
      >
        <!-- sidebar -->
        <div
          class="absolute w-[--sidebar-width] left-[--sidebar-offset] top-0 h-full transition-all z-20 bg-background border-r border-secondary overflow-x-hidden p-1 z-30"
        >
          <div class="min-h-full flex flex-col">
            <Transition :name="ready ? 'slideUp' : ''">
              <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">Overviews</label>
            </Transition>

            <a
              class="w-full text-sm leading-4 p-2.5 rounded cursor-pointer overflow-hidden mb-1 hover:bg-secondary font-bold bg-secondary"
            >
              <div class="w-[--sidebar-base] flex items-center gap-2.5">
                <ChartPieIcon class="w-5 h-5" />
                <span class="w-0 whitespace-nowrap">Statistics</span>
              </div>
            </a>

            <Transition :name="ready ? 'slideUp' : ''">
              <label v-if="!isShort" class="text-muted text-xs font-medium leading-4 p-3 mb-1">Tools</label>
            </Transition>

            <a class="w-full text-sm leading-4 p-2.5 rounded cursor-pointer overflow-hidden mb-1 hover:bg-secondary">
              <div class="w-[--sidebar-base] flex items-center gap-2.5">
                <CommandLineIcon class="w-5 h-5" />

                <span class="w-0 whitespace-nowrap">Playground Chichi</span>
              </div>
            </a>
          </div>
        </div>

        <!-- backdrop -->
        <Transition :name="ready ? 'fade' : ''">
          <label v-if="isFloat" class="absolute top-0 left-0 w-full h-full z-10 bg-zinc-950/50" @click="toggle"></label>
        </Transition>

        <!-- main -->
        <main class="pl-[--sidebar-padding] w-full h-full transition-all">
          <!-- topbar -->
          <div class="p-2 flex items-center gap-2 text-sm sticky top-0 z-20 bg-background">
            <button
              class="text-sm leading-4 font-medium p-1.5 hover:bg-secondary text-foreground rounded inline-flex items-center gap-2"
              @click="toggle"
            >
              <Bars3Icon class="w-5 h-5" />
            </button>

            <h1>Dashboard</h1>
          </div>

          <!-- content -->
          <div class="px-4 pb-4 grid grid-cols-3 gap-4">
            <div class="border border-secondary h-24 rounded-lg"></div>
            <div class="border border-secondary h-24 rounded-lg"></div>
            <div class="border border-secondary h-24 rounded-lg"></div>
            <div class="border border-secondary h-24 rounded-lg col-span-3"></div>
          </div>
        </main>
      </Sidebar>
    </Playground>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
    <div v-for="item in cases" class="px-16">
      <div class="bg-sky-500/20 py-4">
        <Sidebar
          class="w-full h-32 relative"
          width="4"
          icon="1.5"
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
