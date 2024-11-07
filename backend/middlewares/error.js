// ErrorHandler class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Middleware for error handling
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handling CastError (invalid MongoDB ObjectId)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handling ValidationError (Mongoose validation errors)
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values(err.errors).map((error) => error.message);
    err = new ErrorHandler(validationErrors.join(', '), 400);
  }

  // Final error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
