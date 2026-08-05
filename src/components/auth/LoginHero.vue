<template>
  <div class="login-hero">

    <div class="logo-circle">
      <LockKeyhole :size="34" color="white" />
    </div>

    <h1 class="hero-title">
      Bem-vindo ao
      <span>AuthFlow</span>
    </h1>

    <p class="hero-subtitle">
      Sua plataforma segura e moderna para gerenciamento de acessos
    </p>

    <FeatureCard
      icon="bi bi-shield-check"
      titulo="Segurança Avançada"
      descricao="Criptografia ponta a ponta"
    />

    <FeatureCard
      icon="bi bi-lightning-charge"
      titulo="Ultra Rápido"
      descricao="Resposta em milissegundos"
    />

    <FeatureCard
      icon="bi bi-globe"
      titulo="Acesso Global"
      descricao="Disponível em qualquer lugar"
    />

  </div>
</template>

<script setup>
import FeatureCard from "./FeatureCard.vue";
import {  LockKeyhole } from 'lucide-vue-next'

</script>
