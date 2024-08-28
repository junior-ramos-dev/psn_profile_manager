import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import _ from "lodash";

import { getHttpResponseMessage, setEnpointHeader } from "@/utils/http";

import { AUTH_ENDPOINT_NAME } from "../rtkQueryApi/auth";

import { IEndpointHeaders } from "./axiosApiConfig";

// Transform the data from the api response
export const transformResponse = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) {
    getResponseHeaders(response, endpointHeaders);
    clearEndpointHeaders(endpointHeaders);
  }
  console.log(getHttpResponseMessage(response.status));
  return response.data;
};

// Get the headers from the specific endpoint response and saves on localStorge
const getResponseHeaders = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  if (
    endpointHeaders.endpointName !== AUTH_ENDPOINT_NAME.LOGIN &&
    endpointHeaders.endpointName !== AUTH_ENDPOINT_NAME.REGISTER
  ) {
    const headersKeys = Object.keys(endpointHeaders.headers);

    headersKeys.forEach((key) => {
      const headerKey = _.toLower(key);

      const headerValue = response.headers[headerKey];

      setEnpointHeader(endpointHeaders.endpointName, headerKey, headerValue);
    });
  }
};

// Clear the headers for an endpoint
const clearEndpointHeaders = (endpointHeaders: IEndpointHeaders) => {
  endpointHeaders.endpointName = undefined;
  endpointHeaders.headers = undefined;
};

// Set the headers for the specific endpoint
export const setRequestHeaders = (
  axiosInstance: AxiosInstance,
  endpointHeaders: IEndpointHeaders
) => {
  const interceptorRequest = axiosInstance.interceptors.request;

  interceptorRequest.use(
    (req: InternalAxiosRequestConfig<object>) => {
      if (
        req.url.includes(
          AUTH_ENDPOINT_NAME.LOGIN || AUTH_ENDPOINT_NAME.REGISTER
        )
      ) {
        req.headers["authorization"] = `Bearer ${process.env.PSN_NPSSO}`;
        console.log(req.url);
        console.log(req.headers["authorization"]);
      } else {
        req.headers = endpointHeaders.headers;
      }

      return req;
    },
    (error) => {
      return Promise.reject(new Error(error));
    }
  );
};
