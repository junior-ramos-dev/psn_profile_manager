import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryApi } from "./axiosBaseQueryApi";

export const rtkQueryBaseApi = createApi({
  baseQuery: axiosBaseQueryApi({ baseUrl: "" }),
  reducerPath: "rtkqReducer",
  //   tagTypes: Object.values(cacher.tags),
  tagTypes: ["Auth", "Games"],
  keepUnusedDataFor: 60 * 60,
  endpoints: () => ({}),
});
