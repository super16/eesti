import { createRouter, createWebHistory } from 'vue-router';
import LetterView from '@/views/LetterView.vue';
import WordView from '@/views/WordView.vue';

export default createRouter({
  history: createWebHistory('/eesti/'),
  scrollBehavior(to) {
    return new Promise((resolve) => {
      if (to.name === 'wordsList') {
        const start = document.getElementById('words-list');
        if (start) {
          start.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (to.name === 'exactWord') {
        const definitionStart = document.getElementById('definition');
        if (definitionStart) {
          definitionStart.scrollIntoView({ behavior: 'smooth' });
        }
      }
      resolve();
    });
  },
  routes: [
    {
      component: LetterView,
      name: 'wordsList',
      path: '/:letter',
      props: true,
    },
    {
      component: WordView,
      name: 'exactWord',
      path: '/:letter/:word',
      props: true,
    },
    {
      component: LetterView,
      name: 'index',
      path: '/',
      props: true,
    },
  ],
});
