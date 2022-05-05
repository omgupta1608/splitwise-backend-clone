const sendResponse = (res, data, error, message, code) => {
    res.json({
        data,
        error,
        message,
        statusCode: code
    });
}


module.exports = sendResponse;