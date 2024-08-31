import { UserProfile } from "@/models/types/rtkQuery/user";
import { VERBS } from "@/settings/app/constants";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const userApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<UserProfile, string>({
      query: (id) => ({
        endpointUrl: "user",
        method: VERBS.GET,
        urlParams: { id },
        collection: "User",
        endpointName: "getUserProfile",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserProfileQuery } = userApi;
