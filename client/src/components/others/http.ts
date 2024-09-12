import { Http } from 'open-http';
import { useEffect } from 'react';

const errorHandlers: ((result: any) => void)[] = [];

export const useErrorHandler = (handler: (result: any) => void) => {
      useEffect(() => {
            errorHandlers.push(handler);

            return () => {
                  errorHandlers.splice(errorHandlers.indexOf(handler), 1);
            };
      }, [handler]);
};

export const http = new Http<any, any, any>({
      axiosConfig: {
            baseURL: 'http://localhost:3001',
      },
      responseHandler: (response) => {
            const data = (
                  typeof (response.data as any) === 'string' && response.data
                        ? JSON.parse(response.data as any)
                        : response.data
            ) as any;

            if (!(response.status >= 200 && response.status <= 299)) {
                  errorHandlers.forEach((x) => x(data));
                  throw data;
            }

            return Promise.resolve(data);
      },
      successHandler: (data) => {
            return data;
      },
      errorHandler: (error, input) => {
            return error;
      },
});
