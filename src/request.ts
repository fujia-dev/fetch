import qs from 'qs';

import type {
  RequestOptions,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './interface';

const isFunction = (val: unknown): val is CallableFunction => typeof val === 'function';

export class Request {
  baseUrl?: `/${string}`;
  timeout?: number;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;

  constructor(config: RequestConfig) {
    const { baseUrl, timeout, requestInterceptor, responseInterceptor } = config || {};
    this.baseUrl = baseUrl;
    this.timeout = timeout || 20000;
    this.requestInterceptor = requestInterceptor;
    this.responseInterceptor = responseInterceptor;
  }

  static create(config: RequestConfig) {
    const instance = new Request(config);

    return instance.request;
  }

  async request<D>(endpoint: `/${string}`, options: RequestOptions = {}) {
    const { data, ...restOptions } = options;
    const _url = this.baseUrl ? `${this.baseUrl}/${endpoint.replace(/\//, '')}` : endpoint;

    let config: Partial<RequestOptions> = {
      method: 'GET',
      headers: {
        'Content-Type': data ? 'application/json' : '',
      },
      ...restOptions,
    };

    try {
      if (config?.method?.toUpperCase() === 'GET' || config?.method?.toUpperCase() === 'PATCH') {
        // eslint-disable-next-line no-param-reassign
        endpoint += `?${qs.stringify(data)}`;
      } else {
        config.body = JSON.stringify(data || {});
      }

      if (isFunction(this.requestInterceptor)) {
        config = this.requestInterceptor(config);
      }

      const response = await fetch(_url, config);

      if (isFunction(this.responseInterceptor)) {
        this.responseInterceptor(response);
      }

      const result = await response.json();

      if (response.ok) {
        return result as D;
      }

      throw new Error(result);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
