<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRefs, watch } from 'vue';

import { mainStore } from '@/store';

let props = defineProps({
  pageId: { type: String, required: true },
  word: { type: String, required: true },
});

const { pageId, word } = toRefs(props);
const store = mainStore();
const { articleText, currentWord } = storeToRefs(store);

currentWord.value = word.value;

store.getSection(currentWord.value, pageId.value);

watch(word, (value, prevCount) => {
  currentWord.value = value;
});

watch(pageId, (value, prevCount) => {
  store.getSection(currentWord.value, pageId.value);
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
