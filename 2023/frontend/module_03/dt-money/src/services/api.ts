import axios, { AxiosError, AxiosInstance } from 'axios';

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

const serverAxiosInstance = createAxiosInstance(
  (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.baseURL = 'http://localhost:3333';
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

export { serverAxiosInstance };
