const express = require('express');
var bodyParser = require('body-parser')

const cors = require('cors');

const mongoose = require('mongoose');
const config = require('./utils/config');

const app = express();
const bloglistsRouter = require('./controllers/bloglists');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
// app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', bloglistsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if ( process.env.NODE_ENV ==='test'){
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
// app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler);

module.exports = app;
