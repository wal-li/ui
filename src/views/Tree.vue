<script setup>
import { ref } from 'vue';
import Playground from '../test/Playground.vue';
import Tree from '../tree/Tree.vue';
import CodePreview from '../test/CodePreview.vue';
import { faker } from '@faker-js/faker';
import Checkbox from '../components/Checkbox.vue';
import ArrowPathIcon from '../icons/ArrowPathIcon.vue';

const data = ref([
  {
    id: 3,
    name: faker.animal.petName(),
    parent: 2,
  },
  {
    id: 4,
    name: faker.animal.petName(),
    active: true,
    loading: true,
  },
  {
    id: 1,
    name: faker.animal.petName(),
  },
  {
    id: 2,
    name: faker.animal.petName(),
    active: true,
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <CodePreview>
      <pre>
const data = {{ JSON.stringify(data, null, 2) }};
</pre
      >
    </CodePreview>

    <!-- Simple Tree -->
    <Playground id="simple-tree">
      <Tree :value="data" v-slot="{ item, level }">
        <Checkbox :style="{ marginLeft: level * 24 + 'px' }" v-model="item.active" :label="item.name" />
        <ArrowPathIcon
          :style="{ marginLeft: (level + 1) * 24 + 'px' }"
          class="w-5 h-5 animate-spin"
          v-if="item.active && item.loading"
        />
      </Tree>
    </Playground>
  </div>
</template>
