export enum VERBS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

enum HTTP_STATUS_ERROR {
  CLIENT_ERROR = "Client Bad Request!",
  SERVER_ERROR = "Server Error!",
  NOT_FOUND_ERROR = "Not Found Error!",
  UNKNOWN_ERROR = "Unknown Error. Something Went Wrong!",
  NO_ERROR = "",
}

const getStatusMessage = (status: number, message: string) =>
  `${status} + ": "+ ${message}`;

export const getErrorMessage = (status = 403) => {
  let range = 0;

  if (!status) range = 1;
  if (status < 300) range = 2;
  if (status === 400 && status < 404) range = 3;
  if (status === 404 && status < 500) range = 4;
  if (status >= 500) range = 5;

  switch (range) {
    case 1:
      return getStatusMessage(status, HTTP_STATUS_ERROR.UNKNOWN_ERROR);
    case 2:
      return getStatusMessage(status, HTTP_STATUS_ERROR.NO_ERROR);
    case 3:
      return getStatusMessage(status, HTTP_STATUS_ERROR.CLIENT_ERROR);
    case 4:
      return getStatusMessage(status, HTTP_STATUS_ERROR.NOT_FOUND_ERROR);
    case 5:
      return getStatusMessage(status, HTTP_STATUS_ERROR.SERVER_ERROR);
    default:
      return getStatusMessage(status, HTTP_STATUS_ERROR.UNKNOWN_ERROR);
  }
};
