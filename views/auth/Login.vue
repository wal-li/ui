<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import { useAuthStore } from '../../stores/auth';
import { ADMIN_PATH } from '../../constants';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const username = ref('');
const password = ref('');

/**
 * Submit login form
 * @param {Event} e
 */
async function handleSubmit(e) {
  e.preventDefault();

  try {
    await authStore.login(username.value, password.value);
    router.push(ADMIN_PATH);
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Invalid Login',
      detail: err.response?.data?.error || err.message,
      life: 3000,
    });
  }
}
</script>

<template>
  <div class="p-8 min-h-full flex items-center justify-center">
    <Card class="w-full max-w-[480px]">
      <template #content>
        <form @submit="handleSubmit" class="py-6 md:px-11">
          <div class="mb-6">
            <div class="text-xl font-bold text-surface-900 font-bold mb-2">
              Log in
            </div>
            <span class="text-600 font-medium">Please enter your details</span>
          </div>

          <div class="flex flex-col">
            <IconField icon-position="left" class="w-full mb-6">
              <InputIcon class="pi pi-user" />
              <InputText
                name="username"
                id="username"
                placeholder="Username"
                v-model="username"
                :disabled="authStore.isLoading"
                @keyup.enter="handleSubmit"
              />
            </IconField>

            <IconField icon-position="left" class="w-full mb-6">
              <InputIcon class="pi pi-lock" />
              <InputText
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                :feedback="false"
                v-model="password"
                :disabled="authStore.isLoading"
                @keyup.enter="handleSubmit"
              />
            </IconField>
          </div>

          <Button
            class="w-full"
            label="Login"
            :disabled="authStore.isLoading"
            @click="handleSubmit"
          />
        </form>
      </template>
    </Card>
  </div>
</template>
