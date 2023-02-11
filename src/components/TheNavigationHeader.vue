<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

import AlphabetList from '@/components/TheAlphabetList.vue';

const store = mainStore();

const { showInfo } = storeToRefs(store);
</script>

<template>
  <header class="border-b-8 border-black flex flex-col">
    <div class="border-b-8 border-black flex">
      <div class="border-black flex grow justify-center sm:border-r-8 sm:grow-0 sm:justify-start">
        <span class="font-bold mx-8 my-4 text-2xl text-black">
          Estonian dictionary
        </span>
      </div>
      <div class="hidden sm:flex sm:grow sm:justify-end sm:items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.2"
          stroke="currentColor"
          class="h-10 hover:cursor-pointer hover:text-black mx-6 text-indigo-700 w-10"
          @click="showInfo = !showInfo"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </div>
    </div>
    <AlphabetList />
  </header>
</template>
