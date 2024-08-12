import { UserProfile } from "@/models/types/rtkQuery/user";
import { VERBS } from "@/utils/http";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const userApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<UserProfile, string>({
      query: (id) => ({
        endpointUrl: "user",
        method: VERBS.GET,
        urlParam: id,
        collection: "User",
        endpointName: "getUser",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserProfileQuery } = userApi;
