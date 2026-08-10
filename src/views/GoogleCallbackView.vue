<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import api from '@/services/api'
import notification from '@/services/notificationService'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  try {
    // 1. Pega o JWT enviado pelo backend
    const token = route.query.token



    if (!token) {
      notification.error('Token do Google não encontrado.')
      router.replace('/login')
      return
    }

    // 2. Temporariamente salva o token
    // para que o interceptor do Axios possa enviá-lo
    localStorage.setItem('token', token)

    // 3. Busca os dados completos do usuário
    const response = await api.get('/auth/me')

    const usuario = response.data.dados



    // 4. Salva usuário + token no Pinia/localStorage
    authStore.login(usuario, token)



    // 5. Mensagem de sucesso
    notification.success('Login realizado com sucesso!')

    // 6. Redireciona
    if (usuario.cargo === 'Admin') {
      router.replace('/dashboard/admin')
    } else {
      router.replace('/home')
    }
  } catch (error) {
    console.error('Erro ao finalizar login com Google:', error)

    // Limpa autenticação caso alguma etapa falhe
    authStore.logout()

    notification.error(error.response?.data?.mensagem || 'Erro ao finalizar login com Google.')

    router.replace('/login')
  }
})
</script>

<template>
  <div class="text-center p-5">
    <p>Finalizando login com Google...</p>
  </div>
</template>
