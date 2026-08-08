<template>
  <div class="container min-vh-100 d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div class="display-1 fw-bold text-primary">
        404  Not Found
      </div>

      <h1 class="fw-bold mb-3">
        Página não encontrada
      </h1>

      <p class="text-muted mb-4">
        A página que você está procurando não existe.

      </p>

      <RouterLink
        to="/home"
        class="btn btn-primary px-4"
      >
        Voltar para Home
      </RouterLink>
    </div>
  </div>
</template>
