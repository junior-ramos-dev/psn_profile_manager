import toast from "react-hot-toast";
import { axiosInstance, isServerUp } from "../../axios/axiosInstance";
import { getErrorMessage } from "@/utils/restApi";

interface IAxiosBaseQueryArgs {
  url: string;
  method?: string;
  data?: any;
  params?: any;
  signal?: AbortSignal;
}

const axiosFn = async (
  baseUrl: string,
  axiosBasequeryArgs: IAxiosBaseQueryArgs
) => {
  try {
    const serverUp = await isServerUp();

    if (serverUp) {
      axiosBasequeryArgs.url = baseUrl + axiosBasequeryArgs.url;

      console.log(axiosBasequeryArgs.url);

      const result = await axiosInstance({ ...axiosBasequeryArgs });
      // const eTag = result.headers["etag"];
      return { data: result };
    }
  } catch (axiosError) {
    let err = axiosError;
    if (err.status === 400) {
      toast.error("The email is already in use");
    } else if (err.status === 401) {
      toast.error("Please, authenticate first!");
    } else {
      toast.error("Somethings wrong! Please try again later!");
    }

    return {
      error: {
        status: getErrorMessage(err.response?.status),
        data: err.response?.data || err.message,
      },
    };
  }
};

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, signal }: IAxiosBaseQueryArgs) =>
    axiosFn(baseUrl, { url, method, data, params, signal });
