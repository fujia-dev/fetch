export interface FetchResponse extends ResponseInit {
  request?: any;
}

export interface RequestOptions extends RequestInit {
  data?: any;
  [key: string]: any;
}

export interface RequestInterceptor<T = RequestOptions> {
  (config: T): T;
}

export interface ResponseInterceptor<T = FetchResponse> {
  (config: T): T;
}

export interface RequestConfig {
  baseUrl?: string;
  requestInterceptor?: RequestInterceptor;
  responseInterceptor?: ResponseInterceptor;
}
