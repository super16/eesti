<template>
  <ul class="words-list">
    <slot />
  </ul>
</template>

<style scoped lang="postcss">
.words-list {
  @apply
    font-bold
    p-4
    text-black
    text-xl;
}
</style>
