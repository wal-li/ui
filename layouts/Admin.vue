<script setup>
import { onMounted, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import ProgressSpinner from 'primevue/progressspinner';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';

import { useTableStore } from '../stores/table';
import { useAuthStore } from '../stores/auth';
import { useGlobalStore } from '../stores/global';
import { AUTH_LOGIN_PATH, ADMIN_PATH } from '../constants';

import AdminMenu from '../components/AdminMenu.vue';

const tableStore = useTableStore();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const router = useRouter();
const route = useRoute();
const toast = useToast();

const adminMenuState = ref(false);
const settingMenuState = ref(false);

const home = ref({
  icon: 'pi pi-home',
  route: ADMIN_PATH,
});

/**
 * Check login and redirect to login page if not
 */
function updateLoginState() {
  if (!authStore.isLoggedIn && route.path !== AUTH_LOGIN_PATH) {
    router.push(AUTH_LOGIN_PATH);
    toast.add({
      severity: 'warn',
      summary: 'Login Required',
      detail: 'Invalid session, please login.',
      life: 3000,
    });
    return;
  }
}

/**
 * Toggle Admin Menu Sidebar
 */
function toggleAdminMenu(nextValue = !adminMenuState.value) {
  adminMenuState.value = nextValue;
}

function toggleSettingMenu(nextValue = !settingMenuState.value) {
  settingMenuState.value = nextValue;
}

onMounted(() => {
  updateLoginState();
  tableStore.loadConfigs();
});

// watch login state
watch(
  () => authStore.isLoggedIn,
  () => {
    updateLoginState();
  },
);

// watch navigation
watch(
  () => route.path,
  () => {
    toggleAdminMenu(false);
  },
);
</script>

<template>
  <div class="h-full">
    <Sidebar
      v-model:visible="adminMenuState"
      :showCloseIcon="false"
      class="admin-menu-sidebar"
    >
      <template #container>
        <AdminMenu />
      </template>
    </Sidebar>

    <Sidebar
      v-model:visible="settingMenuState"
      header="Settings"
      position="right"
    >
      {{ authStore.user }}
    </Sidebar>

    <div
      class="hidden md:block fixed h-full top-0 left-0 w-72 border-r"
      v-if="!adminMenuState"
    >
      <AdminMenu />
    </div>

    <div class="md:ml-72 h-full">
      <div class="h-12 flex items-center border-b">
        <Button
          class="md:hidden"
          icon="pi pi-bars"
          severity="none"
          @click="() => toggleAdminMenu()"
        />

        <div class="w-full">
          <Breadcrumb
            class="admin-breadcumb"
            :home="home"
            :model="globalStore.addresses"
          >
            <template #item="{ item, props }">
              <router-link
                v-if="item.route"
                v-slot="{ href, navigate }"
                :to="item.route"
                custom
              >
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="[item.icon, 'text-color']" />
                  <span
                    class="text-surface-700 dark:text-surface-0/80 hover:underline capitalize"
                    >{{ item.label }}</span
                  >
                </a>
              </router-link>
              <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
              >
                <span class="text-surface-700 dark:text-surface-0/80">{{
                  item.label
                }}</span>
              </a>
            </template>
          </Breadcrumb>
        </div>
        <!-- <h1 class="w-full text-center font-semibold uppercase">
          {{ globalStore.title }}
        </h1> -->

        <Button
          icon="pi pi-cog"
          severity="none"
          @click="() => toggleSettingMenu()"
        />
      </div>
      <div
        v-if="tableStore.isTableLoading"
        class="w-full h-[calc(100%-3rem)] flex items-center justify-center"
      >
        <ProgressSpinner />
      </div>
      <router-view v-else />
    </div>
  </div>
</template>

<style>
.admin-breadcumb {
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
