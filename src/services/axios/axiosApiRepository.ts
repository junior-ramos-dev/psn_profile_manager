import _ from "lodash";
import qs from "qs";

import {
  axiosInstance,
  handleAxiosResponseData,
  interceptAxiosAuthRequests,
  setAxiosInterceptorRequest,
} from "./axiosApiConfig";

export interface IEndpointHeaders {
  endpointName: string;
  headers: object;
}

const AXIOS_BASE_URL = axiosInstance.defaults.baseURL;

/**
 * Build url with params
 *
 * @param endpointUrl
 * @param urlParams
 * @returns string
 */
const buildUrlWithParams = (endpointUrl: string, urlParams: object): string => {
  const keys = Object.keys(urlParams);

  keys.forEach((key) => {
    endpointUrl = _.replace(endpointUrl, `:${key}`, urlParams[key]);
  });

  console.log(endpointUrl);

  return endpointUrl;
};

export const getOne = async (
  endpointUrl: string,
  endpointHeaders: IEndpointHeaders,
  urlParams: object
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  if (urlParams) endpointUrl = buildUrlWithParams(endpointUrl, urlParams);

  return await axiosInstance
    .get(`${AXIOS_BASE_URL}/${endpointUrl}`)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const getList = async (
  endpointUrl: string,
  endpointHeaders: IEndpointHeaders,
  urlParams?: object
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  if (urlParams) endpointUrl = buildUrlWithParams(endpointUrl, urlParams);

  return await axiosInstance
    .get(`${AXIOS_BASE_URL}/${endpointUrl}`)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const post = async (
  endpointUrl: string,
  endpointName: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders,
  urlParams?: object
) => {
  console.log(endpointUrl, endpointHeaders, urlParams);
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  if (urlParams) endpointUrl = buildUrlWithParams(endpointUrl, urlParams);

  interceptAxiosAuthRequests(endpointName, endpointHeaders);

  return await axiosInstance
    .post(`${AXIOS_BASE_URL}/${endpointUrl}`, qs.stringify(bodyData))
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const updatePut = async (
  endpointUrl: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders,
  urlParams: object
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  if (urlParams) endpointUrl = buildUrlWithParams(endpointUrl, urlParams);

  return await axiosInstance
    .put(`${AXIOS_BASE_URL}/${endpointUrl}`, bodyData)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const updatePatch = async (
  endpointUrl: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders,
  urlParams: object
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  if (urlParams) endpointUrl = buildUrlWithParams(endpointUrl, urlParams);

  return await axiosInstance
    .patch(`${AXIOS_BASE_URL}/${endpointUrl}`, bodyData)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const deleteOne = async (
  endpointUrl: string,
  endpointHeaders: IEndpointHeaders,
  urlParams: object
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  if (urlParams) endpointUrl = buildUrlWithParams(endpointUrl, urlParams);

  return await axiosInstance
    .delete(`${AXIOS_BASE_URL}/${endpointUrl}`)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const isServerUp = async () => {
  let serverUp: boolean = false;

  const result = await axiosInstance.get(`${AXIOS_BASE_URL}/status`);

  if (result) serverUp = result.status == 200;

  console.log(`SERVER UP [AXIOS_BASE_URL: ${AXIOS_BASE_URL}]`);

  return serverUp;
};

export const logApiRequest = (
  collection: string,
  endpointName: string,
  endpointUrl: string
): void =>
  console.log(` > API: ${collection} [${endpointName}: ${endpointUrl}]`);
