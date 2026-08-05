<template>
  <div class="cadastro-hero">

    <!-- Ícone -->
    <div class="logo-circle mb-5">
      <UserPlus :size="42" />
    </div>

    <!-- Título -->
    <h1 class="hero-title">
      Junte-se a
      <span>nós hoje</span>
    </h1>

    <!-- Subtítulo -->
    <p class="hero-subtitle">
      Milhares de usuários já confiam em nossa plataforma
    </p>

    <!-- Estatísticas -->
    <div class="hero-stats">

      <div>
        <h2>10</h2>
        <small>MIL USUÁRIOS</small>
      </div>

      <div>
        <h2>99</h2>
        <small>% UPTIME</small>
      </div>

      <div>
        <h2>24</h2>
        <small>/7 SUPORTE</small>
      </div>

    </div>

    <!-- Depoimento -->
    <div class="testimonial">

      <div class="stars">
        ★★★★★
      </div>

      <p>
        "A melhor plataforma que já usei.
        Interface limpa, segura e extremamente rápida."
      </p>

      <div class="testimonial-user">

        <div class="avatar">
          M
        </div>

        <div>

          <strong>Marina Silva</strong>

          <small>Desenvolvedora Full Stack</small>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { UserPlus } from "lucide-vue-next";
</script>
