<script setup>
import { ref } from 'vue';

const layers = ref(new Set(['background', 'main', 'header', 'backdrop', 'sidebar', 'overlay']));
</script>

<template>
  <div class="w-full overflow-x-auto">
    <div class="w-[48rem] pt-[2rem] pl-[8rem] pb-[7rem] mx-auto">
      <div class="container relative w-[32rem] h-[24rem]">
        <!-- background -->
        <div
          :class="`${
            layers.has('background') ? '' : 'opacity-0 select-none -z-10'
          } absolute top-0 left-0 w-full h-full bg-rose-500 flex items-center justify-center`"
          @mousedown="layers.delete('background')"
        >
          background :: z-0
        </div>

        <!-- main -->
        <div
          :class="`${
            layers.has('main') ? '' : 'opacity-0 select-none -z-10'
          } absolute top-0 left-1/4 bg-sky-500 w-3/4 h-full flex items-center justify-center`"
          @mousedown="layers.delete('main')"
        >
          main :: z-0
        </div>

        <!-- header -->
        <div
          :class="`${
            layers.has('header') ? '' : 'opacity-0 select-none -z-10'
          } absolute top-0 left-1/4 bg-purple-500 w-3/4 h-[2rem] flex items-center justify-center`"
          @mousedown="layers.delete('header')"
        >
          topbar :: z-10
        </div>

        <!-- backdrop -->
        <div
          :class="`${
            layers.has('backdrop') ? '' : 'opacity-0 select-none -z-10'
          } absolute top-0 left-0 w-full h-full bg-zinc-950/50 flex items-center justify-center`"
          @mousedown="layers.delete('backdrop')"
        >
          backdrop :: z-10
        </div>

        <!-- sidebar -->
        <div
          :class="`${
            layers.has('sidebar') ? '' : 'opacity-0 select-none -z-10'
          } absolute top-0 left-0 bg-amber-500 w-1/4 h-full flex items-center justify-center`"
          @mousedown="layers.delete('sidebar')"
        >
          sidebar :: z-20
        </div>

        <!-- overlay  -->
        <div
          :class="`${
            layers.has('overlay') ? '' : 'opacity-0 select-none -z-10'
          } absolute top-0 left-0 w-full h-full bg-zinc-200/50 flex items-center justify-center`"
          @mousedown="layers.delete('overlay')"
        >
          overlay :: z-30
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  transform: rotate(-20deg) skew(30deg) scale(0.9);
}

.container div {
  transition: all 0.3s;
}

.container div:hover {
  margin-left: 1rem;
}

.container :nth-child(6) {
  transform: translate(-1rem, 1rem);
}
.container :nth-child(5) {
  transform: translate(-2rem, 2rem);
}
.container :nth-child(4) {
  transform: translate(-3rem, 3rem);
}
.container :nth-child(3) {
  transform: translate(-4rem, 4rem);
}
.container :nth-child(2) {
  transform: translate(-5rem, 5rem);
}
.container :nth-child(1) {
  transform: translate(-6rem, 6rem);
}
</style>
