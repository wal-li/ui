<script setup>
import { ref } from 'vue';

import Playground from '../test/Playground.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import Checkbox from '../components/Checkbox.vue';

const options = ['Dog', 'Cat', 'Cow'];
const selected = ref([]);

const choice = ref();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Original</h2>
      </div>
      <Playground id="checkbox">
        <!-- CHECKBOX -->
        <span class="text-sm leading-4 inline-flex items-center">
          <!-- VALUE -->
          <input id="cbx01" class="peer hidden" type="checkbox" />
          <!-- END VALUE -->
          <label for="cbx01" class="inline-block peer-checked:hidden border border-primary w-4 h-4 rounded m-0.5">
          </label>
          <label
            for="cbx01"
            class="hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 rounded m-0.5"
          >
            <CheckIcon class="w-3.5 h-3.5" />
          </label>
          <label for="cbx01" class="inline-block p-0.5 pl-1.5 select-none">This is a checkbox</label>
        </span>
        <!-- END CHECKBOX -->
      </Playground>

      <Playground id="radio">
        <!-- RADIO -->
        <div class="inline-flex gap-4">
          <span class="text-sm leading-4 inline-flex items-center" v-for="opt in options">
            <!-- VALUE -->
            <input :id="`rad${opt}`" :value="opt" name="rad01" class="peer hidden" type="radio" />
            <!-- END VALUE -->
            <label
              :for="`rad${opt}`"
              class="inline-block peer-checked:hidden border border-primary w-4 h-4 rounded-full m-0.5"
            >
            </label>
            <label
              :for="`rad${opt}`"
              class="hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 rounded-full m-0.5"
            >
              <span class="w-3.5 h-3.5 inline-block rounded-full border-2 border-background"></span>
            </label>
            <label :for="`rad${opt}`" class="inline-block p-0.5 pl-1.5 select-none">{{ opt }}</label>
          </span>
        </div>
        <!-- END RADIO -->
      </Playground>

      <Playground id="multi-checkbox">
        <!-- RADIO -->
        <div class="inline-flex gap-4">
          <span class="text-sm leading-4 inline-flex items-center" v-for="opt in options">
            <!-- VALUE -->
            <input :id="`cbx${opt}`" :value="opt" class="peer hidden" type="checkbox" />
            <!-- END VALUE -->
            <label
              :for="`cbx${opt}`"
              class="inline-block peer-checked:hidden border border-primary w-4 h-4 rounded m-0.5"
            >
            </label>
            <label
              :for="`cbx${opt}`"
              class="hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 rounded m-0.5"
            >
              <CheckIcon class="w-3.5 h-3.5" />
            </label>
            <label :for="`cbx${opt}`" class="inline-block p-0.5 pl-1.5 select-none">{{ opt }}</label>
          </span>
        </div>
        <!-- END RADIO -->
      </Playground>
    </div>

    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Compact</h2>
      </div>

      <Playground id="def-checkbox">
        <Checkbox label="This is a checkbox" />
      </Playground>

      <Playground id="def-radio">
        <div class="inline-flex gap-4">
          <Checkbox type="radio" name="rad-animal" v-for="opt in options" :label="opt" :value="opt" />
        </div>
      </Playground>

      <Playground id="def-multi-checkbox">
        <div class="inline-flex gap-4">
          <Checkbox name="cbx-animal" v-for="opt in options" :label="opt" :value="opt" />
        </div>
      </Playground>
    </div>
  </div>
</template>
