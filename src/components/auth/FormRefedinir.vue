<template>
  <div class="auth-form">
    <BaseLogo />

    <div class="mb-4 text-center">
      <h2 class="fw-bold mb-2">Redefinir Senha</h2>

      <p class="text-muted mb-0">Digite sua nova senha para concluir a recuperação da conta.</p>
    </div>

    <form @submit.prevent="alterarSenha">
      <input type="email" v-model="form.email" autocomplete="username" hidden readonly />

      <BaseInput
        label="Nova senha"
        type="password"
        autocomplete="new-password"
        placeholder="Digite sua nova senha"
        :icon="Lock"
        v-model="form.senha"
        :error="errors.senha"
      />

      <BaseInput
        label="Confirmar senha"
        type="password"
        autocomplete="new-password"
        placeholder="Confirme sua senha"
        :icon="Lock"
        v-model="form.confirmarSenha"
        :error="errors.confirmarSenha"
      />

      <BaseButton type="submit" :loading="loading"> Redefinir Senha </BaseButton>
    </form>

    <div class="text-center mt-4">
      <RouterLink to="/login"> Voltar ao Login </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Lock } from 'lucide-vue-next'

import BaseLogo from '@/components/base/BaseLogo.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

import notification from '@/services/notificationService'

import { validarToken, redefinirSenha as redefinirSenhaService } from '@/services/authService'

import { validarRedefinicao } from '@/validations/redefinirSenhaValidation'

const router = useRouter()
const route = useRoute()

const loading = ref(false)

const form = reactive({
  senha: '',
  confirmarSenha: '',
})

const errors = reactive({
  senha: '',
  confirmarSenha: '',
})

function limparErros() {
  Object.keys(errors).forEach((campo) => {
    errors[campo] = ''
  })
}

/*
|--------------------------------------------------------------------------
| Valida token ao abrir a página
|--------------------------------------------------------------------------
*/

onMounted(async () => {
  const token = route.params.token

  if (!token) {
    notification.error('Token inválido.')

    router.push('/login')

    return
  }

  try {
    await validarToken(token)
  } catch (error) {
    notification.error(error.response?.data?.mensagem ?? 'Token inválido ou expirado.')

    router.push('/login')
  }
})

/*
|--------------------------------------------------------------------------
| Redefinir senha
|--------------------------------------------------------------------------
*/

const alterarSenha = async () => {
  limparErros()
  console.log('Senha:', form.senha)
  console.log('Confirmar:', form.confirmarSenha)
  console.log('Iguais?', form.senha === form.confirmarSenha)

  const validacao = validarRedefinicao(form)
  console.log(validacao)

  if (Object.keys(validacao).length) {
    Object.assign(errors, validacao)

    return
  }

  loading.value = true

  try {
    const token = route.params.token

    const response = await redefinirSenhaService(token, {
      senha: form.senha,
      confirmarSenha: form.confirmarSenha,
    })

    notification.success(response.data.mensagem)

    router.push('/login')
  } catch (error) {
    notification.error(error.response?.data?.mensagem ?? 'Erro ao redefinir senha.')
  } finally {
    loading.value = false
  }
}
</script>
