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
  if (
    req.url.includes(AUTH_ENDPOINT_NAME.LOGIN || AUTH_ENDPOINT_NAME.REGISTER)
  ) {
    req.headers["authorization"] = `Bearer ${process.env.PSN_NPSSO}`;
    console.log(req.url);
  } else if (req.url.includes(AUTH_ENDPOINT_NAME.LOGOUT)) {
    clearEndpointResHeaders(endpointHeaders);
  } else {
    req.headers = endpointHeaders.headers as AxiosHeaders;
    //TODO remove
    console.log(req.url);
    console.log(req.headers);
  }

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
  } else if (status === 304) {
    // Use toast
    console.log(axiosApiError);
  } else {
    return Promise.reject(axiosApiError);
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
