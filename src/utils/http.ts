export enum VERBS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  LIST = "LIST",
}

enum HTTP_STATUS_SUCCESS {
  OK = "OK. The request succeeded!",
  CREATED = "Created. A new resource was created as a result.",
  NO_CONTENT = "No Content. There is no content to send for this request.",
}

enum HTTP_STATUS_REDIRECTION {
  NOT_MODIFIED = "Not Modified. You can continue using the same cached version of the response.",
}

enum HTTP_STATUS_ERROR {
  CLIENT_ERROR = "Client Error. Bad Request!",
  SERVER_ERROR = "Server Error!",
  NOT_FOUND_ERROR = "Not Found Error!",
  SERVICE_UNAVAILABLE = "Service Unavailable. Unable to Communicate with Server!",
  UNKNOWN_ERROR = "Unknown Error. Something Went Wrong!",
  NO_ERROR = "",
}

const getStatusMessage = (status: number, message: string) =>
  `HTTP(s) ${status}: ${message}`;

//TODO Create Record to use with transformResponse
export const getHttpResponseMessage = (status) => {
  let range = 0;

  // Status OK
  if (status === 200) range = 1;
  if (status === 201) range = 2;
  if (status === 204) range = 3;
  if (status === 304) range = 4;

  // Status Error
  if (status >= 400 && status < 403) range = 5;
  if (status >= 404 && status < 500) range = 6;
  if (status === 503) range = 7;
  if (status !== 503 && status >= 500) range = 8;

  let message = "";

  switch (range) {
    // Status OK
    case 1:
      message = getStatusMessage(status, HTTP_STATUS_SUCCESS.OK);
      break;
    case 2:
      message = getStatusMessage(status, HTTP_STATUS_SUCCESS.CREATED);
      break;
    case 3:
      message = getStatusMessage(status, HTTP_STATUS_SUCCESS.NO_CONTENT);
      break;
    case 4:
      message = getStatusMessage(status, HTTP_STATUS_REDIRECTION.NOT_MODIFIED);
      break;

    // Status Error
    case 5:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.CLIENT_ERROR);
      break;
    case 6:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.NOT_FOUND_ERROR);
      break;
    case 7:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.SERVICE_UNAVAILABLE);
      break;
    case 8:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.SERVER_ERROR);
      break;
    default:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.UNKNOWN_ERROR);
  }
  // console.log(message);
  return message;
};

export const getEnpointHeaderKey = (endpointName: string, headerKey: string) =>
  `${endpointName}:${headerKey}`;
