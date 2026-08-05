import { createRouter, createWebHistory } from 'vue-router'


import CadastroView from '@/views/CadastroView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/esqueci-senha',
      name: 'esqueci-senha',
      component: () => import('@/views/EsqueciSenhaView.vue')
    },
    {
      path: '/auth/redefinir-senha/:token',
      name: 'redefinir-senha',
      component: () => import('@/views/RedefinirSenhaView.vue')
    }

  ]
})

export default router
