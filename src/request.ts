import qs from 'qs';

import type {
  RequestOptions,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './interface';
import { isFunction } from './utils';

export class Request {
  baseUrl?: string;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;

  constructor(config: RequestConfig) {
    const { baseUrl, requestInterceptor, responseInterceptor } = config;
    this.baseUrl = baseUrl;
    this.requestInterceptor = requestInterceptor;
    this.responseInterceptor = responseInterceptor;
  }

  async request(endpoint: string, options: RequestOptions = {}) {
    const { data, ...restOptions } = options;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': data ? 'application/json' : '',
      },
      ...restOptions,
    };

    if (config.method.toUpperCase() === 'GET') {
      // eslint-disable-next-line no-param-reassign
      endpoint += `?${qs.stringify(data)}`;
    } else {
      try {
        config.body = JSON.stringify(data || {});
      } catch (error) {
        console.error(error);
      }
    }

    const _url = this.baseUrl ? `${this.baseUrl}/${endpoint}` : endpoint;

    return window.fetch(_url, config).then(async (response) => {
      if (isFunction(this.responseInterceptor)) {
        this.responseInterceptor(response);
      }

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
  }
}
