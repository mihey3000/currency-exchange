<template>
  <select
    v-model="selectedItem"
    @change="
      emit('selectedItem', selectedItem), store.getСurrentCurrency(selectedItem)
    "
  >
    <option
      v-for="option in options"
      :key="option.ID"
      v-bind:value="{
        CharCode: option.CharCode,
        ID: option.ID,
        Name: option.Name,
        Nominal: option.Nominal,
        NumCode: option.NumCode,
        Previous: option.Previous,
        Value: option.Value,
      }"
    >
      {{ option?.CharCode }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import { SelectOptions } from "@/types/general";
import { useStore } from "@/store/useStore";

interface Props {
  options: Array<SelectOptions>;
  topSelect: boolean;
}

const props = defineProps<Props>();

const store = useStore();

const selectedItem: Ref<SelectOptions> = ref(
  props.topSelect ? props.options[13] : props.options[14]
);

const emit = defineEmits(["selectedItem"]);
defineExpose({ selectedItem });
</script>
