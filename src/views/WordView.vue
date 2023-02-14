<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRefs, watch } from 'vue';

import { mainStore } from '@/store';

let props = defineProps({
  letter: { default: '', required: false, type: String },
  word: { default: '', required: true, type: String },
});

const store = mainStore();
const { letter, word } = toRefs(props);
const { articleText, currentLetter, currentPageId, currentWord } = storeToRefs(store);

if (currentLetter.value !== letter.value) {
  currentLetter.value = letter.value;
  store.getWords(currentLetter.value);
}

currentWord.value = word.value;

store.getSection(currentWord.value, currentPageId.value);

/**
 * Detect word changing.
 */
watch(() => props.word, (value) => currentWord.value = value);

/**
 * Detect letter changing.
 */
watch(() => props.letter, (value) => currentLetter.value = value);

/**
 * Detect pageId changing.
 */
watch(currentPageId, (value) => {
  store.getSection(currentWord.value, value);
});
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
