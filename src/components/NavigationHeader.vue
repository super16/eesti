<script setup lang="ts">
import AlphabetList from '@/components/AlphabetList.vue';
</script>

<template>
  <header class="border-b-8 border-black flex flex-col">
    <div class="border-b-8 border-black flex">
      <div class="border-black flex grow justify-center sm:border-r-8 sm:grow-0 sm:justify-start">
        <span class="font-bold mx-8 my-4 text-2xl text-black">
          Estonian dictionary
        </span>
      </div>
      <div class="hidden sm:flex sm:grow" />
    </div>
    <div class="flex justify-center">
      <AlphabetList />
    </div>
  </header>
</template>
