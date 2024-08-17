export enum VERBS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  LIST = "LIST",
}
// HTTP STATUS 100-199
enum HTTP_STATUS_INFORMATION {
  GENERAL = "Information. An initial part of the request was received and the client should continue.",
}

// HTTP STATUS 200-299
enum HTTP_STATUS_SUCCESS {
  OK = "OK. The request succeeded!",
  CREATED = "Created. A new resource was created as a result.",
  GENERAL = "Successful Transaction",
}

// HTTP STATUS 300-399
enum HTTP_STATUS_REDIRECTION {
  NOT_MODIFIED = "Not Modified. You can continue using the same cached version of the response.",
  GENERAL = "Redirection. The client must take additional action to complete the request.",
}

// HTTP STATUS 400-499 and 500-599
enum HTTP_STATUS_ERROR {
  CLIENT_ERROR = "Client Error. Bad Request!",
  SERVER_ERROR = "Server Error!",
  NOT_FOUND_ERROR = "Not Found Error!",
  SERVICE_UNAVAILABLE = "Service Unavailable. Unable to Communicate with Server!",
  UNKNOWN_ERROR = "Unknown Error. Something Went Wrong!",
}

const getStatusMessage = (status: number, message: string) =>
  `HTTP(s) ${status}: ${message}`;

export const getHttpResponseMessage = (status) => {
  let range = 0;

  // Status Information [100-199]
  if (status >= 100 && status < 199) range = 1;

  // Status Success [200-299]
  if (status === 200) range = 2;
  if (status === 201) range = 3;
  if (status >= 202 && status < 299) range = 4;

  // Status Redirection [300-399]
  if (status === 304) range = 5;
  if (status !== 304 && status >= 300 && status <= 399) range = 6;

  // Status Error [400-499] and [500-599]
  if (status >= 400 && status < 403) range = 7;
  if (status >= 404 && status < 500) range = 8;
  if (status === 503) range = 9;
  if (status !== 503 && status >= 500 && status <= 599) range = 10;

  let message = "";

  switch (range) {
    // Status Information [100-199]
    case 1:
      message = getStatusMessage(status, HTTP_STATUS_INFORMATION.GENERAL);
      break;

    // Status Success [200-299]
    case 2:
      message = getStatusMessage(status, HTTP_STATUS_SUCCESS.OK);
      break;
    case 3:
      message = getStatusMessage(status, HTTP_STATUS_SUCCESS.CREATED);
      break;
    case 4:
      message = getStatusMessage(status, HTTP_STATUS_SUCCESS.GENERAL);
      break;

    // Status Redirection [300-399]
    case 5:
      message = getStatusMessage(status, HTTP_STATUS_REDIRECTION.NOT_MODIFIED);
      break;
    case 6:
      message = getStatusMessage(status, HTTP_STATUS_REDIRECTION.GENERAL);
      break;

    // Status Error [400-499] and [500-599]
    case 7:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.CLIENT_ERROR);
      break;
    case 8:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.NOT_FOUND_ERROR);
      break;
    case 9:
      message = getStatusMessage(status, HTTP_STATUS_ERROR.SERVICE_UNAVAILABLE);
      break;
    case 10:
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
