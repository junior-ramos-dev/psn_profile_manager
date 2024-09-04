import { VERBS } from "@/settings/app/constants";
import { getHttpResponseMessage } from "@/utils/http";

import { AxiosApiError } from "./axiosApiError";
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
} from "./axiosApiRepository";

export const axiosApiRepository = async (
  collection: string,
  endpointName: string,
  endpointUrl: string,
  method: VERBS,
  headers?: object,
  urlParams?: object,
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
          return {
            data: await getOne(endpointUrl, endpointHeaders, urlParams),
          };

        //GET LIST
        case VERBS.LIST:
          return {
            data: await getList(endpointUrl, endpointHeaders, urlParams),
          };

        // POST (CREATE)
        case VERBS.POST:
          return {
            data: await post(
              endpointUrl,
              endpointName,
              bodyData,
              endpointHeaders
            ),
          };

        // UPDATE PUT
        case VERBS.PUT:
          return {
            data: await updatePut(
              endpointUrl,
              bodyData,
              endpointHeaders,
              urlParams
            ),
          };

        // UPDATE PATCH
        case VERBS.PATCH:
          return {
            data: await updatePatch(
              endpointUrl,
              bodyData,
              endpointHeaders,
              urlParams
            ),
          };

        // DELETE ONE
        case VERBS.DELETE:
          return { data: deleteOne(endpointUrl, endpointHeaders, urlParams) };
      }
    }
  } catch (axiosError) {
    console.log(axiosError);

    const status = axiosError.response?.status;
    const message =
      axiosError.message || getHttpResponseMessage(axiosError.response?.status);
    const data = axiosError.response?.data;

    throw new AxiosApiError(status, message, data);
  }
};
