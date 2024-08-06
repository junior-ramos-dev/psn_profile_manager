export enum VERBS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  LIST = "LIST",
}

export enum HTTP_STATUS_ERROR {
  CLIENT_ERROR = "Client Bad Request!",
  SERVER_ERROR = "Server Error!",
  NOT_FOUND_ERROR = "Not Found Error!",
  SERVICE_UNAVAILABLE = "Service Unavailable. Unable to Communicate with Server!",
  UNKNOWN_ERROR = "Unknown Error. Something Went Wrong!",
  NO_ERROR = "",
}

const getStatusMessage = (status: number, message: string) =>
  `HTTP(s) ${status}: ${message}`;

export const getErrorMessage = (status) => {
  let range = 0;

  console.log(status);

  if (status < 300) range = 1;
  if (status === 400 && status < 403) range = 2;
  if (status === 404 && status < 500) range = 3;
  if (status === 503) range = 4;
  if (status !== 503 && status >= 500) range = 5;

  let errorMessage = "";

  switch (range) {
    case 1:
      errorMessage = getStatusMessage(status, HTTP_STATUS_ERROR.NO_ERROR);
      break;
    case 2:
      errorMessage = getStatusMessage(status, HTTP_STATUS_ERROR.CLIENT_ERROR);
      break;
    case 3:
      errorMessage = getStatusMessage(
        status,
        HTTP_STATUS_ERROR.NOT_FOUND_ERROR
      );
      break;
    case 4:
      errorMessage = getStatusMessage(
        status,
        HTTP_STATUS_ERROR.SERVICE_UNAVAILABLE
      );
      break;
    case 5:
      errorMessage = getStatusMessage(status, HTTP_STATUS_ERROR.SERVER_ERROR);
      break;
    default:
      errorMessage = getStatusMessage(status, HTTP_STATUS_ERROR.UNKNOWN_ERROR);
  }
  return errorMessage;
};

export const getEnpointHeaderKey = (endpointName: string, headerKey: string) =>
  `${endpointName}:${headerKey}`;
