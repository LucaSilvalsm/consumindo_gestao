<script setup>
  import { BNav } from 'bootstrap-vue-next'
</script>
<template>
  <BNav class="menu" pills>
    <BNavItem to="/home"> Home </BNavItem>

    <BNavItem to="/login"> Login </BNavItem>

    <BNavItem to="/cadastro"> Cadastro </BNavItem>

  </BNav>
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
  padding: 15px;
  background-color: #0d6efd;
}

.menu :deep(.nav-link) {
  color: white;
}

.menu :deep(.nav-link.active) {
  background-color: white;
  color: #0d6efd;
}
</style>
