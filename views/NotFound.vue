<script setup>
import Button from 'primevue/button';
import { ADMIN_OVERVIEW_PATH } from '../constants';
</script>

<template>
  <div class="h-full">
    <svg
      viewBox="0 0 960 540"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      class="min-h-full min-w-full fixed left-0 -z-10"
      preserveAspectRatio="none"
      style="bottom: -10rem"
    >
      <path
        d="M0 331L26.7 321C53.3 311 106.7 291 160 291C213.3 291 266.7 311 320 329.5C373.3 348 426.7 365 480 373.2C533.3 381.3 586.7 380.7 640 373.8C693.3 367 746.7 354 800 341.2C853.3 328.3 906.7 315.7 933.3 309.3L960 303L960 541L933.3 541C906.7 541 853.3 541 800 541C746.7 541 693.3 541 640 541C586.7 541 533.3 541 480 541C426.7 541 373.3 541 320 541C266.7 541 213.3 541 160 541C106.7 541 53.3 541 26.7 541L0 541Z"
        fill="rgb(var(--primary-500))"
        strokeLinecap="round"
        strokeLinejoin="miter"
      ></path>
    </svg>

    <div class="min-h-full flex items-center justify-center">
      <div class="z-1 text-center">
        <div class="text-surface-900 font-bold text-8xl mb-6 leading-[1.5em]">
          Oops!
        </div>
        <p class="leading-6 mt-0 mb-8 text-surface-700 text-xl font-medium">
          There is nothing here
        </p>

        <router-link :to="ADMIN_OVERVIEW_PATH">
          <Button raised>Go to Dashboard</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>
