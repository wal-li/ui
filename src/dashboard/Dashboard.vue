<script setup>
defineProps(['sideMenuItems', 'topMenuItems']);
</script>

<template>
  <div>
    <div class="fixed top-0 left-0 w-full h-16 px-4 flex items-center gap-4 border">
      <div class="inline-flex items-center">
        <slot name="logo"></slot>
      </div>
      <a
        class="bg-primary px-2 inline-flex items-center rounded"
        v-for="item in topMenuItems"
        :key="item.key"
        :href="item.url"
        @click="item.command"
        >{{ item.label }}</a
      >
    </div>
    <div class="fixed w-64 top-16 left-0">
      <slot name="side-menu">
        <a
          v-for="item in sideMenuItems"
          :key="item.key"
          :class="`block cursor-pointer flex items-center px-4 ${
            item.command || item.url ? 'h-10 text-sm leading-normal' : 'uppercase text-xs uppercase tracking-wider h-16'
          }`"
          :href="item.url"
          @click="item.command"
        >
          <i :class="`pi pi-${item.icon} text-base mr-4`" v-if="item.icon"></i>
          <span>
            {{ item.label }}
          </span>
        </a>
      </slot>
    </div>
    <div class="p-4 mt-16 ml-64">
      <slot></slot>
    </div>
  </div>
</template>
