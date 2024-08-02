import { AppDispatch, AppStore, RootState } from "@/store";
import { getErrorMessage } from "@/utils/restApi";
export class BaseLoader {
  state: RootState;
  dispatch: AppDispatch;
  constructor(store: AppStore) {
    this.state = store.getState();
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
