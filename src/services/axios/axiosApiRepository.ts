import { AxiosError, AxiosHeaders } from "axios";

import { getHttpResponseMessage, VERBS } from "@/utils/http";

import {
  deleteOne,
  getList,
  getOne,
  IEndpointHeaders,
  isServerUp,
  logApiRequest,
  post,
  updatePatch,
  updatePut,
} from "./axiosApiConfig";

export interface IAxiosApiError {
  status: number;
  data: AxiosError<Response>;
  message: string;
}

export const axiosApiRepository = async (
  collection: string,
  endpointName: string,
  endpointUrl: string,
  method: VERBS,
  headers?: AxiosHeaders,
  urlParam?: string,
  bodyData?: object
) => {
  try {
    const serverUp = await isServerUp();

    if (serverUp) {
      logApiRequest(collection, endpointName, endpointUrl);

      let endpointHeaders: IEndpointHeaders;

      if (headers && endpointName) {
        endpointHeaders = {
          endpointName,
          headers,
        };
      }

      // Use the corresponding method defined for the endpoint
      switch (method) {
        //GET ONE
        case VERBS.GET:
          return { data: await getOne(endpointUrl, urlParam, endpointHeaders) };

        //GET LIST
        case VERBS.LIST:
          return { data: await getList(endpointUrl, endpointHeaders) };

        // POST (CREATE)
        case VERBS.POST:
          return { data: await post(endpointUrl, bodyData, endpointHeaders) };

        // UPDATE PUT
        case VERBS.PUT:
          return {
            data: await updatePut(
              endpointUrl,
              urlParam,
              bodyData,
              endpointHeaders
            ),
          };

        // UPDATE PATCH
        case VERBS.PATCH:
          return {
            data: await updatePatch(
              endpointUrl,
              urlParam,
              bodyData,
              endpointHeaders
            ),
          };

        // DELETE ONE
        case VERBS.DELETE:
          return { data: deleteOne(endpointUrl, urlParam, endpointHeaders) };
      }
    }
  } catch (axiosError) {
    const error: IAxiosApiError = {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message:
        axiosError.message ||
        getHttpResponseMessage(axiosError.response?.status),
    };

    return {
      error,
    };
  }
};
