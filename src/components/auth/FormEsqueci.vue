<template>
  <div class="card login-card">
    <div class="card-body p-5">

      <BaseLogo />

      <div class="page-header">
        <h2>Esqueceu sua senha?</h2>

        <p>
          Informe seu e-mail cadastrado e enviaremos um link para
          redefinir sua senha.
        </p>
      </div>

      <form @submit.prevent="esquecisenha">

        <BaseInput
          v-model="form.email"
          label="Email"
          placeholder="Digite seu email"
          type="email"
          autocomplete="email"
          :icon="Mail"
        />

        <div class="d-flex justify-content-between align-items-center mb-4">
          <RouterLink to="/login">
            Lembrou da senha?
          </RouterLink>
        </div>

        <BaseButton
          type="submit"
          :loading="loading"
        >
          Enviar
        </BaseButton>

      </form>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Mail } from "lucide-vue-next";

import BaseLogo from "@/components/base/BaseLogo.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { esqueciSenha } from "@/services/authService";
import notification from "@/services/notificationService";
import { validarEmail } from "@/validations/emailValidation";

const router = useRouter();

const loading = ref(false);

const form = reactive({
  email: "",
});

const esquecisenha = async () => {

  // Validação do Front
  const erro = validarEmail(form.email);

  if (erro) {
    notification.error(erro);
    return;
  }

  loading.value = true;

  try {

    const response = await esqueciSenha(form);

    notification.success(response.data.mensagem);

    // Espera 2 segundos para o usuário ler a mensagem
    setTimeout(() => {
      router.push("/login");
    }, 2000);

  } catch (error) {

    notification.error(
      error.response?.data?.mensagem ||
      "Erro ao solicitar recuperação de senha."
    );

  } finally {

    loading.value = false;

  }
};
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.page-header p {
  color: #6b7280;
  line-height: 1.6;
  max-width: 360px;
  margin: auto;
}
</style>
