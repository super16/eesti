<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { mainStore } from '@/store';

let props = defineProps({
  letter: { type: String, required: true },
  word: { type: Object, required: true },
});

const router = useRouter();
const store = mainStore();
const { currentWord, currentPageId } = storeToRefs(store);

const href: string = `${import.meta.env.BASE_URL}/${props.letter}/${props.word.title}`;

function goToPage(): void {
  currentPageId.value = props.word.pageid;
  router.push({
    name: 'exactWord',
    params: {
      letter: props.letter,
      word: props.word.title,
    },
  });
}
</script>

<template>
  <li class="m-2.5">
    <span
      v-if="currentWord === word.title"
      class="item decoration-red-400"
    >
      {{ word.title }}
    </span>
    <a
      v-else
      class="item item-link"
      :href="href"
      @click.prevent="goToPage"
    >
      {{ word.title }}
    </a>
  </li>
</template>

<style scoped lang="postcss">
.item {
  @apply
    decoration-4
    underline;
}

.item-link {
  @apply
    decoration-indigo-400
    hover:cursor-pointer
    hover:decoration-8
    hover:tracking-wider;
}
</style>
