<template>
  <div class="auth-form">
    <BaseLogo />
    <div class="mb-4">
      <h2 class="fw-bold mb-2">Criar conta</h2>

      <p class="text-muted mb-0">
        Preencha seus dados para começar a usar a plataforma
      </p>
    </div>

    <form @submit.prevent="cadastrar">
      <BaseInput
        label="Nome"
        placeholder="Digite seu nome"
        :icon="User"
        v-model="form.nome"
        :error="errors.nome"
      />

      <BaseInput
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        :icon="User"
        v-model="form.sobrenome"
        :error="errors.sobrenome"
      />

      <BaseInput
        label="Email"
        type="email"
        autocomplete="email"
        placeholder="Digite seu email"
        :icon="Mail"
        v-model="form.email"
        :error="errors.email"
      />

      <BaseInput
        label="Senha"
        type="password"
        autocomplete="new-password"
        placeholder="Digite sua senha"
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

      <div class="form-check mt-3 mb-4">
        <input
          id="aceite"
          class="form-check-input"
          type="checkbox"
          v-model="form.aceite"
        />

        <label class="form-check-label" for="aceite">
          Eu concordo com os
          <RouterLink to="#">Termos de Uso</RouterLink>
          e a
          <RouterLink to="#">Política de Privacidade</RouterLink>
        </label>

        <small class="text-danger d-block">
          {{ errors.aceite }}
        </small>
      </div>

      <BaseButton
        type="submit"
        :loading="loading"
      >
        Criar Conta
      </BaseButton>
    </form>

    <div class="text-center mt-4">
      Já possui conta?

      <RouterLink to="/login">
        Entrar
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { User, Mail, Lock } from "lucide-vue-next";

import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseLogo from "@/components/base/BaseLogo.vue";
import * as usuarioService from "@/services/usuarioService";
import { validarCadastro } from "@/validations/usuarioValidation";

const router = useRouter();

const loading = ref(false);

const form = reactive({
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  confirmarSenha: "",
  aceite: false,
});

const errors = reactive({
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  confirmarSenha: "",
  aceite: "",
});

function limparErros() {
  Object.keys(errors).forEach((campo) => {
    errors[campo] = "";
  });
}

const cadastrar = async () => {
  limparErros();

  const erros = validarCadastro(form);

  Object.assign(errors, erros);

  if (Object.keys(erros).length > 0) {
    return;
  }

  loading.value = true;

  try {
    const usuario = {
      nome: form.nome.trim(),
      sobrenome: form.sobrenome.trim(),
      email: form.email.trim(),
      senha: form.senha,
    };

    const resposta = await usuarioService.cadastrar(usuario);

    alert(resposta.mensagem);

    router.push("/login");
  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.mensagem);
    } else {
      alert("Erro ao conectar com o servidor.");
    }
  } finally {
    loading.value = false;
  }
};
</script>


