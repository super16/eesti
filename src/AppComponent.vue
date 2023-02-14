<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { mainStore } from '@/store';

import InfoBlock from '@/components/TheInfoBlock.vue';
import NavigationHeader from '@/components/TheNavigationHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import WordListItem from '@/components/WordListItem.vue';
import WordsList from '@/components/TheWordsList.vue';

const store = mainStore();

const {
  currentLetter,
  definitionLoading,
  showInfo,
  wordsLoading,
  words,
} = storeToRefs(store);
</script>

<template>
  <NavigationHeader />
  <div class="content-container">
    <nav class="scrollable nav-menu">
      <ProgressBar
        id="words-list"
        :is-loading="wordsLoading"
      />
      <WordsList
        :aria-busy="wordsLoading"
        aria-describedby="words-list"
      >
        <WordListItem
          v-for="word in words"
          :key="word.title"
          :letter="currentLetter"
          :word="word" 
        />
      </WordsList>
    </nav>
    <main class="main-container scrollable">
      <ProgressBar
        id="definition"
        :is-loading="definitionLoading"
      />
      <section
        :aria-busy="definitionLoading"
        class="definition"
        aria-describedby="definition"
      >
        <router-view />
      </section>
    </main>
  </div>
  <Transition>
    <InfoBlock
      v-if="showInfo"
    />
  </Transition>
</template>

<style scoped lang="postcss">
.content-container {
  @apply
    flex
    flex-col-reverse
    sm:flex-row
    grow
    min-h-0;
}

.definition {
  @apply
    lg:px-20
    lg:py-14
    px-6
    py-4
    sm:px-8
    sm:py-6;
}

.main-container {
  @apply
    border-b-8
    sm:border-b-0
    sm:h-auto
    w-full;
}

.nav-menu {
  @apply
    sm:border-r-8
    sm:w-96
    w-full;
}

.scrollable {
  @apply
    border-black
    h-full
    overflow-y-auto;
}

.v-enter-active, .v-leave-active {
  @apply
    transition
    delay-300;
}

.v-enter-from, .v-leave-to {
  @apply opacity-0;
}
</style>
