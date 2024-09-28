import { IErrorResponse } from "@/services/axios/axiosApiError";

export interface ITaskProps {
  runTask: number;
  runSubTask: number;
  stepId: number;
}

export interface ITaskHandler {
  data: object;
  error: IErrorResponse;
  taskProps: ITaskProps;
}
