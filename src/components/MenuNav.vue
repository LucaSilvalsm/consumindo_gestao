<script setup>
import { BNav } from 'bootstrap-vue-next'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import notification from '@/services/notificationService'

const router = useRouter()
const authStore = useAuthStore()

const sair = () => {
  authStore.logout()
  notification.success('Logout realizado com sucesso!')

  router.push('/login')
}
</script>
<template>
  <BNav class="menu" pills>
    <BNavItem v-if="authStore.isAuthenticated" to="/home"> Home </BNavItem>

    <!-- Login: visitante -->
    <BNavItem v-if="!authStore.isAuthenticated" to="/login"> Login </BNavItem>

    <!-- Cadastro: visitante -->
    <BNavItem v-if="!authStore.isAuthenticated" to="/cadastro"> Cadastro </BNavItem>

    <!-- Dashboard: somente Admin -->
    <BNavItem
      v-if="authStore.isAuthenticated && authStore.usuario?.cargo === 'Admin'"
      to="/dashboard/admin"
    >
      Dashboard
    </BNavItem>

    <!-- Sair: usuário logado -->
    <BNavItem v-if="authStore.isAuthenticated" @click="sair"> Sair </BNavItem>
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
