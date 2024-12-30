/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError, AxiosInstance } from "axios";
import { injectable } from "tsyringe";

@injectable()
export class HttpService {
  instance: AxiosInstance;

  // token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  //   ? JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) as string)
  //   : '';

  auth = useAuth0();
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    // axios interceptor for includeing bearer token in request
    this.instance.interceptors.request.use(async (config) => {
      const accessToken = await this.auth.getAccessTokenSilently();
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["X-Frame-Options"] = "DENY";
      return config;
    });

    // axios interceptor for logging out user
    this.instance.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        if (error?.response?.status === 401) {
          this.auth.logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, params?: object): Promise<any> {
    const response = await this.instance.get(url, { params });
    return response.data;
  }

  async post(url: string, body: object): Promise<any> {
    const response = await this.instance.post(url, body);
    return response.data;
  }

  async put(url: string, body: object): Promise<any> {
    const response = await this.instance.put(url, body);
    return response.data;
  }

  async delete(url: string, params?: object): Promise<any> {
    const response = await this.instance.delete(url, { params });
    return response.data;
  }

  async patch(url: string, body: object): Promise<any> {
    const response = await this.instance.patch(url, body);
    return response.data;
  }
}
