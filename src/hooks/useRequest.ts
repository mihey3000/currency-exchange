import { ICurrencyData } from "../types/general";

import axios from "axios";

const currencyRequest = async (): Promise<ICurrencyData> => {
  let result;
  try {
    const response = await axios.get(
      "https://www.cbr-xml-daily.ru/daily_json.js"
    );
    result = response.data;
  } catch (err) {
    console.log(err);
  }

  return result;
};

export { currencyRequest };
