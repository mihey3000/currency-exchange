<script lang="ts" setup>
import ExchangeBlock from "@/components/ExchangeBlock.vue";
import CurrencyTable from "@/components/CurrencyTable.vue";

import { onMounted, ref, Ref } from "vue";
import { currencyRequest } from "@/hooks/useRequest";
import { SelectOptions } from "@/types/general";
import { useStore } from "@/store/useStore";

const store = useStore();

const currencies: Ref<SelectOptions[]> = ref([]);
const switchVar = ref(true);

const getCurrencies = async () => {
  const result = await currencyRequest();

  currencies.value = Object.entries(result.Valute).map(
    (item) => item[1]
  ) as SelectOptions[];

  for (let i = 0; i < currencies.value.length; i++) {
    currencies.value[i].Previous =
      currencies.value[i].Value - currencies.value[i].Previous;
  }

  store.getData(result);
};

onMounted(async () => {
  await getCurrencies().catch(alert);
});
</script>

<template>
  <div :class="$style['main-container']">
    <div :class="$style.switcher">
      <h3
        :class="[$style['switcher-item'], { [$style.chosen]: switchVar }]"
        @click="switchVar = !switchVar"
      >
        Список валют
      </h3>
      <h3
        :class="[$style['switcher-item'], { [$style.chosen]: !switchVar }]"
        @click="switchVar = !switchVar"
      >
        Конвертер
      </h3>
    </div>
    <div v-if="switchVar">
      <CurrencyTable :options="currencies" />
    </div>
    <ExchangeBlock v-else :options="currencies" />
  </div>
</template>

<style module>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
}

.switcher {
  display: flex;
  gap: 10px;
}

.switcher-item {
  padding: 2px 9px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.switcher-item:hover {
  background-color: #fac77b42;
}

.chosen {
  background-color: #ff99005c;
}
</style>
