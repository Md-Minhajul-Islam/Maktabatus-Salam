

function createError(message, status = 500) {
  const err = new Error(message);
  err.status = status;
  return err;
}


// default error handler
function errorHandler(err, req, res, next) {

  const status = err.status || 500;
  const response = {
    status,
    message: err.message || "There was an error!"
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }


  res.status(status).json(response);
}

module.exports = {
    createError,
    errorHandler
};