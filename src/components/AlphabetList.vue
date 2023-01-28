<script setup lang="ts">
import { mainStore } from '@/store';
import { storeToRefs } from 'pinia';

const alphabet: Array<string> = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'Š',
  'Z',
  'Ž',
  'T',
  'U',
  'V',
  'W',
  'Õ',
  'Ä',
  'Ö',
  'Ü',
  'X',
  'Y',
];

const bgColors: Array<string> = [
  'bg-amber-100',
  'bg-cyan-100',
  'bg-emerald-100',
  'bg-fuchsia-200',
  'bg-pink-200',
  'bg-yellow-200',
];

function randomBgColor(): string {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}

function randomRotate(): string {
  const rotate = Math.random() < 0.5 ? '-' : '';
  return `${rotate}rotate-12 hover:-rotate-0 hover:scale-110`;
}

const store = mainStore();
const { currentLetter } = storeToRefs(store);
</script>

<template>
  <nav class="flex justify-center">
    <ul class="flex flex-wrap">
      <li
        v-for="letter in alphabet"
        :key="letter"
        class="border-black border-4 hover:hue-rotate-180 mx-3 my-4 rounded-full"
        :class="{
          'bg-black scale-110': letter.toLowerCase() === currentLetter,
          [randomRotate()]: letter.toLowerCase() !== currentLetter,
          [randomBgColor()]: letter.toLowerCase() !== currentLetter,
        }"
      >
        <router-link
          v-if="letter.toLowerCase() !== currentLetter"
          :to="{
            name: 'wordsList',
            params: { letter: letter.toLowerCase() },
          }"
          class="font-bold p-2 text-black"
        >
          {{ letter }}
        </router-link>
        <span
          v-else
          class="font-bold p-2 text-white"
        >
          {{ letter }}
        </span>
      </li>
    </ul>
  </nav>
</template>
