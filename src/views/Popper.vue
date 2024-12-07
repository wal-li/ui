<script setup>
import { ref } from 'vue';
import Playground from '../test/Playground.vue';
import Popper from '../popper/Popper.vue';
import XMarkIcon from '../icons/XMarkIcon.vue';

import { faker } from '@faker-js/faker';
import Button from '../components/Button.vue';
import Dialog from '../components/Dialog.vue';
import Dropdown from '../components/Dropdown.vue';

const visible = ref(false);
const dialogRef = ref();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Original</h2>
      </div>

      <Playground id="simple-dialog">
        <Button label="Button" @click="() => dialogRef.toggle()" />

        <!-- DIALOG -->
        <Popper ref="dialogRef" v-slot="{ isShow, toggle }">
          <Transition name="fade">
            <div
              class="fixed z-30 w-full h-full top-0 left-0 overflow-x-hidden overflow-y-auto bg-zinc-950/50"
              v-if="isShow"
            >
              <!-- outter -->
              <div class="p-4 min-h-full flex flex-col items-center justify-center" @click.self="toggle">
                <!-- main -->
                <div class="relative bg-background text-foreground w-full max-w-fit h-min rounded-lg p-4 prose border">
                  <!-- close button -->
                  <button
                    class="absolute top-1 right-1 text-sm leading-4 font-medium p-1 rounded inline-flex items-center gap-1.5"
                    @click="toggle"
                  >
                    <XMarkIcon class="w-4 h-4" />
                  </button>

                  <div class="w-[30rem]">
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
            </div>
          </Transition>
        </Popper>
        <!-- END DIALOG -->
      </Playground>

      <Playground id="dropdown">
        <!-- DROPDOWN -->
        <Popper class="inline-block" v-slot="{ isShow, toggle }">
          <Button label="Dropdown" @click="toggle" />

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

    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl leading-8 font-bold tracking-wider">Compact</h2>
      </div>

      <Playground id="ref-simple-dialog">
        <Dialog>
          <template #controller="{ toggle }">
            <Button label="Button" @click="toggle" />
          </template>

          <template v-slot="{ toggle }">
            <div class="w-[30rem]">
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
          </template>
        </Dialog>
      </Playground>

      <Playground id="ref-dropdown">
        <Dropdown class="inline-block">
          <template #controller="{ toggle }">
            <Button label="Dropdown" @click="toggle" />
          </template>

          <p>{{ faker.lorem.paragraph() }}</p>
        </Dropdown>
      </Playground>
    </div>
  </div>
</template>
