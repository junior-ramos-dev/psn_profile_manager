import { ITrophyList } from "@/models/interfaces/trophy/ITrophy";
import { store } from "@/store";
import { VERBS } from "@/utils/http";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

import { actionSetTrophiesList } from "./trophySlice";

interface GetTrophyListRequest {
  userId: string;
  trophyTitlePlatform: string;
  npCommunicationId: string;
}

export const trophyApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTrophyList: build.query<ITrophyList, GetTrophyListRequest>({
      query: ({ userId, trophyTitlePlatform, npCommunicationId }) => ({
        endpointUrl: `trophy/${userId}/${trophyTitlePlatform}/${npCommunicationId}/list`,
        method: VERBS.LIST,
        // urlParam: userId,
        collection: "GameTrophies",
        endpointName: "getTrophyList",
        headers: {
          ETag: localStorage.getItem("getTrophyList:etag") ?? "",
          "if-none-match": localStorage.getItem("getTrophyList:etag") ?? "",
        },
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
