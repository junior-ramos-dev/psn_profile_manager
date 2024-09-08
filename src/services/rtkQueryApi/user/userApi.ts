import IUserProfile from "@/models/interfaces/user/IUserProfile";
import { VERBS } from "@/settings/app/constants";
import {
  USER_ENDPOINT_NAME,
  USER_URL_MAP,
} from "@/settings/app/constants/api/user";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const userApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<IUserProfile, string>({
      query: (id) => ({
        endpointUrl: USER_URL_MAP[USER_ENDPOINT_NAME.GET_USER_PROFILE],
        method: VERBS.GET,
        urlParams: { id },
        collection: "User",
        endpointName: USER_ENDPOINT_NAME.GET_USER_PROFILE,
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserProfileQuery } = userApi;
