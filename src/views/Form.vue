<script setup>
import Button from '../button/Button.vue';
import Input from '../input/Input.vue';

function handleSubmit(e) {
  e.preventDefault();
  return false;
}
</script>

<template>
  <form @submit="handleSubmit">
    <Input label="Username" name="username" modelValue="sample user" />
    <Input label="Password" name="password" type="password" />
    <Button>Login</Button>
  </form>
</template>
