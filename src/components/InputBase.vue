<template>
  <div>
    <input
      v-model="inputValue"
      @input="emit('inputValue', inputValue)"
      :placeholder="placeholder"
      :type="type"
      :style="{ width: props.width + 'px' }"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  width: {
    type: Number,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
});

const inputValue = ref("");

const emit = defineEmits(["inputValue"]);
</script>

<style module>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
