import { createRouter, createWebHistory } from "vue-router";

import CadastroView from "@/views/CadastroView.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "splash",
      component: () => import("@/views/SplashView.vue"),
    },

    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },

    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },

    {
      path: "/cadastro",
      name: "cadastro",
      component: CadastroView,
    },

    {
      path: "/esqueci-senha",
      name: "esqueci-senha",
      component: () => import("@/views/EsqueciSenhaView.vue"),
    },

    {
      path: "/auth/redefinir-senha/:token",
      name: "redefinir-senha",
      component: () => import("@/views/RedefinirSenhaView.vue"),
    },

    {
      path: "/dashboard/admin",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),

      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },

    {
      path: "/404",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
    path: "/google/callback",
    name: "GoogleCallback",
    component: () => import("@/views/GoogleCallbackView.vue")
    },

    {
      path: "/:pathMatch(.*)*",
      name: "not-found-catch-all",
      redirect: "/404",
    },
  ],
});

/*
|--------------------------------------------------------------------------
| Router Guard
|--------------------------------------------------------------------------
*/

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: "login",
    };
  }

  if (to.meta.requiresAdmin) {
    if (authStore.usuario?.cargo !== "Admin") {
      return {
        name: "not-found",
      };
    }
  }

  return true;
});

export default router;
