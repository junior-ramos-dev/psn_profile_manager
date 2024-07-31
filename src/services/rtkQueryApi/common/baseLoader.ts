const CLIENTERROR = "Bad request";
const SERVERERROR = "Server error";
const UNKNOWNERROR = "Something went wrong";
const NOTFOUND = "Data not found";
const NONE = "";

export const getErrorMessage = (status = 403) => {
  if (!status) return UNKNOWNERROR;
  if (status < 300) return NONE;
  if (status === 404 && status < 500) return NOTFOUND;
  if (status === 400 && status < 500) return CLIENTERROR;
  if (status >= 500) return SERVERERROR;
  return UNKNOWNERROR;
};

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
