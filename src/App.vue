<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

import InfoBlock from '@/components/InfoBlock.vue';
import NavigationHeader from '@/components/NavigationHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const store = mainStore();

const { definitionLoading, showInfo, wordsLoading } = storeToRefs(store);
</script>

<template>
  <NavigationHeader />
  <div class="flex flex-col-reverse sm:flex-row grow min-h-0">
    <nav class="border-black h-full overflow-y-auto sm:border-r-8 sm:w-96 w-full">
      <ProgressBar
        id="start"
        :is-loading="wordsLoading"
      />
      <router-view name="LeftSidebar" />
    </nav>
    <main class="border-b-8 border-black h-full overflow-y-auto sm:border-b-0 sm:h-auto w-full">
      <ProgressBar
        id="definition"
        :is-loading="definitionLoading"
      />
      <section class="lg:px-20 lg:py-14 px-6 py-4 sm:px-8 sm:py-6">
        <router-view name="MainArea" />
      </section>
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