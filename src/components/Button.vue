<script setup>
import { computed } from 'vue';

const props = defineProps(['icon', 'label', 'outlined', 'variant', 'size']);

const isOutlined = computed(() => props.outlined !== undefined && props.outlined !== false);
const currentVariant = computed(() => props.variant ?? 'primary');
const textColor = computed(() => (props.variant === 'secondary' ? 'text-foreground' : 'text-background'));
</script>

<template>
  <button
    :class="`text-sm leading-4 font-medium rounded inline-flex items-center gap-1.5 ${
      isOutlined
        ? `text-foreground outline outline-1 -outline-offset-1 hover:bg-${currentVariant} hover:${textColor}`
        : `bg-${currentVariant}`
    } outline-${currentVariant} ${textColor} ${size === 'sm' ? 'p-1.5' : 'p-2.5'}`"
  >
    <component :is="icon" class="w-5 h-5" v-if="icon" />
    <span class="inline-block p-0.5" v-if="label">{{ label }}</span>
  </button>
</template>
