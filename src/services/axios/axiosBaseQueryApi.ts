import { VERBS } from "@/settings/app/constants";

import { axiosApiRepository } from "./axiosApiRequestHandler";

export interface IAxiosBaseQueryArgs {
  collection: string;
  endpointName: string;
  endpointUrl: string;
  method: VERBS;
  headers?: object;
  urlParams?: object;
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
    urlParams,
    bodyData,
  }: IAxiosBaseQueryArgs) =>
    axiosApiRepository(
      collection,
      endpointName,
      endpointUrl,
      method,
      headers,
      urlParams,
      bodyData
    );
