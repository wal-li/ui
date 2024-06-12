import { defineStore } from 'pinia';
import { useHttpStore } from './http';
import { AUTH_LOGIN_API, AUTH_STORE_NAME } from '../constants';
import { computed, watch } from 'vue';

export const storeName = AUTH_STORE_NAME;

export const useAuthStore = defineStore(storeName, () => {
  const httpStore = useHttpStore();

  const isLoggedIn = computed(() => !!httpStore.state.authToken);
  const user = computed(() => {
    if (!httpStore.state.authToken) return null;
    return JSON.parse(atob(httpStore.state.authToken.split('.')[1]));
  });

  /**
   * Make a login request
   * @param {string} username
   * @param {string} password
   * @returns {string} access token (authToken)
   */
  async function login(username, password) {
    // make request
    const res = await httpStore
      .createRequest({
        autoLoginRedirect: false,
      })
      .post(AUTH_LOGIN_API, {
        username,
        password,
      });

    // validate status
    if (res.status !== 200 && res.data.error) throw new Error(res.data.error);
    else if (res.status !== 200) throw new Error(res.data || res.statusText);

    // save authToken
    httpStore.state.authToken = res.data.data;

    // return
    return res.data.data;
  }

  /**
   * Do logout
   */
  function logout() {
    // clear authToken
    httpStore.state.authToken = null;
  }

  return {
    isLoading: computed(() => httpStore.isLoading),
    isLoggedIn,
    user,
    login,
    logout,
  };
});
