import { axiosBaseQueryApi } from "@/services/axios/axiosBaseQueryApi";
import { createApi } from "@reduxjs/toolkit/query/react";

export const rtkQueryBaseApi = createApi({
  baseQuery: axiosBaseQueryApi(),
  reducerPath: "rtkqReducer",
  //   tagTypes: Object.values(cacher.tags),
  tagTypes: ["Auth", "User", "Game", "Trophy"],
  keepUnusedDataFor: 60 * 60,
  endpoints: () => ({}),
});
