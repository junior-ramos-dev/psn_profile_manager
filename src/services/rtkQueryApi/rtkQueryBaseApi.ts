import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQueryApi } from "../axios/axiosBaseQueryApi";

export const rtkQueryBaseApi = createApi({
  baseQuery: axiosBaseQueryApi(),
  reducerPath: "rtkqReducer",
  //   tagTypes: Object.values(cacher.tags),
  tagTypes: ["Auth", "User", "Game", "Trophy"],
  keepUnusedDataFor: 60 * 60,
  endpoints: () => ({}),
});
