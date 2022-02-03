const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

initialUsers = [{ username: 'user1', name: 'dave', password: '12345' },
  { username: 'user2', name: 'greg', password: 'qwerty' }];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
});
describe('user api tests', () => {
  test('user wont be created if username is shorter than 3', async () => {
    const usernameTooShort = { username: 'qw', name: 'david', password: 'qwerty' };
    await api.post('/api/users').send(usernameTooShort).expect(400);
    await User.find({}).then((users) => expect(users.length).toEqual(initialUsers.length));
  });

  test('user wont be created if password is shorter than 3', async () => {
    const passwordTooShort = { username: 'qwerty', name: 'Shaun', password: 'qw' };
    await api.post('/api/users').send(passwordTooShort).expect(400);
    await User.find({}).then((users) => expect(users.length).toEqual(initialUsers.length));
  });

  test('user wont be created if username already exists and error message is returned with 400 status code', async () => {
    const usernameAlreadyExists = { username: 'user1', name: 'Shaun', password: 'qwerty1' };
    const res = await api.post('/api/users').send(usernameAlreadyExists).expect(400);
    expect(res.body.error).toContain('User validation failed');
    const users = await User.find({});
    expect(users.length).toEqual(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
