<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

const store = mainStore();
const { currentLetter } = storeToRefs(store);
</script>

<template>
  <h1 class="font-bold inline p-3 rounded-lg text-8xl text-black">
    {{ currentLetter.toUpperCase() }}
  </h1>
</template>
