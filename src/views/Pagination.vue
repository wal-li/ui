<script setup>
import { ref } from 'vue';
import Pagination from '../pagination/Pagination.vue';
import Playground from '../test/Playground.vue';

const pageStart = ref(0);
const pageLimit = ref(10);
const pageTotal = ref(100);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="pagination">
      <!-- PAGINATION -->
      <Pagination
        class="flex flex-wrap gap-2 items-center justify-center"
        :start="pageStart"
        :limit="pageLimit"
        :total="pageTotal"
        v-slot="{ start, page, label, isActive }"
      >
        <!-- OUTLINE SECONDARY BUTTON -->
        <button
          :class="`${
            isActive ? 'bg-secondary' : ''
          } text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-secondary hover:bg-secondary`"
          @click="pageStart = start"
        >
          <span class="inline-block p-0.5">{{ label }}</span>
        </button>
        <!-- END OUTLINE SECONDARY BUTTON -->
      </Pagination>
      <!-- END PAGINATION -->
    </Playground>
  </div>
</template>
