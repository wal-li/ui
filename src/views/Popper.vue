<script setup>
import { ref } from 'vue';
import Playground from '../test/Playground.vue';
import Popper from '../popper/Popper.vue';
import XMarkIcon from '../icons/XMarkIcon.vue';

import { faker } from '@faker-js/faker';

// import Button from '../button/Button.vue';

const visible = ref(false);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="simple-dialog">
      <!-- DIALOG -->
      <Popper v-slot="{ isShow, toggle }">
        <button
          class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
          @click="toggle"
        >
          <span class="inline-block p-0.5">Dialog</span>
        </button>

        <Transition name="fade">
          <div
            class="fixed z-30 w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto bg-zinc-950/50"
            v-if="isShow"
          >
            <!-- outter -->
            <div class="p-4 min-h-full flex flex-col items-center justify-center" @click.self="toggle">
              <!-- main -->
              <div class="relative bg-background text-foreground w-full max-w-96 h-min rounded-lg p-4 prose border">
                <!-- close button -->
                <button
                  class="absolute top-1 right-1 text-sm leading-4 font-medium p-1 rounded inline-flex items-center gap-1.5"
                  @click="toggle"
                >
                  <XMarkIcon class="w-4 h-4" />
                </button>

                <!-- title -->
                <h4>
                  {{ faker.lorem.sentence(3) }}
                </h4>

                <!-- content -->
                <p>{{ faker.lorem.paragraph() }}</p>
                <p>{{ faker.lorem.paragraph() }}</p>
                <p>{{ faker.lorem.paragraph() }}</p>

                <!-- actions -->
                <div class="flex gap-4 mt-4">
                  <button
                    class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
                    @click="toggle"
                  >
                    <span class="inline-block p-0.5">Confirm</span>
                  </button>

                  <button
                    class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 text-foreground outline outline-1 -outline-offset-1 outline-secondary hover:bg-secondary"
                    @click="toggle"
                  >
                    <span class="inline-block p-0.5">Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Popper>
      <!-- END DIALOG -->
    </Playground>

    <Playground id="dropdown">
      <!-- DROPDOWN -->
      <Popper class="inline-block" v-slot="{ isShow, toggle }">
        <button
          class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
          @click="toggle"
        >
          <span class="inline-block p-0.5">Dropdown</span>
        </button>

        <Transition name="fade">
          <div class="fixed z-30 w-full h-full top-0 left-0 overflow-hidden" v-if="isShow" @click.self="toggle">
            <!-- main -->
            <div
              class="absolute top-[--popper-top] left-[--popper-left] bottom-[--popper-bottom] right-[--popper-right] bg-background text-foreground max-w-96 h-min rounded-lg p-4 prose border"
            >
              <p>{{ faker.lorem.paragraph() }}</p>
            </div>
          </div>
        </Transition>
      </Popper>
      <!-- END DROPDOWN -->
    </Playground>
  </div>
</template>
