<template>
  <AuthLayout>

    <template #hero>
      <CadastroHero />
    </template>

    <FormCadastro />

  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import CadastroHero from "@/components/auth/CadastroHero.vue";
import FormCadastro from "@/components/auth/FormCadastro.vue";
</script>
