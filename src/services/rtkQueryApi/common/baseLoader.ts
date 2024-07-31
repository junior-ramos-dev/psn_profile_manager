import { isServerUp } from "@/services/axios/axiosInstance";
import { getErrorMessage } from "@/utils/restApi";
export class BaseLoader {
  store = {};
  dispatch = () => {};
  constructor(store) {
    this.store = store;
    this.dispatch = store.dispatch;
  }

  loader = async (endpoint, request, query, queryOptions) => {
    const promise = this.store.dispatch(endpoint.initiate(query, queryOptions));
    // request.signal.onabort = promise.abort;
    const res = await promise;
    const { data, isError, error } = res;
    if (isError) {
      let { status, data } = error;
      if (status >= 200 && status <= 599) {
        console.log(status);
        throw new Response("", {
          status,
          statusText: data?.message || getErrorMessage(status),
        });
      } else {
        // const persistedToken = store.getState().auth.token;
        console.log("503");
        status = 503;
        throw new Response("", {
          status,
          statusText: getErrorMessage(status),
        });
      }
    }
    return data;
  };
}
