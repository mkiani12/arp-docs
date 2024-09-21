import axios from "axios";

const nuxtApp = useNuxtApp();

export const useApi = () => {
  const instance = axios.create({
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
  });

  return instance;
};
