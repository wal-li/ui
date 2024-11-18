<script setup>
import { ref } from 'vue';

import Playground from '../test/Playground.vue';
import CheckIcon from '../icons/CheckIcon.vue';

const options = ['Dog', 'Cat', 'Cow'];
const selected = ref([]);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="checkbox">
      <!-- CHECKBOX -->
      <div class="text-sm leading-4 inline-flex items-center">
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
        <label for="cbx01" class="inline-block p-0.5 pl-1.5">This is a checkbox</label>
      </div>
      <!-- END CHECKBOX -->
    </Playground>

    <Playground id="radio">
      <!-- RADIO -->
      <div class="inline-flex gap-4">
        <div class="text-sm leading-4 inline-flex items-center" v-for="opt in options">
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
          <label :for="`rad${opt}`" class="inline-block p-0.5 pl-1.5">{{ opt }}</label>
        </div>
      </div>
      <!-- END RADIO -->
    </Playground>

    <Playground id="multi-checkbox">
      <!-- RADIO -->
      <div class="inline-flex gap-4">
        <div class="text-sm leading-4 inline-flex items-center" v-for="opt in options">
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
          <label :for="`cbx${opt}`" class="inline-block p-0.5 pl-1.5">{{ opt }}</label>
        </div>
      </div>
      <!-- END RADIO -->
    </Playground>
  </div>
</template>
