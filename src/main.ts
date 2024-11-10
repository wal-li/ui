import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import './style.css';
import './theme.css';

import App from './App.vue';
import { routes } from './routes';

// router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// app
const app = createApp(App);

app.use(router);
app.mount('#app');
