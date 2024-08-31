import { ITrophyList } from "@/models/interfaces/trophy/ITrophy";
import { VERBS } from "@/settings/app/constants";
import { TROPHY_ENDPOINT_NAME } from "@/settings/app/constants/api";
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
        endpointUrl: `trophy/${trophyTitlePlatform}/${npCommunicationId}/list`,
        method: VERBS.LIST,
        // urlParam: userId,
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
    // getIconBinByTrophy: build.query<ITrophyIcon, string>({
    //   query: (npCommunicationId) => ({
    //     endpointUrl: "trophy/icon",
    //     method: VERBS.GET,
    //     urlParam: npCommunicationId,
    //     collection: "TrophiesIcons",
    //     endpointName: "getIconBinByGame",
    //   }),
    //   providesTags: ["Trophy"],
    // }),
    // getIconBinByTrophyIds: build.mutation<
    //   ITrophyIcon[],
    //   TrophyIconBinListRequest
    // >({
    //   query: ({ npCommIdList }) => ({
    //     endpointUrl: "trophy/icon/list",
    //     method: VERBS.POST,
    //     bodyData: { npCommIdList },
    //     collection: "TrophiesIcons",
    //     endpointName: "getIconBinByTrophyIds",
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetTrophyListQuery,
  // useGetIconBinByTrophyQuery,
  // useGetIconBinByTrophyIdsMutation,
} = trophyApi;
