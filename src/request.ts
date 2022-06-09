import qs from 'qs';

import type {
  RequestOptions,
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './interface';

const isFunction = (val: unknown): val is CallableFunction => typeof val === 'function';

export class Request {
  baseUrl?: string;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;

  constructor(config: RequestConfig) {
    const { baseUrl, requestInterceptor, responseInterceptor } = config || {};
    this.baseUrl = baseUrl;
    this.requestInterceptor = requestInterceptor;
    this.responseInterceptor = responseInterceptor;
  }

  static create(config: RequestConfig) {
    const instance = new Request(config);

    return instance.request;
  }

  request = <D>(endpoint: string, options: RequestOptions = {}): Promise<D> => {
    const { data, ...restOptions } = options;
    let config: Partial<RequestOptions> = {
      method: 'GET',
      headers: {
        'Content-Type': data ? 'application/json' : '',
      },
      ...restOptions,
    };

    if (config?.method?.toUpperCase() === 'GET' || config?.method?.toUpperCase() === 'PATCH') {
      // eslint-disable-next-line no-param-reassign
      endpoint += `?${qs.stringify(data)}`;
    } else {
      try {
        config.body = JSON.stringify(data || {});
      } catch (error) {
        console.error(error);
      }
    }

    if (isFunction(this.requestInterceptor)) {
      config = this.requestInterceptor(config);
    }

    const _url = this.baseUrl ? `${this.baseUrl}/${endpoint.replace(/\//, '')}` : endpoint;

    return window.fetch(_url, config).then(async (response) => {
      if (isFunction(this.responseInterceptor)) {
        this.responseInterceptor(response);
      }

      const data = await response.json();

      if (response.ok) {
        return data as D;
      } else {
        return Promise.reject(data);
      }
    });
  };
}
