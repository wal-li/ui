import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import axios from 'axios';

import {
  HTTP_FORBIDDEN,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK,
  HTTP_STORE_NAME,
} from '../constants';

export const storeName = HTTP_STORE_NAME;

export const useHttpStore = defineStore(storeName, () => {
  const baseURL = import.meta.env.WALLI_BASE_API;
  const state = useStorage(storeName, { authToken: null }, localStorage);
  const noReq = ref(0);
  const isLoading = computed(() => noReq.value !== 0);

  /**
   * Create HTTP request
   * @returns {import('axios').AxiosInstance}
   */
  function createRequest() {
    // compose headers
    const headers = {};
    if (state.value.authToken) {
      headers['Authorization'] = `Bearer ${state.value.authToken}`;
    }

    // create instance
    const ins = axios.create({
      baseURL,
      validateStatus: (status) => {
        // clear authToken with forbidden
        if (status === HTTP_FORBIDDEN) {
          state.value.authToken = null;
          return false;
        }

        return status >= HTTP_OK && status < HTTP_INTERNAL_SERVER_ERROR;
      },
      headers,
    });

    ins.interceptors.request.use(function (config) {
      noReq.value++;
      return config;
    });

    ins.interceptors.response.use(
      function (response) {
        noReq.value--;
        return response;
      },
      function (error) {
        noReq.value--;
        return Promise.reject(error);
      },
    );

    return ins;
  }

  return {
    isLoading,
    baseURL,
    state,
    createRequest,
  };
});
