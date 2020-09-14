module.exports = function sendResponse(
  statusCode,
  message,
  errorMessage,
  data
) {
  return {
    statusCode: statusCode,
    message: message,
    errorMessage: errorMessage,
    data: data,
  };
};
