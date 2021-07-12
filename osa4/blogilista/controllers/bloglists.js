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
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).send({ message: 'title or url is undefined' });
  }

  const blog = new Blog(request.body);

  if (blog.likes === undefined) { blog.likes = 0; }

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

bloglistsRouter.delete('/:id', async (request, response) => {
  console.log(request.params.id);
  const blogToDelete = await Blog.find({})
    .then((blogs) => blogs.find((blog) => blog.id === request.params.id));
  blogToDelete !== undefined ? await Blog.deleteOne(blogToDelete) : console.log('that blog doesnt exist');
  response.status(204).send();
});

bloglistsRouter.patch('/:id', async (request, response) => {
  const blogToModify = await Blog.find({}).then((blogs) => blogs.find((blog) => blog.id === request.params.id));
  await Blog.updateOne(blogToModify, request.body);
  response.status(200).send();
});

module.exports = bloglistsRouter;
