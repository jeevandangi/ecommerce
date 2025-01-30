class apiError extends Error {
    constructor(statusCode, message, errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null; // Additional error data if needed
        this.message = message;
        this.success = statusCode >= 200 && statusCode < 300; // Success flag based on status code
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export { apiError };
