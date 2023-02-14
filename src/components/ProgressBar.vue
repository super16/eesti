<script setup lang="ts">
import { ref, watch } from 'vue';

let props = defineProps({
  isLoading: { type: Boolean, required: true },
});

const progressLevel = ref<number>(0);

/**
 * Run loading bar animation when is true.
 */
watch(() => props.isLoading, (value) => {
  if (value) {
    const incrementBar = setInterval(() => {
      if (progressLevel.value <= 100) {
        progressLevel.value += 1;
      } else {
        clearInterval(incrementBar);
        progressLevel.value = 0;
      }
    }, 1);
  }
});
</script>

<template>
  <progress
    class="progress"
    :max="100"
    :value="progressLevel"
  >
    Loading {{ progressLevel }}%
  </progress>
</template>

<style scoped lang="postcss">
progress[value]::-webkit-progress-bar {
  @apply bg-transparent;
}

progress[value]::-webkit-progress-value {
  @apply bg-indigo-400;
}

progress[value]::-moz-progress-bar {
  @apply bg-indigo-400;
}

.progress {
  @apply
    appearance-none
    bg-transparent
    border-none
    block
    h-1.5
    w-full;
}
</style>
