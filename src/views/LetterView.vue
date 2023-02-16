<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';

import { mainStore } from '@/store';

let props = defineProps({
  letter: { default: '', required: false, type: String },
});

const store = mainStore();
const { currentLetter } = storeToRefs(store);

/**
 * Detect letter changing.
 */
watchEffect(() => {
  currentLetter.value = props.letter;
  store.getWords(currentLetter.value);
});
</script>

<template>
  <h1 class="heading-1">
    {{ currentLetter.toUpperCase() }}
  </h1>
</template>
