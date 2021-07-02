const bloglistsRouter = require('express').Router();
const Blog = require('../models/blog');

bloglistsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

bloglistsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

module.exports = bloglistsRouter;
