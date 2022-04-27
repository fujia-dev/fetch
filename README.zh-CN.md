<div align="center">
  <h1>@fujia/fetch</h1>
</div>

<div align="center">

一个基于 fetch 的简单 http 请求库。

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

## 安装

使用 npm:

```sh
npm install @fujia/fetch
```

使用 yarn:

```sh
yarn add @fujia/fetch
```

使用 unpkg CDN:

```html
<script src="https://unpkg.com/@fujia/fetch/lib/request.min.js" />
```

## 使用

一个简单示例:

```ts
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

## 参考资料

1. [window.fetch/mdn](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
