const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!(body.username && body.password)) {
    return response.status(400).json({ error: 'username or password missing' });
  }
  if (!(body.username.length > 2 && body.password.length > 2)) {
    return response.status(400).json({ error: 'username or password is too short' });
  }
  // const salt = bcrypt.genSaltSync(10);
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  // const passwordHash = bcrypt.hashSync(body.password, salt);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notesr', { url: 1, title: 1, author: 1 });
  response.json(users.map((user) => user.toJSON()));
});

module.exports = usersRouter;
