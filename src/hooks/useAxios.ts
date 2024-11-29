import axios from 'axios';
import {useState} from 'react';
import {TApiCall} from '../types/api';

// const baseUrl = 'https://wallz-redis-backend.onrender.com/' || '';
const baseUrl = 'https://wallz-redis-backend.glitch.me/' || '';
// const baseUrl = 'http://localhost:4000/' || '';

const AxiosInstance = axios.create({
  baseURL: baseUrl,
});

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [response, setResponse] = useState<null | {}>(null);

  const apiCall = async ({
    method = 'get',
    url,
    data = {},
    params = {},
  }: TApiCall) => {
    // check if base url is available
    if (!baseUrl) {
      setError('No Base Url is set');
      setResponse(null);
      return null;
    }

    setIsLoading(true);

    try {
      // here i want to see the full url which going to for api call
      const {data: responseData} = await AxiosInstance({
        method,
        url,
        data,
        params,
      });
      setResponse(responseData);
      return responseData;
    } catch (error: any) {
      setResponse(null);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {response, error, isLoading, apiCall};
};

export default useAxios;
