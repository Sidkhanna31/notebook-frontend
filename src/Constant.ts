import axios from "axios";

export const AxiosProvider = axios.create({
  baseURL: "http://localhost:3000",
})