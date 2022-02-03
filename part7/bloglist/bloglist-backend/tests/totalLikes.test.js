const { totalLikes } = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listOfBlogs = [
  {
    _id: '5a422aa71b54a677234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 76,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a276234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676934d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0,
  },

];

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('of only one blog equals the likes of that blog', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0].likes);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = totalLikes(listOfBlogs);
    expect(result).toBe(listOfBlogs.reduce((sum, blog) => sum + blog.likes, 0));
  });
});
