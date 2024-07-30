import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

// import { cacher } from '~/services/rtk/utils';

export const rtkqEntryPoint = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: "/" }),
  reducerPath: "rtkReducer",
  //   tagTypes: Object.values(cacher.tags),
  endpoints: () => ({}),
});
