import { ITaskLoaderData } from "@/models/interfaces/ITaskLoaderData";
import { IAxiosBaseQueryArgs } from "@/services/axios/axiosBaseQueryApi";
import { AUTH_ENDPOINT_NAME } from "@/settings/app/constants/api/auth";
import { AppDispatch, AppStore } from "@/store";

export abstract class BaseTaskLoader {
  store: AppStore;
  dispatch: AppDispatch;
  loaderQuery: IAxiosBaseQueryArgs;
  runTask: number = 0;
  runSubTask: number = 0;
  stepId: number = 1;
  constructor(store: AppStore) {
    this.store = store;
    this.dispatch = store.dispatch;
  }

  baseLoader = async (endpoint, loaderQuery: IAxiosBaseQueryArgs) => {
    const promise = this.dispatch(endpoint.initiate(loaderQuery));
    // if (request) request.signal.onabort = promise.abort;

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
    return this.handleResponseData(loaderQuery.endpointName, data);
  };

  handleResponseData = (endpointName, data) => {
    if (!data) {
      if (endpointName === AUTH_ENDPOINT_NAME.REGISTER_LOADER) return null;
    }
    return data;
  };

  abstract loadData(): Promise<ITaskLoaderData>;
}
