import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}products`, { method: "GET" })
    .then((respose) => {
      return respose.json();
    })
    .catch((err) => console.log(err));
};
