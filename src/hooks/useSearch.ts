import { Ref } from "vue";
import { SelectOptions } from "@/types/general";

const mySearch = (currencyArray: SelectOptions[], inputData: string) => {
  // получаем массив булевых значений, true если строка содержит введенную подстроку, false если нет
  let searchResult = currencyArray.map((item) =>
    item.Name.toLocaleLowerCase().includes(inputData.toLocaleLowerCase())
  );

  // получаем массив индексов значений true
  const resultIndexes: number[] = searchResult
    .map((item, index) => (item ? index : null))
    .filter((item) => item !== null) as number[];

  // добавляем элементы с соответствующими индексами в пустой массив
  let newOptions: SelectOptions[] = [];
  resultIndexes.forEach((item) => newOptions.push(currencyArray[item]));

  // присваиваем получившийся массив переменной
  // currenciesFiltered.value = newOptions;

  return resultIndexes;
};

export default mySearch;
