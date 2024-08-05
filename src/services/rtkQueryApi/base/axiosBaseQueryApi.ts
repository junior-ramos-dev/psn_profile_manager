import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { getErrorMessage, VERBS } from "@/utils/restApi";

import { axiosInstance, isServerUp } from "../../axios/axiosInstance";

const BASE_URL = process.env.API_BASE_URL;

interface IAxiosBaseQueryArgs {
  collection: string;
  endpointUrl: string;
  method: VERBS;
  urlParam?: string;
  bodyData?: {};
  endpointName?: string;
}

interface ApiResponse<T> {
  data?: T;
  succeeded?: boolean;
  errors: any;
}

const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
  return new Promise((resolve, reject) => {
    const result: any = {
      data: response.data, //TODO Make generic response type: response.data as <T>
      succeeded: response.status === 200,
      errors: response.data.errors,
    };
    resolve(result);
  });
};

const axiosApiRepository = async (
  collection: string,
  endpointUrl: string,
  method: VERBS,
  urlParam?: string,
  bodyData?: {},
  endpointName?: string
) => {
  try {
    const serverUp = await isServerUp();

    let result = undefined;

    if (serverUp) {
      switch (method) {
        //Get One
        case VERBS.GET:
          endpointName ?? console.log(endpointName);
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
    if (err.status === 400) {
      toast.error("The email is already in use");
    } else if (err.status === 401) {
      toast.error("Please, authenticate first!");
    } else {
      toast.error("Somethings wrong! Please try again later!");
    }

    return {
      error: {
        status: getErrorMessage(err.response?.status),
        data: err.response?.data || err.message,
      },
    };
  }
};

export const axiosBaseQueryApi =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({
    collection,
    endpointUrl,
    method,
    urlParam,
    bodyData,
    endpointName,
  }: IAxiosBaseQueryArgs) =>
    axiosApiRepository(
      collection,
      endpointUrl,
      method,
      urlParam,
      bodyData,
      endpointName
    );
