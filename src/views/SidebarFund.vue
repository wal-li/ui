<script setup>
import Sidebar from '../sidebar/Sidebar.vue';

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
