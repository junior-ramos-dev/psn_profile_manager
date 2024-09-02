import { GAME_LOADER_ENDPOINT_NAME } from "@/settings/app/constants/api";
import { AppDispatch, AppStore } from "@/store";

export class BaseLoader {
  store: AppStore;
  dispatch: AppDispatch;
  constructor(store: AppStore) {
    this.store = store;
    this.dispatch = store.dispatch;
  }

  loader = async (endpointName, endpoint, request, query, queryOptions) => {
    const promise = this.dispatch(endpoint.initiate(query, queryOptions));

    if (request) request.signal.onabort = promise.abort;

    const res = await promise;
    const { data, isError, error } = res;

    if (isError && error.status !== 304) {
      const errorInfo = error;
      if (errorInfo.status >= 400 && errorInfo.status <= 599) {
        console.log(errorInfo.status);
        throw new Response("", {
          status: errorInfo.status,
          statusText: errorInfo.data,
        });
      }
    }
    return this.handleResponseData(endpointName, data);
  };

  handleResponseData = (endpointName, data) => {
    if (!data) {
      if (endpointName === GAME_LOADER_ENDPOINT_NAME.GAME_LIST_LOADER)
        return null;
    }
    return data;
  };
}
