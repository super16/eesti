import { createRouter, createWebHistory } from 'vue-router';
import WordsList from '@/components/WordsList.vue';
import TheLetterMain from '@/components/TheLetterMain.vue';
import TheWordMain from '@/components/TheWordMain.vue';

export default createRouter({
  history: createWebHistory('/eesti/'),
  scrollBehavior(to) {
    return new Promise((resolve) => {
      if (to.name === 'wordsList') {
        const start = document.getElementById('start');
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
      components: {
        LeftSidebar: WordsList,
        MainArea: TheLetterMain,
      },
      name: 'wordsList',
      path: '/:letter',
      props: true,
    },
    {
      components: {
        LeftSidebar: WordsList,
        MainArea: TheWordMain,
      },
      name: 'exactWord',
      path: '/:letter/:word',
      props: true,
    },
    {
      components: {
        LeftSidebar: WordsList,
        MainArea: TheLetterMain,
      },
      name: 'index',
      path: '/',
      props: {
        LeftSidebar: () => ({ letter: 'a' }),
        MainArea: true,
      },
    },
  ],
});
