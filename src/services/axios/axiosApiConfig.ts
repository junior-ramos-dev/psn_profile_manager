import axios, {
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import _ from "lodash";

import { ERR_NETWORK, HEADERS } from "@/settings/app/constants";
import { AUTH_ENDPOINT_NAME } from "@/settings/app/constants/api/auth";
import {
  getHttpResponseMessage,
  removeEnpointHeaderKey,
  setEnpointHeader,
} from "@/utils/http";

import { AxiosApiError } from "./axiosApiError";
import { IEndpointHeaders } from "./axiosApiRepository";

export const BASE_URL = process.env.API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "cache-control": "no-cache",
  },
});

/**
 * Intercepts and handle the axios request
 *
 * @param axiosInstance
 * @param endpointHeaders
 */
export const setAxiosInterceptorRequest = (
  endpointHeaders: IEndpointHeaders
) => {
  const interceptorRequest = axiosInstance.interceptors.request;

  interceptorRequest.use(
    (req: InternalAxiosRequestConfig<object>) => {
      // Set headers for an endpoint
      return handleAxiosRequestHeaders(req, endpointHeaders);
    },
    (error) => {
      return Promise.reject(new Error(error));
    }
  );
};

/**
 * Intercepts and handle axios auth request
 *
 * @param axiosInstance
 * @param endpointHeaders
 */
export const interceptAxiosAuthRequests = (
  endpointName: string,
  endpointHeaders: IEndpointHeaders
) => {
  const interceptorRequest = axiosInstance.interceptors.request;

  interceptorRequest.use((req: InternalAxiosRequestConfig<object>) => {
    // Set headers for auth endpoint
    if (
      endpointName === AUTH_ENDPOINT_NAME.LOGIN ||
      endpointName === AUTH_ENDPOINT_NAME.REGISTER ||
      endpointName === AUTH_ENDPOINT_NAME.REGISTER_LOADER
    ) {
      req.headers["authorization"] = `Bearer ${process.env.PSN_NPSSO}`;
      console.log(req.url);
    } else if (endpointName === AUTH_ENDPOINT_NAME.LOGOUT) {
      console.log(req.url);
      if (endpointHeaders) clearEndpointResHeaders(endpointHeaders);
    }
    return req;
  });
};

/**
 * Set headers for an endpoint
 *
 * @param req
 * @param endpointHeaders
 * @returns
 */
export const handleAxiosRequestHeaders = (
  req: InternalAxiosRequestConfig<object>,
  endpointHeaders: IEndpointHeaders
) => {
  req.headers = endpointHeaders.headers as AxiosHeaders;

  return req;
};

/**
 * Intercepts and handle the axios response
 *
 * @param axiosInstance
 * @param endpointHeaders
 * @param navigate
 */
export const setAxiosInterceptorResponse = (navigate) => {
  const interceptorResponse = axiosInstance.interceptors.response;
  interceptorResponse.use(
    (response) => {
      return response;
    },
    (error) => {
      return handleAxiosResponseError(error, navigate);
    }
  );
};

/**
 * Handle the data from the api response
 *
 * @param response
 * @param endpointHeaders
 * @returns
 */
export const handleAxiosResponseData = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) {
    getResponseHeaders(response, endpointHeaders);
    clearEndpointResHeaders(endpointHeaders);
  }
  console.log(getHttpResponseMessage(response.status));
  return response.data;
};

/**
 * Handle the error from the api response
 *
 * @param axiosError
 * @param navigate
 * @returns
 */
export const handleAxiosResponseError = (axiosError, navigate) => {
  let status;
  let message;
  let data;

  if (axiosError.code === ERR_NETWORK) {
    const baseUrl = axiosError.config.baseURL;

    status = 500;
    message = `Server Unavailable [URL: ${baseUrl}]`;

    console.log(status, message);
  } else {
    console.log(axiosError);
    status = axiosError.response?.status;
    message =
      axiosError.message || getHttpResponseMessage(axiosError.response?.status);
    data = axiosError.response.data;
  }

  const axiosApiError = new AxiosApiError(status, message, data);

  if (status >= 400 && status <= 599) {
    navigate("/axioserror", {
      state: { axiosApiError: axiosApiError },
    });
  } else {
    console.log(axiosApiError);
  }
};

/**
 * Get the headers from the specific endpoint response and saves on localStorge
 *
 * @param response
 * @param endpointHeaders
 */
const getResponseHeaders = (
  response: AxiosResponse,
  endpointHeaders: IEndpointHeaders
) => {
  const headersKeys = Object.keys(endpointHeaders.headers);

  headersKeys.forEach((key) => {
    const headerKey = _.toLower(key);

    const headerValue = response.headers[headerKey];

    setEnpointHeader(endpointHeaders.endpointName, headerKey, headerValue);
  });
  if (
    endpointHeaders.endpointName === AUTH_ENDPOINT_NAME.LOGIN ||
    endpointHeaders.endpointName === AUTH_ENDPOINT_NAME.REGISTER
  ) {
    removeEnpointHeaderKey(endpointHeaders.endpointName, HEADERS.AUTHORIZATION);
  }
};

/**
 * Clear the response headers for an endpoint
 *
 * @param endpointHeaders
 */
const clearEndpointResHeaders = (endpointHeaders: IEndpointHeaders) => {
  endpointHeaders.endpointName = undefined;
  endpointHeaders.headers = undefined;
};
