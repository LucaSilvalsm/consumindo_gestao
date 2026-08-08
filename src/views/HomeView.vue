<template>
  <div class="landing" ref="landingRef">

    <!-- ══════════ HERO ══════════ -->
    <section class="hero">
      <div class="hero__bg">
        <div class="hero__orb hero__orb--1"></div>
        <div class="hero__orb hero__orb--2"></div>
        <div class="hero__orb hero__orb--3"></div>
        <div class="hero__grid-lines"></div>
      </div>

      <!-- floating particles -->
      <div class="hero__particles">
        <span
          v-for="n in 15"
          :key="n"
          class="particle"
          :style="makeParticle(n)"
        ></span>
      </div>

      <div class="container hero__wrap">
        <div class="row align-items-center">

          <!-- left column -->
          <div class="col-lg-6">
            <div class="hero__content" :class="{ show: entered }">

              <span class="hero__badge">
                <span class="hero__badge-dot"></span>
                Plataforma de Autenticação
              </span>

              <h1 class="hero__title">
                Auth<span class="gradient-text">Flow</span>
              </h1>

              <p class="hero__desc">
                Sistema completo de autenticação desenvolvido em
                <strong>Vue 3 + Node.js</strong> com JWT, recuperação de senha,
                criptografia BCrypt e arquitetura em camadas.
              </p>

              <div class="hero__btns">
                <RouterLink to="/login" class="btn-neon btn-neon--filled">
                  <i class="bi bi-rocket-takeoff-fill"></i>
                  Começar Agora
                </RouterLink>
                <a
                  href="https://github.com/LucaSilvalsm/projeto_usuario"
                  target="_blank"
                  class="btn-neon btn-neon--outline"
                >
                  <i class="bi bi-github"></i>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <!-- right column — shield visual -->
          <div class="col-lg-6 d-flex justify-content-center">
            <div class="hero__visual" :class="{ show: entered }">
              <div class="hero__ring hero__ring--outer"></div>
              <div class="hero__ring hero__ring--inner"></div>
              <i class="bi bi-shield-lock-fill hero__icon"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- scroll indicator -->
      <div class="hero__scroll" :class="{ show: entered }">
        <div class="hero__scroll-mouse">
          <div class="hero__scroll-dot"></div>
        </div>
      </div>
    </section>

    <!-- ══════════ RECURSOS ══════════ -->
    <section class="section section--white" id="recursos">
      <div class="container">

        <div class="section__head" v-reveal>
          <span class="section__tag">Funcionalidades</span>
          <h2 class="section__title">Recursos Poderosos</h2>
          <p class="section__sub">Tudo o que você precisa para uma autenticação segura e escalável.</p>
        </div>

        <div class="feat-grid">
          <div
            class="feat-card"
            v-for="(item, i) in recursos"
            :key="item.title"
            v-reveal
            :style="{ '--i': i }"
          >
            <div class="feat-card__glow"></div>
            <div class="feat-card__icon-box">
              <i :class="item.icon"></i>
            </div>
            <h3 class="feat-card__title">{{ item.title }}</h3>
            <p class="feat-card__text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ FLUXO ══════════ -->
    <section class="section section--light" id="fluxo">
      <div class="container">

        <div class="section__head" v-reveal>
          <span class="section__tag">Arquitetura</span>
          <h2 class="section__title">Fluxo da Aplicação</h2>
          <p class="section__sub">Camadas bem definidas para máxima escalabilidade.</p>
        </div>

        <div class="pipeline" v-reveal>
          <div
            class="pipeline__step"
            v-for="(node, i) in flowNodes"
            :key="node.label"
            :style="{ '--i': i }"
          >
            <div class="pipeline__circle">
              <i :class="node.icon"></i>
            </div>
            <span class="pipeline__name">{{ node.label }}</span>

            <!-- connector (except last) -->
            <div class="pipeline__connector" v-if="i < flowNodes.length - 1">
              <svg viewBox="0 0 60 12" class="pipeline__arrow">
                <line x1="0" y1="6" x2="48" y2="6" />
                <polygon points="46,2 54,6 46,10" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ STACK ══════════ -->
    <section class="section section--white" id="stack">
      <div class="container">

        <div class="section__head" v-reveal>
          <span class="section__tag">Tecnologias</span>
          <h2 class="section__title">Stack Utilizada</h2>
          <p class="section__sub">Tecnologias modernas para um sistema robusto.</p>
        </div>

        <div class="chip-wrap" v-reveal>
          <div
            class="chip"
            v-for="(t, i) in stackItems"
            :key="t.name"
            :style="{ '--i': i }"
          >
            <i :class="t.icon" class="chip__icon"></i>
            <span>{{ t.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ SEGURANÇA ══════════ -->
    <section class="section section--light" id="seguranca">
      <div class="container">

        <div class="section__head" v-reveal>
          <span class="section__tag">Proteção</span>
          <h2 class="section__title">Segurança em Primeiro Lugar</h2>
          <p class="section__sub">Múltiplas camadas de proteção para seus dados.</p>
        </div>

        <div class="sec-grid">
          <div
            class="sec-card"
            v-for="(s, i) in seguranca"
            :key="s.title"
            v-reveal
            :style="{ '--i': i }"
          >
            <div class="sec-card__icon">
              <i :class="s.icon"></i>
            </div>
            <div>
              <h4 class="sec-card__title">{{ s.title }}</h4>
              <p class="sec-card__desc">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ CTA ══════════ -->
    <section class="cta" id="cta">
      <div class="cta__bg">
        <div class="cta__orb cta__orb--1"></div>
        <div class="cta__orb cta__orb--2"></div>
      </div>
      <div class="container cta__inner" v-reveal>
        <h2 class="cta__title">
          Pronto para utilizar o <span class="gradient-text">AuthFlow</span>?
        </h2>
        <p class="cta__desc">
          Faça login e conheça todas as funcionalidades da plataforma.
        </p>
        <RouterLink to="/login" class="btn-neon btn-neon--filled btn-neon--lg">
          <i class="bi bi-box-arrow-in-right"></i>
          Entrar na Plataforma
        </RouterLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@/assets/css/teste.css'

/* ── Scroll-reveal custom directive ── */
const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el) } },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    el._obs = obs
  },
  unmounted(el) { el._obs?.disconnect() }
}

