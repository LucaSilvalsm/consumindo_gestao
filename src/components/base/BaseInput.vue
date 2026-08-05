<template>
  <div class="mb-3">
    <label v-if="label" class="form-label">
      {{ label }}
    </label>

    <div class="input-group">
      <!-- Ícone esquerdo -->
      <span v-if="icon" class="input-group-text">
        <component :is="icon" :size="18" />
      </span>

      <!-- Campo -->
      <input
        class="form-control"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="updateValue"
      />

      <!-- Mostrar senha -->
      <button
        v-if="type === 'password'"
        class="btn btn-outline-secondary"
        type="button"
        @click="mostrarSenha = !mostrarSenha"
      >
        <Eye v-if="!mostrarSenha" :size="18" />

        <EyeOff v-else :size="18" />
      </button>
    </div>

    <!-- Mensagem de erro -->
    <small v-if="error" class="text-danger">
      {{ error }}
    </small>

    <!-- Barra de força -->
    <div v-if="type === 'password' && modelValue" class="mt-2">
      <div class="progress">
        <div
          class="progress-bar"
          :class="strengthClass"
          :style="{ width: strength * 20 + '%' }"
        ></div>
      </div>

      <small class="password-strength" :class="strengthClass"> Senha {{ strengthText }} </small>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  label: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "",
  },

  autocomplete: {
    type: String,
    default: "",
  },

  // Aceita componentes do Lucide e outros componentes Vue
  icon: {
    type: [Object, Function],
    default: null,
  },

  error: {
    type: String,
    default: "",
  },

  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue"]);

const mostrarSenha = ref(false);

const inputType = computed(() => {
  if (props.type !== "password") {
    return props.type;
  }

  return mostrarSenha.value ? "text" : "password";
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const strength = computed(() => {
  if (props.type !== "password") {
    return 0;
  }

  const senha = props.modelValue || "";

  let score = 0;

  if (senha.length >= 8) score++;
  if (/[A-Z]/.test(senha)) score++;
  if (/[a-z]/.test(senha)) score++;
  if (/[0-9]/.test(senha)) score++;
  if (/[^A-Za-z0-9]/.test(senha)) score++;

  return score;
});

const strengthText = computed(() => {
  if (strength.value <= 2) return "Fraca";
  if (strength.value === 3) return "Média";
  return "Forte";
});

const strengthClass = computed(() => {
  if (strength.value <= 2) return "strength-weak";
  if (strength.value === 3) return "strength-medium";
  return "strength-strong";
});
</script>
<style scoped>
.password-strength {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Fraca */
.strength-weak {
  color: #dc3545;
}

/* Média */
.strength-medium {
  color: #ffc107;
}

/* Forte */
.strength-strong {
  color: #198754;
}
</style>
