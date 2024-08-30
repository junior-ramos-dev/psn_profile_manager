export enum HEADERS {
  AUTHORIZATION = "authorization",
  ETAG = "etag",
  IF_NONE_MATCH = "if-none-match",
}

export const DUMMY_ETAG_HEADER = "00000-XXXXXXXXXXXXXXXXXXXXXXXXXXX";

export enum VERBS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  LIST = "LIST",
}

// HTTP STATUS 100-199
export enum HTTP_STATUS_INFORMATION {
  GENERAL = "Information. An initial part of the request was received and the client should continue.",
}

// HTTP STATUS 200-299
export enum HTTP_STATUS_SUCCESS {
  OK = "OK. The request succeeded!",
  CREATED = "Created. A new resource was created as a result.",
  GENERAL = "Successful Transaction",
}

// HTTP STATUS 300-399
export enum HTTP_STATUS_REDIRECTION {
  NOT_MODIFIED = "Not Modified. You can continue using the same cached version of the response.",
  GENERAL = "Redirection. The client must take additional action to complete the request.",
}

// HTTP STATUS 400-499 and 500-599
export enum HTTP_STATUS_ERROR {
  CLIENT_ERROR = "Client Error. Bad Request!",
  SERVER_ERROR = "Server Error!",
  NOT_FOUND_ERROR = "Not Found Error!",
  SERVICE_UNAVAILABLE = "Service Unavailable. Unable to Communicate with Server!",
  UNKNOWN_ERROR = "Unknown Error. Something Went Wrong!",
}
