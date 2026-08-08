<template>
  <div class="splash" @click="goHome">

    <!-- Background -->
    <div class="splash__bg">
      <div class="splash__orb splash__orb--1"></div>
      <div class="splash__orb splash__orb--2"></div>
      <div class="splash__orb splash__orb--3"></div>
      <div class="splash__grid"></div>
    </div>

    <!-- Particles -->
    <div class="splash__particles">
      <span
        v-for="n in 20"
        :key="n"
        class="dot"
        :style="dotStyle(n)"
      ></span>
    </div>

    <!-- Content -->
    <div class="splash__center" :class="{ show: entered }">

      <!-- Animated shield -->
      <div class="splash__logo">
        <div class="splash__ring splash__ring--1"></div>
        <div class="splash__ring splash__ring--2"></div>
        <div class="splash__ring splash__ring--3"></div>
        <i class="bi bi-shield-lock-fill splash__icon"></i>
      </div>

      <!-- Title -->
      <h1 class="splash__title">
        Auth<span class="splash__accent">Flow</span>
      </h1>

      <!-- Tagline -->
      <p class="splash__tagline">Plataforma de Autenticação Segura</p>

      <!-- Typing line -->
      <div class="splash__typing">
        <span class="splash__cursor">{{ typedText }}</span>
      </div>

      <!-- CTA -->
      <button class="splash__btn" :class="{ show: btnReady }" @click.stop="goHome">
        <i class="bi bi-arrow-right-circle-fill"></i>
        Acessar Plataforma
      </button>

      <!-- Hint -->
      <p class="splash__hint" :class="{ show: btnReady }">
        ou pressione qualquer tecla
      </p>
    </div>

    <!-- Bottom loader bar -->
    <div class="splash__loader" :class="{ done: btnReady }">
      <div class="splash__loader-bar"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const entered = ref(false)
const btnReady = ref(false)
const typedText = ref('')

const phrases = [
  'Vue 3 + Node.js + JWT',
  'BCrypt · Rate Limit · Middlewares',
  'PostgreSQL · Knex · Pinia',
  'Arquitetura em Camadas',
]

let phraseIdx = 0
let charIdx = 0
let isDeleting = false
let typeTimer = null

function typeLoop() {
  const current = phrases[phraseIdx]

  if (!isDeleting) {
    typedText.value = current.substring(0, charIdx + 1)
    charIdx++
    if (charIdx === current.length) {
      isDeleting = true
      typeTimer = setTimeout(typeLoop, 1800)
      return
    }
    typeTimer = setTimeout(typeLoop, 60)
  } else {
    typedText.value = current.substring(0, charIdx - 1)
    charIdx--
    if (charIdx === 0) {
      isDeleting = false
      phraseIdx = (phraseIdx + 1) % phrases.length
      typeTimer = setTimeout(typeLoop, 400)
      return
    }
    typeTimer = setTimeout(typeLoop, 35)
  }
}

function goHome() {
  router.push('/home')
}

function onKey() {
  goHome()
}

function dotStyle() {
  const s = 2 + Math.random() * 5
  return {
    width: s + 'px',
    height: s + 'px',
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDelay: Math.random() * 6 + 's',
    animationDuration: 5 + Math.random() * 10 + 's',
    opacity: 0.15 + Math.random() * 0.3,
  }
}

onMounted(() => {
  setTimeout(() => (entered.value = true), 200)
  setTimeout(() => (btnReady.value = true), 2600)
  setTimeout(typeLoop, 1200)
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  clearTimeout(typeTimer)
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
/* ═══════════════════════════════════
   SPLASH — Full-screen presentation
   ═══════════════════════════════════ */
.splash {
  --blue-dark:  #1e3a8a;
  --blue-mid:   #2563eb;
  --blue-light: #3b82f6;
  --blue-pale:  #93c5fd;

  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, var(--blue-dark) 0%, var(--blue-mid) 50%, var(--blue-light) 100%);
  color: #ffffff;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
}

/* ── Background ── */
.splash__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.splash__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.splash__orb--1 {
  width: 600px; height: 600px;
  background: rgba(255,255,255,.07);
  top: -15%; left: -10%;
  animation: orbMove 16s ease-in-out infinite alternate;
}
.splash__orb--2 {
  width: 450px; height: 450px;
  background: rgba(96,165,250,.1);
  bottom: -10%; right: -5%;
  animation: orbMove 20s ease-in-out infinite alternate-reverse;
}
.splash__orb--3 {
  width: 300px; height: 300px;
  background: rgba(191,219,254,.06);
  top: 50%; left: 60%;
  animation: orbMove 12s ease-in-out infinite alternate;
}
@keyframes orbMove {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(40px, -50px); }
}

