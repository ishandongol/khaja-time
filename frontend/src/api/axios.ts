import axios, { AxiosRequestConfig } from "axios";
import config from "../config";
const { baseURL } = config;
const instance = axios.create({
  baseURL,
});

export const asyncFunction = async <T>(config: AxiosRequestConfig) => {
  const response = await instance.request<T>(config);
  return response.data;
};

export default instance;
