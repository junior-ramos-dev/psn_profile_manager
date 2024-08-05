import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { getErrorMessage, VERBS } from "@/utils/restApi";

import { axiosInstance, isServerUp } from "../../axios/axiosInstance";

const BASE_URL = process.env.API_BASE_URL;

interface IAxiosBaseQueryArgs {
  collection: string;
  endpointName: string;
  endpointUrl: string;
  method: VERBS;
  urlParam?: string;
  bodyData?: object;
}

type Response = ReturnType<typeof axiosApiRepository>;

type ApiResponseData = Omit<Response, "succeeded" | "errors">;

interface ApiResponse {
  data?: ApiResponseData;
  // succeeded?: boolean;
  // errors: AxiosError;
}

const transform = (response: AxiosResponse): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    const result: ApiResponse = {
      data: response.data,
      // succeeded: response.status === 200,
      // errors: response.data.errors,
    };
    resolve(result);
  });
};

const usedAPI = (
  collection: string,
  endpointName: string,
  endpointUrl: string
): void =>
  console.log(` > API: ${collection} [${endpointName}: ${endpointUrl}]`);

const axiosApiRepository = async (
  collection: string,
  endpointName: string,
  endpointUrl: string,
  method: VERBS,
  urlParam?: string,
  bodyData?: object
) => {
  try {
    const serverUp = await isServerUp();

    let result = undefined;

    if (serverUp) {
      usedAPI(collection, endpointName, endpointUrl);
      switch (method) {
        //Get One
        case VERBS.GET:
          result = await axiosInstance
            .get(`${BASE_URL}/${endpointUrl}/${urlParam}`)
            .then(transform);
          return { data: result };
        //Get List
        case VERBS.LIST:
          endpointName ?? console.log(endpointName);
          result = await axiosInstance
            .get(`${BASE_URL}/${endpointUrl}/`)
            .then(transform);
          return { data: result };
        // Post
        case VERBS.POST:
          endpointName ?? console.log(endpointName);
          result = await axiosInstance
            .post(`${BASE_URL}/${endpointUrl}/`, bodyData)
            .then(transform);
          return { data: result };
        // Put
        case VERBS.PUT:
          endpointName ?? console.log(endpointName);
          result = await axiosInstance
            .put(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
            .then(transform);
          return { data: result };
        // Patch
        case VERBS.PATCH:
          endpointName ?? console.log(endpointName);
          result = await axiosInstance
            .patch(`${BASE_URL}/${endpointUrl}/${urlParam}`, bodyData)
            .then(transform);
          return { data: result };
        // Delete
        case VERBS.DELETE:
          endpointName ?? console.log(endpointName);
          result = await axiosInstance
            .delete(`${BASE_URL}/${endpointUrl}/${urlParam}`)
            .then(transform);
          return { data: result };
      }
    }
  } catch (axiosError) {
    const err = axiosError;

    return {
      error: {
        status: getErrorMessage(err.response?.status),
        data: err.response?.data || err.message,
      },
    };
  }
};

export const axiosBaseQueryApi =
  () =>
  async ({
    collection,
    endpointName,
    endpointUrl,
    method,
    urlParam,
    bodyData,
  }: IAxiosBaseQueryArgs) =>
    axiosApiRepository(
      collection,
      endpointName,
      endpointUrl,
      method,
      urlParam,
      bodyData
    );
