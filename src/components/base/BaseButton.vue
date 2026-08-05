<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    :class="[
      'btn',
      `btn-${variant}`,
      {
        'w-100': block,
      },
      'd-flex',
      'justify-content-center',
      'align-items-center',
    ]"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>

    <slot />
  </button>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  block: {
    type: Boolean,
    default: true,
  },

  variant: {
    type: String,
    default: 'primary',
  },

  type: {
    type: String,
    default: 'button',
  },
})
</script>
