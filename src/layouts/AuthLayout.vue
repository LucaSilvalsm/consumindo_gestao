<template>
  <div class="container-fluid vh-100 p-0">
    <div class="row g-0 h-100">

      <!-- Painel esquerdo -->
      <div class="col-lg-6 auth-left d-none d-lg-flex">

        <div class="auth-content">

          <slot name="hero" />

        </div>

      </div>

      <!-- Painel direito -->
      <div class="col-12 col-lg-6 auth-right">

        <div class="auth-form-container">

          <slot />

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import "@/assets/css/auth.css";
import "@/assets/css/login.css";
</script>
