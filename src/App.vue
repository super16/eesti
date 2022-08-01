<script setup lang="ts">
import TheDefinitionArea from '@/components/TheDefinitionArea.vue';
import NavigationHeader from '@/components/NavigationHeader.vue';
import TheNavigationSidebar from '@/components/TheNavigationSidebar.vue';
</script>

<template>
  <NavigationHeader />
  <div class="flex grow min-h-0">
    <TheNavigationSidebar />
    <TheDefinitionArea />
  </div>
</template>