.splash__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, black 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, black 20%, transparent 75%);
}

/* particles */
.splash__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.dot {
  position: absolute;
  border-radius: 50%;
  background: #ffffff;
  animation: dotFloat 8s ease-in-out infinite alternate;
}
@keyframes dotFloat {
  0%   { transform: translate(0,0) scale(1); }
  50%  { transform: translate(14px,-22px) scale(1.3); }
  100% { transform: translate(-10px,18px) scale(.8); }
}

/* ── Center content ── */
.splash__center {
  position: relative;
  z-index: 2;
  text-align: center;
  opacity: 0;
  transform: translateY(40px) scale(.95);
  transition: opacity 1s cubic-bezier(.16,1,.3,1) .1s,
              transform 1s cubic-bezier(.16,1,.3,1) .1s;
}
.splash__center.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ── Animated logo ── */
.splash__logo {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash__ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.1);
}
.splash__ring--1 {
  width: 100%; height: 100%;
  border-style: dashed;
  animation: ringRotate 25s linear infinite;
}
.splash__ring--2 {
  width: 78%; height: 78%;
  animation: ringRotate 18s linear infinite reverse;
  border-color: rgba(191,219,254,.15);
}
.splash__ring--3 {
  width: 56%; height: 56%;
  animation: ringRotate 12s linear infinite;
  border-color: rgba(255,255,255,.08);
  border-style: dotted;
}
@keyframes ringRotate { to { transform: rotate(360deg); } }

.splash__icon {
  font-size: 56px;
  color: #ffffff;
  filter: drop-shadow(0 0 30px rgba(255,255,255,.35));
  animation: iconPulse 3.5s ease-in-out infinite;
}
@keyframes iconPulse {
  0%,100% { filter: drop-shadow(0 0 30px rgba(255,255,255,.35)); transform: scale(1); }
  50%     { filter: drop-shadow(0 0 55px rgba(255,255,255,.55)); transform: scale(1.06); }
}

/* ── Title ── */
.splash__title {
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: -.03em;
  line-height: 1;
  margin-bottom: 10px;
}
.splash__accent {
  background: linear-gradient(135deg, #bfdbfe, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* tagline */
.splash__tagline {
  font-size: 1.05rem;
  font-weight: 500;
  color: rgba(255,255,255,.7);
  letter-spacing: .02em;
  margin-bottom: 28px;
}

/* ── Typing ── */
.splash__typing {
  height: 32px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.splash__cursor {
  font-size: .95rem;
  font-weight: 500;
  color: var(--blue-pale);
  border-right: 2px solid rgba(255,255,255,.6);
  padding-right: 4px;
  animation: cursorBlink .8s step-end infinite;
  white-space: nowrap;
}
@keyframes cursorBlink {
  0%, 100% { border-color: rgba(255,255,255,.6); }
  50%      { border-color: transparent; }
}

/* ── Button ── */
.splash__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 38px;
  border-radius: 14px;
  background: #ffffff;
  color: var(--blue-mid);
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 28px rgba(0,0,0,.15);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .6s cubic-bezier(.16,1,.3,1),
              transform .6s cubic-bezier(.16,1,.3,1),
              box-shadow .3s;
  pointer-events: none;
}
.splash__btn.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
.splash__btn:hover {
  box-shadow: 0 10px 40px rgba(0,0,0,.22);
  transform: translateY(-3px);
}
.splash__btn:active {
  transform: translateY(0);
}

/* hint text */
.splash__hint {
  margin-top: 16px;
  font-size: .8rem;
  color: rgba(255,255,255,.4);
  opacity: 0;
  transition: opacity .6s .2s;
}
.splash__hint.show { opacity: 1; }

/* ── Bottom loader bar ── */
.splash__loader {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255,255,255,.08);
  overflow: hidden;
}
.splash__loader-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, transparent, #ffffff, transparent);
  animation: loadBar 2.4s cubic-bezier(.4,0,.2,1) forwards;
}
.splash__loader.done .splash__loader-bar {
  width: 100%;
  background: rgba(255,255,255,.3);
}
@keyframes loadBar {
  0%   { width: 0; }
  100% { width: 100%; }
}

/* ═══════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════ */
@media (max-width: 640px) {
  .splash__logo { width: 120px; height: 120px; margin-bottom: 24px; }
  .splash__icon { font-size: 42px; }
  .splash__title { font-size: 2.2rem; }
  .splash__tagline { font-size: .92rem; }
  .splash__btn { padding: 13px 30px; font-size: .92rem; }
}
</style>
