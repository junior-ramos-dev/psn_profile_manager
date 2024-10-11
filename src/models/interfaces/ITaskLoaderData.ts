import { IErrorResponse } from "@/services/axios/axiosApiError";

export interface ITaskLoaderData {
  data: object;
  error: IErrorResponse;
  taskId: number;
}
