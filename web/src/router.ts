import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_PATHS } from '@/constants';
import Layout from '@/layouts/Layout.vue';
import HomeView from '@/views/HomeView.vue';
import ButtonView from '@/views/ButtonView.vue';
import IconView from '@/views/IconView.vue';
import InputView from '@/views/InputView.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTE_PATHS.ROOT,
    component: Layout,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        component: HomeView,
      },
      {
        path: ROUTE_PATHS.BUTTON,
        component: ButtonView,
      },
      {
        path: ROUTE_PATHS.ICON,
        component: IconView,
      },
      {
        path: ROUTE_PATHS.INPUT,
        component: InputView,
      },
    ],
  },
];
