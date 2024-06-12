// STORES
export const HTTP_STORE_NAME = 'http';
export const AUTH_STORE_NAME = 'auth';
export const TABLE_STORE_NAME = 'table';
export const GLOBAL_STORE_NAME = 'global';

export const GLOBAL_DEFAULT_MENU_ITEM_PRIORITY = 99;

// API PATHS
export const AUTH_LOGIN_API = '/auth/login';
export const AUTH_CHANGE_PASSWORD_API = '/auth/change-password';
export const TABLE_LIST_API = '/tables';
export const TABLE_API = '/tables';

// ROUTER PATHS
export const BASE_URL = import.meta.env.BASE_URL;
export const INDEX_PATH = BASE_URL + '/';

export const NOT_FOUND_PATH = BASE_URL + '/notfound';
export const CATCH_ALL_PATH = BASE_URL + '/:pathMatch(.*)*';

export const AUTH_PATH = BASE_URL + '/auth';
export const AUTH_LOGIN_PATH = BASE_URL + '/auth/login';

export const ADMIN_PATH = BASE_URL + '/admin';
export const ADMIN_OVERVIEW_PATH = BASE_URL + '/admin/overview';
export const ADMIN_CHANGE_PASSWORD_PATH = BASE_URL + '/admin/change-password';

export const ADMIN_TABLE_PATH = BASE_URL + '/admin/tables/:tableName';
export const ADMIN_NEW_RECORD_PATH =
  BASE_URL + '/admin/tables/:tableName/create';
export const ADMIN_RECORD_PATH =
  BASE_URL + '/admin/tables/:tableName/:recordId';

// HTTP
export const HTTP_OK = 200;
export const HTTP_FORBIDDEN = 403;
export const HTTP_INTERNAL_SERVER_ERROR = 500;

// OTHERS
export const AUTH_CREATE_PERM = 'create';
export const AUTH_READ_PERM = 'read';
export const AUTH_UPDATE_PERM = 'update';
export const AUTH_DELETE_PERM = 'delete';
export const AUTH_PERMS = [
  AUTH_CREATE_PERM,
  AUTH_READ_PERM,
  AUTH_UPDATE_PERM,
  AUTH_DELETE_PERM,
];
