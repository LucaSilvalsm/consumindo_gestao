import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createBootstrap } from "bootstrap-vue-next";

const app = createApp(App);

// Cria o Pinia
const pinia = createPinia();

// Registra os plugins
app.use(pinia);
app.use(router);
app.use(createBootstrap());
app.use(Toast)


// Monta a aplicação
app.mount("#app");
