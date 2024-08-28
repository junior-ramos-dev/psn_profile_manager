import {
  HTTP_STATUS_ERROR,
  HTTP_STATUS_INFORMATION,
  HTTP_STATUS_REDIRECTION,
  HTTP_STATUS_SUCCESS,
} from "@/settings/app/constants";

export const getEnpointHeaderKey = (
  endpointName: string,
  headerKey: string
): string => `${endpointName}:${headerKey}`;

/**
 * Set the header value for an endpoint in localStorage
 *
 * @param endpointName
 * @param headerKey
 * @param value
 * @returns
 */
export const setEnpointHeader = (
  endpointName: string,
  headerKey: string,
  value: string
): void =>
  localStorage.setItem(getEnpointHeaderKey(endpointName, headerKey), value);

/**
 * Get header value for an endpoint from localStorage
 *
 * @param endpointName
 * @param headerKey
 * @returns
 */
export const getEnpointHeader = (
  endpointName: string,
  headerKey: string
): string => localStorage.getItem(getEnpointHeaderKey(endpointName, headerKey));

/**
 * Clear the header value for an endpoint in localStorage
 *
 * @param endpointName
 * @param headerKey
 * @returns
 */
export const clearEnpointHeader = (
  endpointName: string,
  headerKey: string
): void =>
  localStorage.setItem(getEnpointHeaderKey(endpointName, headerKey), "");

/**
 * Remove the header key for and endpoint in localStorage
 *
 * @param endpointName
 * @param headerKey
 * @returns
 */
export const removeEnpointHeaderKey = (
  endpointName: string,
  headerKey: string
): void =>
  localStorage.removeItem(getEnpointHeaderKey(endpointName, headerKey));

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
