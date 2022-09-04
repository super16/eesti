<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

import InfoBlock from '@/components/InfoBlock.vue';
import NavigationHeader from '@/components/NavigationHeader.vue';
import TheDefinitionArea from '@/components/TheDefinitionArea.vue';
import TheNavigationSidebar from '@/components/TheNavigationSidebar.vue';

const store = mainStore();

const { showInfo } = storeToRefs(store);
</script>

<template>
  <NavigationHeader />
  <div class="flex flex-col-reverse sm:flex-row grow min-h-0">
    <TheNavigationSidebar />
    <TheDefinitionArea />
  </div>
  <Transition>
    <InfoBlock
      v-if="showInfo"
    />
  </Transition>
</template>
