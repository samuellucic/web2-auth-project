import { useEffect, useState } from 'react';
import api from '../api/api';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type FetchProps<T = Method> = {
  url: string;
} & (T extends 'GET'
  ? {
      method: 'GET';
      payload?: never;
    }
  : {
      method: 'POST' | 'PUT' | 'DELETE';
      payload?: any;
    });

const useFetch = <T>({ url, method, payload }: FetchProps) => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (method !== 'GET' && !payload) {
      return;
    }
    api
      .request<T>({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        data: payload,
      })
      .then((res) => res.data)
      .then((data) => setData(data));
  }, [url, method, payload]);

  return data;
};

export default useFetch;
