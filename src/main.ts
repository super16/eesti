import axios from 'axios';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import './index.css';

axios.defaults.baseURL = 'https://en.wiktionary.org/w/api.php';

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app');
