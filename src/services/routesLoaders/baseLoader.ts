import { AppDispatch, AppStore } from "@/store";
import { getErrorMessage } from "@/utils/http";
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
      const errorInfo = error;
      if (errorInfo.status >= 200 && errorInfo.status <= 599) {
        console.log(errorInfo.status);
        throw new Response("", {
          status: errorInfo.status,
          statusText:
            errorInfo.data?.message || getErrorMessage(errorInfo.status),
        });
      } else {
        console.log("503");
        errorInfo.status = 503;
        throw new Response("", {
          status: errorInfo.status,
          statusText: getErrorMessage(errorInfo.status),
        });
      }
    }
    return data;
  };
}
