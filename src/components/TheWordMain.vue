<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRefs, watch } from 'vue';

import { mainStore } from '@/store';

let props = defineProps({
  letter: { default: '', required: false, type: String },
  word: { default: '', required: true, type: String },
});

const store = mainStore();
const { word } = toRefs(props);
const { articleText, currentPageId, currentWord } = storeToRefs(store);

currentWord.value = word.value;

store.getSection(currentWord.value, currentPageId.value);

watch(() => props.word, (value) => currentWord.value = value);

watch(currentPageId, (value) => {
  store.getSection(currentWord.value, value);
});
</script>

<template>
  <h1
    id="definition"
    class="break-words font-bold inline rounded-lg text-8xl text-black"
  >
    {{ currentWord }}
  </h1>
  <article
    class="mt-8"
    v-html="articleText"
  />
</template>
