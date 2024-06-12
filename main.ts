import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

import 'primeicons/primeicons.css';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';

import './style.css';

import Lara from './presets/lara';
import App from './App.vue';
import routes from './routes';

// create app
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// routing
app.use(router);

// state
app.use(createPinia());

// ui
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);

// mount
app.mount('#app');
