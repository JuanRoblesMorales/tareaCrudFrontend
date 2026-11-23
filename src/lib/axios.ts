import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true, // envía y recibe cookies
});