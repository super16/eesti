<script setup lang="ts">
import AlphabetList from '@/components/AlphabetList.vue';
</script>

<template>
  <header class="flex flex-col border-b-8 border-black">
    <div class="flex border-b-8 border-black">
      <div class="flex border-r-8 border-black">
        <span class="text-2xl text-black font-bold my-4 mx-8">
          Estonian dictionary
        </span>
      </div>
      <div class="grow" />
    </div>
    <div class="flex justify-center">
      <AlphabetList />
    </div>
  </header>
</template>
