<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

const store = mainStore();

const { showInfo } = storeToRefs(store);
</script>

<template>
  <dialog
    class="dialog"
    :open="showInfo"
  >
    <span class="dialog-text">
      Application made by <a
        class="dialog-link"
        href="https://github.com/super16"
      >super16</a>
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="4"
      stroke="currentColor"
      class="dialog-icon"
      @click="showInfo = !showInfo"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 19.5l15-15m-15 0l15 15"
      />
    </svg>
  </dialog>
</template>

<style scoped lang="postcss">
.dialog {
  @apply
    bg-lime-200
    border-8
    border-black
    bottom-6
    fixed
    flex
    h-20
    justify-between
    w-96;
}

.dialog-icon {
  @apply
    h-6
    hover:cursor-pointer
    hover:text-red-400
    w-6;
}

.dialog-link {
  @apply
    decoration-4
    decoration-red-400
    hover:decoration-8
    hover:tracking-wider
    underline;
}

.dialog-text {
  @apply
    font-bold
    text-black
    text-xl;
}
</style>
