import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const usuario = ref(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  const token = ref(
    localStorage.getItem("token") || null
  );

  const isAuthenticated = computed(() => !!token.value);

  const isAdmin = computed(() => {
    return usuario.value?.cargo === "Admin";
  });

  function login(usuarioLogado, jwt) {
    usuario.value = usuarioLogado;
    token.value = jwt;

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioLogado)
    );

    localStorage.setItem("token", jwt);
  }

  function logout() {
    usuario.value = null;
    token.value = null;

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }

  return {
    usuario,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
  };
});
