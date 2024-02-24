const { model } = require("mongoose");

// Custom Error Handling Using ExpressError
class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;