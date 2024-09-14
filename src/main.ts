import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import './style.css';
import './theme.css';

import App from './App.vue';
import Layout from './Layout.vue';
import Charts from './views/Charts.vue';
import Buttons from './views/Buttons.vue';
import Headings from './views/Headings.vue';
import Form from './views/Form.vue';
import Colors from './views/Colors.vue';

// router
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Charts,
      },
      {
        path: '/headings',
        component: Headings,
      },
      {
        path: '/buttons',
        component: Buttons,
      },
      {
        path: '/form',
        component: Form,
      },
      {
        path: '/colors',
        component: Colors,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// app
const app = createApp(App);

app.use(router);
app.mount('#app');
