import { defineStore } from "pinia";
import { ICurrencyData, SelectOptions } from "@/types/general";

interface State {
  CurrencyData: ICurrencyData | null;
  СurrentCurrency: SelectOptions | null;
}

export const useStore = defineStore("store", {
  state: (): State => ({
    CurrencyData: null,
    СurrentCurrency: null,
  }),
  actions: {
    getData(NewData: ICurrencyData) {
      this.CurrencyData = NewData;
    },
    getСurrentCurrency(newCurrency: SelectOptions) {
      this.СurrentCurrency = newCurrency;
    },
  },
});
