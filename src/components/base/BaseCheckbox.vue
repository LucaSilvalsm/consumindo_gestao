<template>
  <div class="form-check">
    <input
      :id="id"
      class="form-check-input"
      type="checkbox"
      :checked="modelValue"
      @change="updateValue"
    />

    <label
      class="form-check-label"
      :for="id"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  label: {
    type: String,
    required: true,
  },

  id: {
    type: String,
    default: "checkbox",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.checked);
};
</script>
