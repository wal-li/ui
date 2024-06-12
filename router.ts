import { createWebHistory, createRouter } from 'vue-router';

import AuthLayout from './layouts/Auth.vue';
import AdminLayout from './layouts/Admin.vue';

import AuthLoginView from './views/auth/Login.vue';
import AdminOverviewView from './views/admin/Overview.vue';
import AdminTableView from './views/admin/Table.vue';
import AdminRecordView from './views/admin/Record.vue';
import NotFoundView from './views/NotFound.vue';

import {
  AUTH_PATH,
  AUTH_LOGIN_PATH,
  ADMIN_PATH,
  ADMIN_OVERVIEW_PATH,
  INDEX_PATH,
  ADMIN_TABLE_PATH,
  ADMIN_NEW_RECORD_PATH,
  CATCH_ALL_PATH,
  ADMIN_RECORD_PATH,
} from './constants';

const routes = [
  {
    path: ADMIN_PATH,
    redirect: ADMIN_OVERVIEW_PATH,
    component: AdminLayout,
    children: [
      {
        path: ADMIN_OVERVIEW_PATH,
        component: AdminOverviewView,
      },
      {
        path: ADMIN_TABLE_PATH,
        component: AdminTableView,
      },
      {
        path: ADMIN_NEW_RECORD_PATH,
        component: AdminRecordView,
      },
      {
        path: ADMIN_RECORD_PATH,
        component: AdminRecordView,
      },
    ],
  },
  {
    path: AUTH_PATH,
    redirect: AUTH_LOGIN_PATH,
    component: AuthLayout,
    children: [
      {
        path: AUTH_LOGIN_PATH,
        component: AuthLoginView,
      },
    ],
  },
  {
    path: INDEX_PATH,
    redirect: ADMIN_OVERVIEW_PATH,
  },
  {
    path: CATCH_ALL_PATH,
    component: NotFoundView,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
