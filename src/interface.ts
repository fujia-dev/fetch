export interface FetchResponse extends ResponseInit {
  request?: any;
}

export interface RequestOptions extends Omit<RequestInit, 'headers'> {
  data?: any;
  headers?: Record<string, string>;
  [key: string]: any;
}

export interface RequestInterceptor<T = RequestOptions> {
  (config: T): T;
}

export interface ResponseInterceptor<T = FetchResponse> {
  (config: T): T;
}

export interface RequestConfig {
  baseUrl?: `/${string}`;
  timeout?: number;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;
}
