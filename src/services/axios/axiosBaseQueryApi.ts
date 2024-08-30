import { VERBS } from "@/settings/app/constants";

import { axiosApiRepository } from "./axiosApiRequestHandler";

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
