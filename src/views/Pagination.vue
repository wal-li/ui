<script setup>
import { ref } from 'vue';
import Pagination from '../pagination/Pagination.vue';
import Button from '../components/Button.vue';
import Playground from '../test/Playground.vue';
import CodePreview from '../test/CodePreview.vue';

const pageStart = ref(0);
const pageLimit = ref(10);
const pageTotal = ref(100);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <CodePreview>
      <pre>
const pageStart = ref(0);
const pageLimit = ref(10);
const pageTotal = ref(100);
</pre
      >
    </CodePreview>

    <Playground id="pagination">
      <!-- PAGINATION -->
      <Pagination
        class="flex flex-wrap gap-2 items-center justify-center"
        :start="pageStart"
        :limit="pageLimit"
        :total="pageTotal"
        v-slot="{ start, page, label, isActive }"
      >
        <Button variant="secondary" :label="label" :outlined="!isActive" @click="pageStart = start" />
      </Pagination>
      <!-- END PAGINATION -->
    </Playground>
  </div>
</template>
