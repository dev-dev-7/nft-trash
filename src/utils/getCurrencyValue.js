import axios from "axios";

const getCurrencyValue = (currency) => {
  const query = `AED_${currency}`;
  return axios
    .get(
      `https://free.currconv.com/api/v7/convert?apiKey=dbe1135c56e94f2aadd68a57d7e08040&q=${query}`
    )
    .then((res) => {
      console.log(`currency convenrt request`, res?.data?.results[query]?.val);
      // return res?.results[query]?.val;
      return res?.data?.results[query]?.val ?? null;
    })
    .catch((error) => {
      console.error(`error in convert currency ${error}`);
      return null;
    });
};

export default getCurrencyValue;
