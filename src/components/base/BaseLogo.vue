<template>
  <div class="brand">
    <div class="logo-circle">
      <LockKeyhole :size="34" color="white" />
    </div>

    <div class="brand-text">
      <h1 class="brand-title">AuthFlow</h1>

      <p class="brand-subtitle">Plataforma segura de autenticação</p>
    </div>
  </div>
</template>
<script setup>
import { LockKeyhole } from "lucide-vue-next";
</script>
<style scoped>
.brand {
  display: flex;
  justify-content: center; /* centraliza horizontalmente */
  align-items: center; /* centraliza verticalmente */

  gap: 18px;

  width: 100%;

  margin-bottom: 10px;
}

.logo-circle {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #2563eb, #1d4ed8);

  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.25);
}

.brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-title {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.brand-subtitle {
  margin-top: 0;
  margin-bottom: 0;

  color: #6b7280;
}
</style>
