<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

const store = mainStore();
const { currentLetter } = storeToRefs(store);
</script>

<template>
  <h1 class="text-8xl font-bold text-black p-3 rounded-lg inline">
    {{ currentLetter.toUpperCase() }}
  </h1>
</template>
