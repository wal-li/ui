<script setup>
import ArrowRightCircleIcon from '../icons/ArrowRightCircleIcon.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import Playground from '../test/Playground.vue';
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <Playground id="form">
      <!-- FORM -->
      <div class="flex flex-col gap-4">
        <!-- FIELD -->
        <div class="flex flex-col gap-2">
          <label for="inp01" class="text-sm leading-4 font-medium">Label</label>
          <!-- INPUT GROUP -->
          <div class="flex gap-2">
            <!-- INPUT -->
            <input
              id="inp01"
              class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
              placeholder="Text Input"
              spellcheck="false"
            />
            <!-- END INPUT -->
            <!-- ICON WITH TEXT BUTTON -->
            <button
              class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
            >
              <ArrowRightCircleIcon class="w-5 h-5" />
              <span class="inline-block p-0.5">Button</span>
            </button>
            <!-- END ICON WITH TEXT BUTTON -->
          </div>
          <!-- INPUT GROUP -->
          <span class="inline-block italic text-xs">This is a help message</span>
        </div>
        <!-- END FIELD -->
        <!-- FIELD -->
        <div class="flex flex-col gap-2">
          <label for="inp01" class="text-sm leading-4 font-medium">Label</label>
          <!-- INPUT -->
          <input
            id="inp01"
            class="outline outline-1 -outline-offset-1 bg-background focus:outline-muted w-full px-3 py-2 text-sm leading-6 rounded"
            placeholder="Text Input"
            spellcheck="false"
          />
          <!-- END INPUT -->
        </div>
        <!-- END FIELD -->
        <!-- FIELD -->
        <div class="flex flex-col gap-2">
          <!-- CHECKBOX -->
          <div class="text-sm leading-4 inline-flex items-center">
            <!-- VALUE -->
            <input id="cbx01" class="peer hidden" type="checkbox" />
            <!-- END VALUE -->
            <label for="cbx01" class="inline-block peer-checked:hidden border border-primary w-4 h-4 rounded"> </label>
            <label
              for="cbx01"
              class="hidden peer-checked:inline-block border border-primary bg-primary text-background w-4 h-4 rounded"
            >
              <CheckIcon class="w-3.5 h-3.5" />
            </label>
            <label for="cbx01" class="inline-block p-0.5 pl-1.5">This is a checkbox</label>
          </div>
          <!-- END CHECKBOX -->
        </div>
        <!-- END FIELD -->
        <!-- FIELD -->
        <div class="flex gap-4">
          <!-- TEXT BUTTON -->
          <button
            class="text-sm leading-4 font-medium p-2.5 rounded inline-flex items-center gap-1.5 bg-primary text-background"
          >
            <span class="inline-block p-0.5">Submit</span>
          </button>
          <!-- END TEXT BUTTON -->
        </div>
        <!-- END FIELD -->
      </div>
      <!-- END FORM -->
    </Playground>
  </div>
</template>
