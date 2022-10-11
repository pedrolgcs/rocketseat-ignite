import axios, { AxiosError, AxiosInstance } from 'axios';
import { APP_API_URL } from '@/constants/environments';

const createAxiosInstance = (
  callback: (axiosInstance: AxiosInstance) => AxiosInstance
) => {
  /**
   * Create axios instance
   */
  const api = axios.create({
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  });

  /**
   * execute the custom config
   */
  return callback(api);
};

const api = createAxiosInstance(
  (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.baseURL = `${APP_API_URL}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }
);

export { api };
