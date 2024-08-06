import { axiosApiRepository } from "@/services/axios/axiosApiRepository";
import { VERBS } from "@/utils/http";

interface IAxiosBaseQueryArgs {
  collection: string;
  endpointName: string;
  endpointUrl: string;
  method: VERBS;
  headers?: object;
  urlParam?: string;
  bodyData?: object;
}

export const axiosBaseQueryApi =
  () =>
  async ({
    collection,
    endpointName,
    endpointUrl,
    method,
    headers,
    urlParam,
    bodyData,
  }: IAxiosBaseQueryArgs) =>
    axiosApiRepository(
      collection,
      endpointName,
      endpointUrl,
      method,
      headers,
      urlParam,
      bodyData
    );