/* ── Hero entrance flag ── */
const entered = ref(false)
onMounted(() => { setTimeout(() => (entered.value = true), 250) })

/* ── Random particle styles ── */
function makeParticle() {
  const s = 2 + Math.random() * 4
  return {
    width: s + 'px', height: s + 'px',
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDelay: Math.random() * 6 + 's',
    animationDuration: 5 + Math.random() * 8 + 's',
    opacity: 0.25 + Math.random() * 0.35
  }
}

/* ── Data ── */
const recursos = [
  { title: 'JWT', text: 'Autenticação segura baseada em Token com expiração e refresh.', icon: 'bi bi-key-fill' },
  { title: 'Recuperação', text: 'Recuperação de senha via e-mail com links temporários.', icon: 'bi bi-envelope-fill' },
  { title: 'BCrypt', text: 'Senhas criptografadas com hash adaptativo e salt.', icon: 'bi bi-lock-fill' },
  { title: 'Rate Limit', text: 'Proteção contra brute-force e ataques de força bruta.', icon: 'bi bi-shield-lock-fill' },
  { title: 'Arquitetura', text: 'Controller → Service → Repository com responsabilidades claras.', icon: 'bi bi-diagram-3-fill' },
  { title: 'PostgreSQL', text: 'Persistência robusta com query builder Knex e migrations.', icon: 'bi bi-database-fill' },
]

const flowNodes = [
  { label: 'Usuário', icon: 'bi bi-person-fill' },
  { label: 'Vue 3', icon: 'bi bi-code-slash' },
  { label: 'Express', icon: 'bi bi-hdd-network-fill' },
  { label: 'Services', icon: 'bi bi-gear-fill' },
  { label: 'Repositories', icon: 'bi bi-layers-fill' },
  { label: 'PostgreSQL', icon: 'bi bi-database-fill' },
]

const stackItems = [
  { name: 'Vue 3', icon: 'bi bi-code-slash' },
  { name: 'Node.js', icon: 'bi bi-hdd-stack-fill' },
  { name: 'Express', icon: 'bi bi-hdd-network-fill' },
  { name: 'JWT', icon: 'bi bi-key-fill' },
  { name: 'Pinia', icon: 'bi bi-archive-fill' },
  { name: 'Axios', icon: 'bi bi-arrow-left-right' },
  { name: 'Knex', icon: 'bi bi-tools' },
  { name: 'PostgreSQL', icon: 'bi bi-database-fill' },
  { name: 'Bootstrap', icon: 'bi bi-grid-fill' },
]

const seguranca = [
  { title: 'JWT Authentication', desc: 'Tokens seguros com expiração configurável e refresh.', icon: 'bi bi-key-fill' },
  { title: 'BCrypt Hashing', desc: 'Hash adaptativo com salt único por senha.', icon: 'bi bi-lock-fill' },
  { title: 'Rate Limiting', desc: 'Limitação de requisições contra força bruta.', icon: 'bi bi-speedometer' },
  { title: 'Middlewares', desc: 'Validação e sanitização em cada camada.', icon: 'bi bi-funnel-fill' },
  { title: 'Recuperação por Email', desc: 'Links temporários com token único.', icon: 'bi bi-envelope-check-fill' },
  { title: 'Controle por Cargo', desc: 'Permissões granulares baseadas em roles.', icon: 'bi bi-person-badge-fill' },
]
</script>
