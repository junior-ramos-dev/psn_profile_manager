import axios from "axios";

import { IEndpointHeaders, transformResponse } from "./axiosInterceptors";

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
  return await axiosInstance
    .get(`${BASE_URL}/${endpointUrl}/${urlParam}`)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const getList = async (
  endpointUrl: string,
  endpointHeaders: IEndpointHeaders
) => {
  return await axiosInstance
    .get(`${BASE_URL}/${endpointUrl}/`)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const post = async (
  endpointUrl: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  return await axiosInstance
    .post(`${BASE_URL}/${endpointUrl}/`, bodyData)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const updatePut = async (
  endpointUrl: string,
  urlParam: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
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
  return await axiosInstance
    .patch(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const deleteOne = async (
  endpointUrl: string,
  urlParam: string,
  endpointHeaders: IEndpointHeaders
) => {
  return await axiosInstance
    .delete(`${BASE_URL}/${endpointUrl}/${urlParam}`)
    .then((res) => transformResponse(res, endpointHeaders));
};

export const isServerUp = async () => {
  let serverUp: boolean = false;

  try {
    const result = await axiosInstance({
      url: BASE_URL + "/status",
      method: "GET",
    });

    if (result.status == 200) serverUp = true;

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
