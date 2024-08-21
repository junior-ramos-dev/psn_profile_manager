import axios, { AxiosHeaders } from "axios";
import qs from "qs";

import { setRequestHeaders, transformResponse } from "./axiosInterceptors";

export interface IEndpointHeaders {
  endpointName: string;
  headers: AxiosHeaders;
}

const BASE_URL = process.env.API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "cache-control": "no-cache",
  },
});

export const getOne = async (
  endpointUrl: string,
  urlParam: string,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setRequestHeaders(axiosInstance, endpointHeaders);

  return await axiosInstance
    .get(`${BASE_URL}/${endpointUrl}/${urlParam}`)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const getList = async (
  endpointUrl: string,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setRequestHeaders(axiosInstance, endpointHeaders);

  return await axiosInstance
    .get(`${BASE_URL}/${endpointUrl}/`)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const post = async (
  endpointUrl: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setRequestHeaders(axiosInstance, endpointHeaders);

  return await axiosInstance
    .post(`${BASE_URL}/${endpointUrl}/`, qs.stringify(bodyData))
    .then((res) => transformResponse(res, endpointHeaders));
};

export const updatePut = async (
  endpointUrl: string,
  urlParam: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setRequestHeaders(axiosInstance, endpointHeaders);

  return await axiosInstance
    .put(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const updatePatch = async (
  endpointUrl: string,
  urlParam: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setRequestHeaders(axiosInstance, endpointHeaders);

  return await axiosInstance
    .patch(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const deleteOne = async (
  endpointUrl: string,
  urlParam: string,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setRequestHeaders(axiosInstance, endpointHeaders);

  return await axiosInstance
    .delete(`${BASE_URL}/${endpointUrl}/${urlParam}`)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const isServerUp = async () => {
  let serverUp: boolean = false;

  try {
    const result = await axiosInstance.get(`${BASE_URL}/status`);

    serverUp = result.status == 200;

    console.log(`SERVER UP [BASE_URL: ${BASE_URL}]`);

    return serverUp;
  } catch (err) {
    console.log(
      `${err.message.toUpperCase()}: SERVER DOWN [BASE_URL: ${BASE_URL}]`
    );
    return serverUp;
  }
};

export const logApiRequest = (
  collection: string,
  endpointName: string,
  endpointUrl: string
): void =>
  console.log(` > API: ${collection} [${endpointName}: ${endpointUrl}]`);
