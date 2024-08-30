import qs from "qs";

import {
  axiosInstance,
  handleAxiosResponseData,
  setAxiosInterceptorRequest,
} from "./axiosApiConfig";

export interface IEndpointHeaders {
  endpointName: string;
  headers: object;
}

const BASE_URL = axiosInstance.defaults.baseURL;

export const getOne = async (
  endpointUrl: string,
  urlParam: string,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  return await axiosInstance
    .get(`${BASE_URL}/${endpointUrl}/${urlParam}`)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const getList = async (
  endpointUrl: string,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  return await axiosInstance
    .get(`${BASE_URL}/${endpointUrl}/`)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const post = async (
  endpointUrl: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  return await axiosInstance
    .post(`${BASE_URL}/${endpointUrl}/`, qs.stringify(bodyData))
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const updatePut = async (
  endpointUrl: string,
  urlParam: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  return await axiosInstance
    .put(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const updatePatch = async (
  endpointUrl: string,
  urlParam: string,
  bodyData: object,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  return await axiosInstance
    .patch(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
};

export const deleteOne = async (
  endpointUrl: string,
  urlParam: string,
  endpointHeaders: IEndpointHeaders
) => {
  if (endpointHeaders) setAxiosInterceptorRequest(endpointHeaders);

  return await axiosInstance
    .delete(`${BASE_URL}/${endpointUrl}/${urlParam}`)
    .then((res) => handleAxiosResponseData(res, endpointHeaders));
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
