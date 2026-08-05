<script setup>
import { BApp } from 'bootstrap-vue-next'
import Menu from '@/components/MenuNav.vue'
</script>

<template>
  <BApp>
    <Menu />
    <RouterView />
  </BApp>
</template>
