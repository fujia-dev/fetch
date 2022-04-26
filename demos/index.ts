import { Request } from '../src';

type User = {
  id: string;
  name: string;
  avatar?: string;
};

interface UserData {
  success: boolean;
  data?: User;
}

const request = new Request({
  baseUrl: 'http://localhost:3001',
}).instance;

export const asyncFetchUserInfo = async () => {
  const res = await request<UserData>('/user');

  if (res.success) {
    console.log(res.data);
  }
};
