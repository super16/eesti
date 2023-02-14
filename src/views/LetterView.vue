<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRefs, watch } from 'vue';

import { mainStore } from '@/store';

let props = defineProps({
  letter: { default: '', required: false, type: String },
});

const store = mainStore();
const { currentLetter } = storeToRefs(store);
const { letter } = toRefs(props);

currentLetter.value = letter.value || currentLetter.value;

/**
 * Detect letter changing.
 */
watch(() => props.letter, (value) => {
  currentLetter.value = value;
  store.getWords(value);
}, { immediate: true });
</script>

<template>
  <h1 class="heading-1">
    {{ currentLetter.toUpperCase() }}
  </h1>
</template>
