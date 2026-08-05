
<template>
  <div class="home-page">

    <!-- HERO -->
    <section class="hero py-5">
      <div class="container">

        <div class="row align-items-center">

          <div class="col-lg-6">

            <span class="badge bg-primary mb-3">
              Plataforma de Autenticação
            </span>

            <h1 class="display-4 fw-bold">
              AuthFlow
            </h1>

            <p class="lead text-muted">

              Sistema completo de autenticação desenvolvido em
              Vue 3 + Node.js com JWT, recuperação de senha,
              criptografia BCrypt e arquitetura em camadas.

            </p>

            <div class="mt-4">

              <RouterLink
                to="/login"
                class="btn btn-primary btn-lg me-3"
              >
                Começar
              </RouterLink>

              <a
                href="https://github.com/LucaSilvalsm/projeto_usuario"
                target="_blank"
                class="btn btn-outline-dark btn-lg"
              >
                GitHub
              </a>

            </div>

          </div>

          <div class="col-lg-6 text-center">

            <i class="bi bi-shield-lock-fill hero-icon"></i>

          </div>

        </div>

      </div>
    </section>

    <!-- RECURSOS -->

    <section class="py-5 bg-light">

      <div class="container">

        <h2 class="text-center fw-bold mb-5">
          Recursos
        </h2>

        <div class="row g-4">

          <div class="col-md-4" v-for="item in recursos" :key="item.title">

            <div class="card h-100 shadow-sm border-0">

              <div class="card-body text-center">

                <i
                  :class="item.icon"
                  class="display-5 text-primary"
                ></i>

                <h5 class="mt-3">
                  {{ item.title }}
                </h5>

                <p class="text-muted">
                  {{ item.text }}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- FLUXO -->

    <section class="py-5">

      <div class="container">

        <h2 class="text-center fw-bold mb-5">

          Fluxo da Aplicação

        </h2>

        <div class="flow">

          <div>👤 Usuário</div>

          <span>→</span>

          <div>Vue 3</div>

          <span>→</span>

          <div>Express</div>

          <span>→</span>

          <div>Services</div>

          <span>→</span>

          <div>Repositories</div>

          <span>→</span>

          <div>PostgreSQL</div>

        </div>

      </div>

    </section>

    <!-- STACK -->

    <section class="py-5 bg-light">

      <div class="container">

        <h2 class="text-center fw-bold mb-5">

          Stack Utilizada

        </h2>

        <div class="row text-center">

          <div
            class="col"
            v-for="tech in stack"
            :key="tech"
          >

            <div class="stack-item">

              {{ tech }}

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- SEGURANÇA -->

    <section class="py-5">

      <div class="container">

        <h2 class="text-center fw-bold mb-5">

          Segurança

        </h2>

        <div class="row">

          <div class="col-md-6">

            <ul class="list-group">

              <li class="list-group-item">
                JWT Authentication
              </li>

              <li class="list-group-item">
                BCrypt
              </li>

              <li class="list-group-item">
                Rate Limit
              </li>

              <li class="list-group-item">
                Middlewares
              </li>

              <li class="list-group-item">
                Recuperação por Email
              </li>

              <li class="list-group-item">
                Controle por Cargo
              </li>

            </ul>

          </div>

          <div class="col-md-6 text-center">

            <i class="bi bi-shield-check display-1 text-success"></i>

          </div>

        </div>

      </div>

    </section>

    <!-- CTA -->

    <section class="cta text-center">

      <div class="container">

        <h2 class="fw-bold">

          Pronto para utilizar o AuthFlow?

        </h2>

        <p class="lead">

          Faça login e conheça todas as funcionalidades da plataforma.

        </p>

        <RouterLink
          to="/login"
          class="btn btn-primary btn-lg"
        >

          Entrar

        </RouterLink>

      </div>

    </section>

  </div>
</template>

<script setup>
const recursos = [
  {
    title: "JWT",
    text: "Autenticação segura baseada em Token.",
    icon: "bi bi-key-fill",
  },
  {
    title: "Recuperação",
    text: "Recuperação de senha via e-mail.",
    icon: "bi bi-envelope-fill",
  },
  {
    title: "BCrypt",
    text: "Senhas criptografadas.",
    icon: "bi bi-lock-fill",
  },
  {
    title: "Rate Limit",
    text: "Proteção contra ataques.",
    icon: "bi bi-shield-lock-fill",
  },
  {
    title: "Arquitetura",
    text: "Controller → Service → Repository.",
    icon: "bi bi-diagram-3-fill",
  },
  {
    title: "PostgreSQL",
    text: "Persistência utilizando Knex.",
    icon: "bi bi-database-fill",
  },
];

const stack = [
  "Vue 3",
  "Node.js",
  "Express",
  "JWT",
  "Pinia",
  "Axios",
  "Knex",
  "PostgreSQL",
  "Bootstrap",
];
</script>

<style scoped>
.hero{
    background:linear-gradient(135deg,#2563eb,#1d4ed8);
    color:white;
}

.hero-icon{
    font-size:220px;
    opacity:.15;
}

.flow{
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
    gap:15px;
    font-weight:600;
}

.flow div{
    padding:15px 25px;
    border-radius:12px;
    background:#f8f9fa;
}

.stack-item{
    padding:20px;
    border-radius:12px;
    background:white;
    box-shadow:0 8px 25px rgba(0,0,0,.08);
    font-weight:600;
}

.cta{
    background:#111827;
    color:white;
    padding:80px 0;
}
</style>
