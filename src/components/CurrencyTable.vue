<template>
  <div>
    <div :class="$style['header']">
      <span>Введите название валюты:</span>
      <InputBase
        @inputValue="mySearch"
        :placeholder="'Доллар, евро, иены ...'"
      />
    </div>
    <ul :class="$style['container']">
      <li
        v-for="item in currenciesFiltered.length ? currenciesFiltered : options"
        :key="item.ID"
      >
        <div :class="$style['currency-item']">
          <div :class="$style['code']">{{ item.CharCode }}</div>
          <div :class="$style['name']">{{ item.Name }}</div>
          <div :class="$style['nominal']">{{ item.Nominal }}</div>
          <div :class="$style['value-prev']">
            <div :class="$style['value']">{{ item.Value }}</div>
            <div
              :class="[
                $style['prev'],
                { [$style['green']]: item.Previous > 0 },
                { [$style['red']]: item.Previous < 0 },
              ]"
            >
              {{ item.Previous.toFixed(3) }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

import InputBase from "@/components/InputBase.vue";

import { SelectOptions } from "@/types/general";

interface Props {
  options: Array<SelectOptions>;
}

const props = defineProps<Props>();

const currenciesFiltered: Ref<SelectOptions[]> = ref([]);

function mySearch(inputData: string) {
  // получаем массив булевых значений, true если строка содержит введенную подстроку, false если нет
  let searchResult = props.options.map((item) =>
    item.Name.toLocaleLowerCase().includes(inputData.toLocaleLowerCase())
  );

  // получаем массив индексов значений true
  const resultIndexes: number[] = searchResult
    .map((item, index) => (item ? index : null))
    .filter((item) => item !== null) as number[];

  // добавляем элементы с соответствующими индексами в пустой массив
  let newOptions: SelectOptions[] = [];
  resultIndexes.forEach((item) => newOptions.push(props.options[item]));

  // присваиваем получившийся массив переменной
  currenciesFiltered.value = newOptions;

  return resultIndexes;
}
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.currency-item {
  display: flex;
  gap: 20px;
}

.value-prev {
  display: flex;
}

.code {
  width: 30px;
}

.name {
  width: 180px;
  text-align: start;
}

.nominal {
  width: 25px;
}

.value {
  width: 65px;
}

.prev {
  width: 55px;
}

ul,
li {
  list-style: none;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
