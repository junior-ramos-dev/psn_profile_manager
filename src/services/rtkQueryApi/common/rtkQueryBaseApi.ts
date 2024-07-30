import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

// import { cacher } from '~/services/rtk/utils';

export const rtkQueryBaseApi = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  reducerPath: "rtkqReducer",
  //   tagTypes: Object.values(cacher.tags),
  tagTypes: ["Auth", "Games"],
  keepUnusedDataFor: 60 * 60,
  endpoints: () => ({}),
});
