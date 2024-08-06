import { AxiosInstance, AxiosResponse } from "axios";
import _ from "lodash";

import { getEnpointHeaderKey, getHttpResponseMessage } from "@/utils/http";

export interface IEndpointHeaders {
  endpointName: string;
  headers: object;
}

// Transform the data from the api response
//TODO Fix: send response errors
export const transformResponse = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) {
    getRespondeHeaders(response, endpointHeaders);
  }
  console.log(getHttpResponseMessage(response.status));
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
