<script setup>
import Button from '../button/Button.vue';

const SIZES = ['small', 'normal', 'large'];
const SEVERITIES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
const TYPES = ['normal', 'icon'];
const KINDS = ['solid', 'outlined', 'rounded'];
</script>

<template>
  <template v-for="kind in KINDS">
    <template v-for="_type in TYPES">
      <label class="block mb-2 capitalize">{{ kind }} {{ _type }}</label>
      <div class="flex gap-2 mb-4">
        <div v-for="severity in SEVERITIES">
          <Button :type="_type" :severity="severity" :[kind]="true">
            <i v-if="_type === 'icon'" class="pi pi-image"></i>
            <template v-else>
              {{ severity }}
            </template>
          </Button>
        </div>
      </div>
    </template>
  </template>
</template>
