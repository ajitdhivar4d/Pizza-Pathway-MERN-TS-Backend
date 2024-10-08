export const errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal sever error");
    err.statusCode || (err.statusCode = 500);
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export const TryCatch = (passedFunc) => (req, res, next) => {
    return Promise.resolve(passedFunc(req, res, next)).catch(next);
};
