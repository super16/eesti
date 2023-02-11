import { createRouter, createWebHistory } from 'vue-router';
import TheLetterMain from '@/components/TheLetterMain.vue';
import TheWordMain from '@/components/TheWordMain.vue';

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
      component: TheLetterMain,
      name: 'wordsList',
      path: '/:letter',
      props: true,
    },
    {
      component: TheWordMain,
      name: 'exactWord',
      path: '/:letter/:word',
      props: true,
    },
    {
      component: TheLetterMain,
      name: 'index',
      path: '/',
      props: true,
    },
  ],
});
