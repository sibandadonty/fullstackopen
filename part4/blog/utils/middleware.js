const errorHandler = (error, request, response, next) => {
    console.log("Error printed from the error handler: ",error);

    next(error);
}

const tokenExtractor = (request, response, next) => {
   
    const authorization = request.get("authorization");

    if (authorization && authorization.startsWith("Bearer ")) {
        const token = authorization.replace("Bearer ", "");
        request.token = token;
    }

    next()
}

module.exports = { errorHandler, tokenExtractor }