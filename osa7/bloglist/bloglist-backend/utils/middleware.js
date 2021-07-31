const jwt = require('jsonwebtoken');
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);

    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = decodedToken.username;
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    console.log(error.message);
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler, tokenExtractor, userExtractor, requestLogger, unknownEndpoint };
