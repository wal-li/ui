<script setup lang="ts">
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const toast = useToast();

const dataForm = reactive({
  currentPassword: '',
  newPassword: '',
  reNewPassword: '',
});

async function handleSubmit() {
  if (dataForm.newPassword !== dataForm.reNewPassword) {
    toast.add({
      severity: 'warn',
      summary: 'Validation',
      detail: `Re-type New Password is not match.`,
      life: 3000,
    });
    return;
  }

  try {
    await authStore.changePassword(
      dataForm.currentPassword,
      dataForm.newPassword,
    );

    toast.add({
      severity: 'success',
      summary: 'Password updated',
      detail: 'Password was changed, please login again.',
      life: 3000,
    });

    authStore.logout();
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Change Password Error',
      detail: err.response?.data?.error || err.message,
      life: 3000,
    });
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col gap-2 mb-4">
      <label for="currentPassword">Current Password</label>
      <InputText
        type="password"
        name="currentPassword"
        id="currentPassword"
        :disabled="authStore.isLoading"
        v-model="dataForm.currentPassword"
      />
    </div>
    <div class="flex flex-col gap-2 mb-4">
      <label for="newPassword">New Password</label>
      <InputText
        type="password"
        name="newPassword"
        id="newPassword"
        :disabled="authStore.isLoading"
        v-model="dataForm.newPassword"
      />
    </div>
    <div class="flex flex-col gap-2 mb-4">
      <label for="reNewPassword">Re-type New Password</label>
      <InputText
        type="password"
        name="reNewPassword"
        id="reNewPassword"
        :disabled="authStore.isLoading"
        v-model="dataForm.reNewPassword"
      />
    </div>

    <Button
      label="Save"
      :disabled="authStore.isLoading"
      @click="handleSubmit"
    />
  </div>
</template>
