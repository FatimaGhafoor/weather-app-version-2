import { ErrorMessages } from "./config.js";

const STATUS_ERRORS = {
  404: ErrorMessages.NOT_FOUND,
  429: ErrorMessages.RATE_LIMITED,
  500: ErrorMessages.SERVER_ERROR,
};

export function handleResponseError(response) {
  const message =
    STATUS_ERRORS[response.status] || `Error ${response.status}: Unknown error`;

  return new Error(message);
}

export function handleError(error) {
  if (error.name === "AbortError") return null;
  return error.message || ErrorMessages.UNKNOWN_ERROR;
}
