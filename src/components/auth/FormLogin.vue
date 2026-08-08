<template>
  <div class="card login-card">

    <div class="card-body p-5">
      <BaseLogo />
      <form @submit.prevent="entrar">
        <BaseInput
          v-model="form.email"
          label="Email"
          placeholder="Digite seu email"
          type="email"
          autocomplete="email"
          :icon="Mail"
        />

        <BaseInput
          v-model="form.senha"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          autocomplete="current-password"
          :icon="Lock"
        />

        <div class="d-flex justify-content-between align-items-center mb-4">
          <BaseCheckbox id="lembrar" v-model="form.lembrar" label="Lembrar de mim" />

          <RouterLink to="/esqueci-senha"> Esqueceu a senha? </RouterLink>
        </div>

        <BaseButton type="submit" :loading="loading"> Entrar </BaseButton>
      </form>

      <div class="text-center my-4">
        <small class="text-muted"> Ou continue com </small>
      </div>

      <div class="d-grid gap-2">
        <BaseButton variant="outline-secondary">
          <Icon icon="logos:google-icon" class="me-2" width="18" height="18" />

          Google
        </BaseButton>

        <BaseButton variant="outline-dark">
          <Github :size="18" class="me-2" />

          GitHub
        </BaseButton>
      </div>

      <div class="text-center mt-4">
        Não possui conta?

        <RouterLink to="/cadastro"> Criar conta </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { Mail, Lock, Github } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'

import { login } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'

import BaseLogo from '@/components/base/BaseLogo.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'

import notification from '@/services/notificationService'

import '@/assets/css/login.css'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)

const form = reactive({
  email: '',
  senha: '',
  lembrar: false,
})

const entrar = async () => {
  loading.value = true

  try {
    const response = await login(form)

    console.log('Resposta da API:', response.data)

    const usuario = response.data.dados.usuario
    const token = response.data.dados.token

    // Salva usuário e token
    authStore.login(usuario, token)

    notification.success('Login realizado com sucesso!')

    // Redirecionamento baseado no cargo
    if (usuario.cargo === 'Admin') {
      router.push('/dashboard/admin')
    } else {
      router.push('/home')

    }
  } catch (error) {
    console.error(error)

    notification.error(
      error.response?.data?.mensagem ||
        'E-mail ou senha inválidos.'
    )
  } finally {
    loading.value = false
  }
}
</script>
