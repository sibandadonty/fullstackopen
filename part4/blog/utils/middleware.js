const errorHandler = (error, request, response, next) => {
    console.log("Error printed from the error handler: ",error);
    
    next(error);
}

module.exports = { errorHandler }