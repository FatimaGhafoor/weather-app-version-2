import { ErrorMessages } from "./config.js";

export function handleResponseError(response) {
  const statusCode = response.status;

  if (statusCode === 404) {
    throw new Error(ErrorMessages.NOT_FOUND);
  } else if (statusCode === 429) {
    throw new Error(ErrorMessages.RATE_LIMITED);
  } else if (statusCode === 500) {
    throw new Error(ErrorMessages.SERVER_ERROR);
  }
  throw new Error(`Error ${statusCode}: Unknown error`);
}

