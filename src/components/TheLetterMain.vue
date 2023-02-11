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

watch(() => props.letter, (value) => currentLetter.value = value);
</script>

<template>
  <h1 class="font-bold inline p-3 rounded-lg text-8xl text-black">
    {{ currentLetter.toUpperCase() }}
  </h1>
</template>
