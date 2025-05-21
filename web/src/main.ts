import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import './style.css';

import App from './App.vue';
import { routes } from './router';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.use(createPinia());
app.mount('#app');

window.addEventListener('load', () => {
  const splashScreen = document.getElementById('splashScreen');

  if (splashScreen) splashScreen.style.display = 'none';
});
