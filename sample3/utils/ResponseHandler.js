class ResponseHandler {
    static success(res, message, data = null) {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }

    static badRequest(res, message) {
        return this.error(res, message, 400);
    }
}

module.exports = ResponseHandler;