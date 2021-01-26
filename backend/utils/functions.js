const {
  ERROR_WRONG_DATA_CODE,
  ERROR_DEFAULT_CODE,
  ERROR_DEFAULT_MESSAGE,
  VALIDATION_ERROR_NAME,
} = require('./constants');

// Функция отправки ошибки на клиент в различных вариациях
function sendError(res, error = undefined, status = undefined) {
  if (error !== undefined && status !== undefined) {
    res.status(status).send({ message: error });
    return;
  } if (error === undefined) {
    res.status(ERROR_DEFAULT_CODE).send({ message: ERROR_DEFAULT_MESSAGE });
    return;
  }

  let errorCode;
  switch (error.name) {
    case VALIDATION_ERROR_NAME:
      errorCode = ERROR_WRONG_DATA_CODE;
      break;
    default:
      errorCode = ERROR_DEFAULT_MESSAGE;
  }
  res.status(errorCode).send({ message: error.message });
}

module.exports = { sendError };
