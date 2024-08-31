import { IUserProfile } from "@/models/interfaces/user/IUserProfile";
import { VERBS } from "@/settings/app/constants";

import { rtkQueryBaseApi } from "../rtkQueryBaseApi";

export const userApi = rtkQueryBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<IUserProfile, string>({
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
