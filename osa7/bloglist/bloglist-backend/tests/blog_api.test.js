const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'W blog',
    author: 'Bob Bee',
    url: 'www.Wblog.com',
    likes: 644,

  },
  {
    title: 'Q blog',
    author: 'Joe Bee',
    url: 'www.Qblog.com',
    likes: 4,

  },
];
const initialUsers = [{ username: 'user1', name: 'dave', password: '12345' },
  { username: 'user2', name: 'greg', password: '12345' }];

const newBlog = {
  title: 'E blog',
  author: 'Cindy C',
  url: 'www.Eblog.com',
  likes: 644,

};

const blogWithoutLikes = {
  title: 'noLikes',
  author: 'Cin C',
  url: 'www.Noblog.com',
};

let token;
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});
  await api.post('/api/users').send(initialUsers[0]);
  const resWithToken = await api.post('/api/login').send({ username: initialUsers[0].username, password: initialUsers[0].password }).expect(200);
  token = `bearer ${resWithToken.body.token}`;
});

test('correct amount of blogs are returned in JSON-format', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(res.body.length).toEqual(initialBlogs.length);
});

test('blog objects have a field called id defined', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(res.body[0].id).toBeDefined();
});

test('blogs can be added to /api/blogs with HTTP POST-request', async () => {
  await api.post('/api/blogs').send(newBlog).set('authorization', token);

  const res = await Blog.find({});
  expect(res.length).toEqual(initialBlogs.length + 1);
});

test('if likes is undefined in blog object it is set as 0', async () => {
  await api.post('/api/blogs').send(blogWithoutLikes).set('authorization', token);

  const blogs = await api.get('/api/blogs');
  const blogi = blogs.body.find((b) => b.title === 'noLikes');
  expect(blogi.likes).toEqual(0);
});

test('if new blog doesnt contain title and url response has status code 400', async () => {
  const blogWithoutTitle = {
    author: 'Cindy C',
    likes: 644,
  };
  const res1 = await api.post('/api/blogs').send(blogWithoutTitle).set('authorization', token);

  expect(res1.status).toEqual(400);
});

test('new blog wont be created and status code 401 is returned if token isnt provided', async () => {
  const res = await api.post('/api/blogs').send(newBlog).expect(401);

  const blogs = await Blog.find({});
  expect(blogs.length).toEqual(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
