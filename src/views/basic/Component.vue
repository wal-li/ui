<script setup lang="ts">
import Button from '@/components/Button.vue';
import Field from '@/components/Field.vue';
import Input from '@/components/Input.vue';
import GiftIcon from '@/icons/GiftIcon.vue';
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-4xl font-black uppercase">Components</h1>

    <Field label="XS Input + Button" helper-text="text-xs h-6 px-1.5" v-slot="{ id }">
      <Input :id="id" size="xs" />
      <Button size="xs">Solid</Button>
      <Button size="xs" class="hidden lg:block"><GiftIcon class="w-4 h-4 -mx-0.5" /></Button>
      <Button size="xs" outlined>Outlined</Button>
      <Button size="xs" ghosted class="hidden lg:block">Ghosted</Button>
    </Field>

    <Field label="SM Input + Button" helper-text="text-sm h-8 px-2" v-slot="{ id }">
      <Input :id="id" size="sm" />
      <Button size="sm">Solid</Button>
      <Button size="sm" class="hidden lg:block"><GiftIcon class="w-5 h-5 -mx-0.5" /></Button>
      <Button size="sm" outlined>Outlined</Button>
      <Button size="sm" ghosted class="hidden lg:block">Ghosted</Button>
    </Field>

    <Field label="BASE Input + Button" helper-text="text-base h-10 px-3" v-slot="{ id }">
      <Input :id="id" />
      <Button>Solid</Button>
      <Button class="hidden lg:block"><GiftIcon class="w-6 h-6 -mx-1" /></Button>
      <Button outlined>Outlined</Button>
      <Button ghosted class="hidden lg:block">Ghosted</Button>
    </Field>

    <Field label="Buttons">
      <template #content>
        <div class="flex gap-2 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="surface">Surface</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="muted">Muted</Button>
          <Button variant="background">Background</Button>
          <Button variant="foreground">Foreground</Button>
          <Button variant="black">Black</Button>
          <Button variant="white">White</Button>
        </div>
      </template>
    </Field>
  </div>
</template>
