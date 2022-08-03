<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { mainStore } from '@/store';

let props = defineProps({
  letter: { type: String, required: true },
  word: { type: Object, required: true },
});

const store = mainStore();
const { currentWord } = storeToRefs(store);
</script>

<template>
  <li class="m-2.5">
    <span
      v-if="currentWord === word.title"
      class="decoration-4 decoration-red-400 underline"
    >
      {{ word.title }}
    </span>
    <router-link
      v-else
      :to="{
        name: 'exactWord',
        params: {
          letter,
          pageId: word.pageid,
          word: word.title
        },
      }"
      class="decoration-4 decoration-indigo-400 hover:decoration-8 hover:tracking-wider underline"
    >
      {{ word.title }}
    </router-link>
  </li>
</template>