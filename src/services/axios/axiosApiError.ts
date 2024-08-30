import { AxiosError } from "axios";

export interface IAxiosApiError {
  status: number;
  message: string;
  data: AxiosError<Response>;
}

export interface ErrorData {
  name: string;
  message: string;
  errors?: ReqValidationError[];
}

export interface ReqValidationError {
  type: string;
  msg: string;
  path: string;
  location: string;
}

export class AxiosApiError implements IAxiosApiError {
  status: number;
  message: string;
  data: AxiosError<Response>;
  constructor(status: number, message: string, data: AxiosError<Response>) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
