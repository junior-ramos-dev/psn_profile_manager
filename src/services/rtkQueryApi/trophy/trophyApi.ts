import {
  ITrophyList,
  ITrophyTypeStats,
} from "@/models/interfaces/trophy/ITrophy";
import {
  GetEarnedTrophiesStatsRequest,
  SetTrophyCheckedRequest,
} from "@/models/types/rtkQuery/trophy";
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
        collection: "UserGameTrophies",
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
    setTrophyIsChecked: build.mutation<void, SetTrophyCheckedRequest>({
      query: (data) => ({
        endpointUrl: TROPHY_URL_MAP[TROPHY_ENDPOINT_NAME.SET_TROPHY_IS_CHECKED],
        method: VERBS.PATCH,
        urlParams: data.urlParams,
        bodyData: data.body,
        collection: "UserGameTrophies",
        endpointName: TROPHY_ENDPOINT_NAME.SET_TROPHY_IS_CHECKED,
      }),
      invalidatesTags: ["Trophy"],
    }),
    getEarnedTrophiesStats: build.mutation<
      ITrophyTypeStats[],
      GetEarnedTrophiesStatsRequest
    >({
      query: (data) => ({
        endpointUrl:
          TROPHY_URL_MAP[TROPHY_ENDPOINT_NAME.GET_EARNED_TROPHIES_STATS],
        method: VERBS.POST,
        bodyData: data,
        collection: "UserGameTrophies",
        endpointName: TROPHY_ENDPOINT_NAME.GET_EARNED_TROPHIES_STATS,
      }),
      invalidatesTags: ["Trophy"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTrophyListQuery,
  useSetTrophyIsCheckedMutation,
  useGetEarnedTrophiesStatsMutation,
} = trophyApi;
