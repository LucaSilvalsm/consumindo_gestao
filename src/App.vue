<script setup>
import { BApp } from 'bootstrap-vue-next'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Menu from '@/components/MenuNav.vue'

const route = useRoute()
const isSplash = computed(() => route.name === 'splash')
</script>

<template>
  <BApp>
    <Menu v-if="!isSplash" />
    <RouterView />
  </BApp>
</template>
