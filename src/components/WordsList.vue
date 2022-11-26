<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRefs, watch } from 'vue';

import WordListItem from '@/components/WordListItem.vue';
import { mainStore } from '@/store';

let props = defineProps({
  letter: { type: String, required: true },
});

const { letter } = toRefs(props);
const store = mainStore();
const { currentLetter, words } = storeToRefs(store);

currentLetter.value = letter.value;

store.getWords(currentLetter.value);

watch(letter, (value) => {
  currentLetter.value = value;
  store.getWords(currentLetter.value);
});
</script>

<template>
  <ul
    id="start"
    class="font-bold p-4 text-black text-xl"
  >
    <WordListItem
      v-for="word in words"
      :key="word.title"
      :letter="currentLetter"
      :word="word" 
    />
  </ul>
</template>
