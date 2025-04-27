import axios, { AxiosRequestConfig } from "axios";

// Create base instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// GET request
export async function get<T = any>(url: string, config?: AxiosRequestConfig) {
  const response = await API.get<T>(url, config);
  return response.data;
}

// POST request
export async function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  const response = await API.post<T>(url, data, config);
  return response.data;
}

// PUT request
export async function put<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  const response = await API.put<T>(url, data, config);
  return response.data;
}

// DELETE request
export async function del<T = any>(url: string, config?: AxiosRequestConfig) {
  const response = await API.delete<T>(url, config);
  return response.data;
}
