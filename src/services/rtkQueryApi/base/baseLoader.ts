import { AppDispatch, AppStore } from "@/store";
import { getErrorMessage } from "@/utils/restApi";
export class BaseLoader {
  store: AppStore;
  dispatch: AppDispatch;
  constructor(store: AppStore) {
    this.store = store;
    this.dispatch = store.dispatch;
  }

  loader = async (endpoint, request, query, queryOptions) => {
    const promise = this.dispatch(endpoint.initiate(query, queryOptions));
    if (request) request.signal.onabort = promise.abort;
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
