import axios from 'axios';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import AppComponent from './AppComponent.vue';
import router from './router';
import './index.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createApp(AppComponent)
  .use(createPinia())
  .use(router)
  .mount('#app');
