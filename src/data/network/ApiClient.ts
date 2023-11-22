import axios, { AxiosResponse } from 'axios';
import * as AxiosLogger from 'axios-logger';
import { getToken } from '..';
import { ApiEndpoints } from './ApiConstants';

const instance = axios.create({
  baseURL: ApiEndpoints.BASE_API_URL,
  timeout: 60000,
});

instance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
instance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

interface Params {
  params?: any;
  headers?: any;
  endpoint: string;
}

export async function get<T>({ endpoint, params, headers }: Params): Promise<AxiosResponse<T>> {
  const token = await getToken();
  return instance
    .get(endpoint, {
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token ?? '', ...headers },
      params: { ...params },
    })
    .then(response => handleResponse(response));
}

export async function put<T>({ endpoint, params, headers, data }: Params & { data?: any }): Promise<AxiosResponse<T>> {
  const token = await getToken();
  return instance
    .put<T>(endpoint, data, {
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token ?? '', ...headers },
      params: { ...params },
    })
    .then(response => handleResponse(response));
}


export async function post<T>({ endpoint, params, headers, data }: Params & { data?: any }): Promise<AxiosResponse<T>> {
  const token = await getToken();
  return instance
    .post<T>(endpoint, data, {
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token ?? '', ...headers },
      params: { ...params },
    })
    .then(response => handleResponse(response));
}


async function handleResponse(response: AxiosResponse): Promise<any> {
  if (response.status === 200 && response.data) {
    return response.data;
  } else {
    return Promise.reject({
      message: response.data.message,
      status: response.data.status,
    });
  }
}
