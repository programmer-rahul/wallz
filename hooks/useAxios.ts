import axios from 'axios';
import {useState} from 'react';
import {Platform} from 'react-native';
import {TApiCall} from '../types/api';

const baseUrl = 'https://wallz-backend.onrender.com';

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
    if (!baseUrl) {
      setError('No Base Url is set');
      setResponse(null);
      return null;
    }

    setIsLoading(true);

    try {
      const fullUrl = `${baseUrl}${url}`;
      // console.log('API Request URL:', fullUrl, 'Params:', params);

      let responseData;

      if (Platform.OS === 'ios') {
        // Use fetch() on iOS
        const query = new URLSearchParams(params).toString();
        const fetchUrl = query ? `${fullUrl}?${query}` : fullUrl;

        const fetchOptions: RequestInit = {
          method: method.toUpperCase(),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        if (method.toLowerCase() !== 'get') {
          fetchOptions.body = JSON.stringify(data);
        }

        const res = await fetch(fetchUrl, fetchOptions);
        responseData = await res.json();
      } else {
        // Use Axios for Android/dev
        const {data: axiosData} = await AxiosInstance({
          method,
          url,
          data,
          params,
        });
        responseData = axiosData;
      }

      setResponse(responseData);
      return responseData;
    } catch (error: any) {
      console.log('API Call Error:', error);
      setResponse(null);
      setError(error?.message || 'Unknown Error');
    } finally {
      setIsLoading(false);
    }
  };

  return {response, error, isLoading, apiCall};
};

export default useAxios;
