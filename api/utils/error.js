export const errorHandler = (statusCode, mesagge) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = mesagge;
  return error;
}