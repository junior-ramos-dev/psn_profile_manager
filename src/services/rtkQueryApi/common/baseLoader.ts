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
      const { status = 403, data } = error;
      throw new Response("", {
        status,
        statusText: data?.message || getErrorMessage(status),
      });
    }
    return data;
  };
}
