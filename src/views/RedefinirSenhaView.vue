<template>
  <AuthLayout>

    <template #hero>
      <LoginHero />
    </template>

    <FormRefedinir />

  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/AuthLayout.vue";
import LoginHero from "@/components/auth/LoginHero.vue";
import FormRefedinir from "@/components/auth/FormRefedinir.vue";
</script>
