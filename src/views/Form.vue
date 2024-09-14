<script setup>
import Button from '../button/Button.vue';
import Input from '../input/Input.vue';
import Field from '../input/Field.vue';
import Heading from '../heading/Heading.vue';

function handleSubmit(e) {
  e.preventDefault();
  return false;
}
</script>

<template>
  <Heading level="2">Basic</Heading>
  <form @submit="handleSubmit" class="flex flex-col gap-4 mb-4">
    <Field label="Username" v-slot="{ id }">
      <Input :id="id" name="username" modelValue="sample user" />
    </Field>
    <Field label="Password" v-slot="{ id }">
      <Input :id="id" name="password" type="password" />
    </Field>
    <Button>Login</Button>
  </form>

  <Heading level="2">Inline</Heading>
  <form @submit="handleSubmit">
    <Field v-slot="{ id }" class="flex">
      <Input :id="id" name="search" />
      <Button>Search</Button>
    </Field>
  </form>
</template>
