const { mostBlogs } = require('../utils/list_helper');

const listOfBlogs = [
  {
    _id: '5a422aa71b54a677234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. aaaaaa',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 76,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a276234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. bbbbb',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676934d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. ccccccc',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 50,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a6763454d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. ddddddd',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 3,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a697534d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a614634d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 300,
    __v: 0,
  },

];
describe('Author with most blogs', () => {
  test('gets returned correctly from big list', () => {
    const result = mostBlogs(listOfBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 });
  });
});
