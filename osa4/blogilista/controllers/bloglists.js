const jwt = require('jsonwebtoken');
const bloglistsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
} */

bloglistsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  console.log(blogs);
  response.json(blogs.map((blog) => blog.toJSON()));
});

bloglistsRouter.post('/', async (request, response) => {
  const { body } = request;
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  if (!request.token) { return response.status(401).send(); }
  // const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).send({ message: 'title or url is undefined' });
  }

  console.log(user);
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  };

  const blog = new Blog(newBlog);
  if (blog.likes === undefined) { blog.likes = 0; }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

bloglistsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.find({})
    .then((blogs) => blogs.find((blog) => blog.id === request.params.id));
  if (!request.token) { response.status(401).json({ error: 'token is missing' }); }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  if (user._id.toString() !== blogToDelete.user.toString()) { response.status(401).json({ error: 'Only the user that posted the blog is allowed to delete it' }); }

  console.log(request.params.id);
  blogToDelete !== undefined ? await Blog.deleteOne(blogToDelete) : response.status(400).json({ error: 'that blog doesnt exist' });
  response.status(200).json({ message: 'blog succesfully deleted' });
});

bloglistsRouter.patch('/:id', async (request, response) => {
  console.log(request.params)
  const blogToModify = await Blog.find({}).then((blogs) => blogs.find((blog) => blog.id === request.params.id));
  console.log(blogToModify)
  await Blog.updateOne(blogToModify, request.body);
  response.status(200).send()
});

module.exports = bloglistsRouter;
