import { AxiosInstance, AxiosResponse } from "axios";
import _ from "lodash";

import { getEnpointHeaderKey } from "@/utils/http";

export interface IEndpointHeaders {
  endpointName: string;
  headers: object;
}

// Transform the data from the api response
export const transformResponse = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) {
    getRespondeHeaders(response, endpointHeaders);
  }

  return response.data;
};

// Get the headers from the specific endpoint response and saves on localStorge
export const getRespondeHeaders = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  const headersKeys = Object.keys(endpointHeaders.headers);

  headersKeys.forEach((key) => {
    const headerKey = _.toLower(key);

    const enpointHeaderKey = getEnpointHeaderKey(
      endpointHeaders.endpointName,
      headerKey
    );
    const headerValue = response.headers[headerKey];

    localStorage.setItem(enpointHeaderKey, headerValue);
  });
};

// Set the headers for the specific endpoint
export const setRequestHeaders = (
  axiosInstance: AxiosInstance,
  headers: object
) => {
  const interceptorRequest = axiosInstance.interceptors.request;

  interceptorRequest.use((req: any) => {
    req.headers = headers;
    return req;
  });
};
