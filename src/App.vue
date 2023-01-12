<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

import InfoBlock from '@/components/InfoBlock.vue';
import NavigationHeader from '@/components/NavigationHeader.vue';

const store = mainStore();

const { showInfo } = storeToRefs(store);
</script>

<template>
  <NavigationHeader />
  <div class="flex flex-col-reverse sm:flex-row grow min-h-0">
    <nav class="border-black h-full overflow-y-auto sm:border-r-8 sm:w-96 w-full">
      <router-view name="LeftSidebar" />
    </nav>
    <main class="border-b-8 border-black h-full lg:px-20 lg:py-14 overflow-y-auto px-6 py-4 sm:border-b-0 sm:h-auto sm:px-8 sm:py-6 w-full">
      <router-view name="MainArea" />
    </main>
  </div>
  <Transition>
    <InfoBlock
      v-if="showInfo"
    />
  </Transition>
</template>

<style lang="postcss">
.v-enter-active, .v-leave-active {
  @apply transition delay-300;
}

.v-enter-from, .v-leave-to {
  @apply opacity-0;
}
</style>