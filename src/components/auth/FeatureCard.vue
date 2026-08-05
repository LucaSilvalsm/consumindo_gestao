<template>
  <div class="feature-card">
    <div class="feature-icon">
      <i :class="icon"></i>
    </div>

    <div class="feature-info">
      <h5>{{ titulo }}</h5>
      <p>{{ descricao }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});
</script>
