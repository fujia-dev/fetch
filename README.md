<div align="center">
  <h1>@fujia/fetch</h1>
</div>

<div align="center">

A simple http request library build on fetch.

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>

## Installing

Using npm:

```sh
npm install @fujia/fetch
```

Using yarn:

```sh
yarn add @fujia/fetch
```

Using unpkg CDN:

```html
<script src="https://unpkg.com/@fujia/fetch/lib/request.min.js" />
```

## Usage

A simple example as follows:

```js
import { Request } from '@fujia/fetch';

type User = {
  id: string;
  name: string;
  avatar?: string;
};

interface UserData {
  success: boolean;
  data?: User;
}

const request = Request.create({
  baseUrl: 'http://localhost:3001',
  requestInterceptor: (config) => {
    config.headers['authorization'] = `Bearer token`;

    return config;
  },
});

export const asyncFetchUserInfo = async () => {
  const res = await request<UserData>('/user'});

  if (res.success) {
    console.log(res.data);
  }
};
```

## References

1. [window.fetch/mdn](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
