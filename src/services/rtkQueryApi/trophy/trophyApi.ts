import { ITrophyList } from "@/models/interfaces/trophy/ITrophy";
import { VERBS } from "@/settings/app/constants";
import {
  TROPHY_ENDPOINT_NAME,
  TROPHY_URL_MAP,
} from "@/settings/app/constants/api/trophy";
import { store } from "@/store";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetTrophiesList } from "./trophySlice";

interface GetTrophyListRequest {
  trophyTitlePlatform: string;
  npCommunicationId: string;
}

export const trophyApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTrophyList: build.query<ITrophyList, GetTrophyListRequest>({
      query: ({ trophyTitlePlatform, npCommunicationId }) => ({
        endpointUrl: TROPHY_URL_MAP[TROPHY_ENDPOINT_NAME.GET_TROPHY_LIST],
        method: VERBS.LIST,
        urlParams: { trophyTitlePlatform, npCommunicationId },
        collection: "GameTrophies",
        endpointName: TROPHY_ENDPOINT_NAME.GET_TROPHY_LIST,
      }),
      transformResponse: (response) => {
        // Convert response to ITrophy list
        // const trophysList =  ConvertITrophy.fromApiResponseToITrophyList(response);
        const trophysList = response;
        store.dispatch(actionSetTrophiesList(trophysList));

        return trophysList;
      },
      providesTags: ["Trophy"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTrophyListQuery,
  // useGetIconBinByTrophyQuery,
  // useGetIconBinByTrophyIdsMutation,
} = trophyApi;
