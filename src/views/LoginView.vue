<template>
  <AuthLayout>

    <template #hero>
      <LoginHero />
    </template>

    <FormLogin />

  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import LoginHero from "@/components/auth/LoginHero.vue";
import FormLogin from "@/components/auth/FormLogin.vue";
</script>
