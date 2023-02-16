<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch, watchEffect } from 'vue';

import { mainStore } from '@/store';

let props = defineProps({
  letter: { default: '', required: false, type: String },
  word: { default: '', required: true, type: String },
});

const store = mainStore();
const {
  articleText,
  currentLetter,
  currentPageId,
  currentWord,
} = storeToRefs(store);

/**
 * Detect props changing.
 */
watchEffect(() => {
  if (currentLetter.value !== props.letter) {
    currentLetter.value = props.letter;
    store.getWords(currentLetter.value);
  } else {
    currentLetter.value = props.letter;
  }
  
  currentWord.value = props.word;
});

/**
 * Detect pageId changing.
 */
watch(currentPageId, (value) => {
  store.getSection(currentWord.value, value);
}, { immediate : true });
</script>

<template>
  <h1 class="break-words heading-1">
    {{ currentWord }}
  </h1>
  <!-- eslint-disable vue/no-v-html -->
  <article
    class="mt-8"
    v-html="articleText"
  />
  <!--eslint-enable-->
</template>
