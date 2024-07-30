import toast from "react-hot-toast";
import { axiosInstance } from "../../axios/axiosInstance";

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
    axiosBasequeryArgs.url = baseUrl + axiosBasequeryArgs.url;

    console.log(axiosBasequeryArgs.url);

    const result = await axiosInstance({ ...axiosBasequeryArgs });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    if (err.status === 400) {
      toast.error("The name is already in use 🤷‍♂️");
    } else if (err.status === 401) {
      toast.error("Please, authenticate first! ✌😎");
    } else {
      toast.error("Somethings wrong! Please try again later! 😢");
    }

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, signal }: IAxiosBaseQueryArgs) =>
    axiosFn(baseUrl, { url, method, data, params, signal });
