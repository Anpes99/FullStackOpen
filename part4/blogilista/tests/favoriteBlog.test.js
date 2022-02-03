const { favoriteBlog } = require('../utils/list_helper');

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

describe('Most liked blog', () => {
  test('gets return correctly from big list', () => {
    const result = favoriteBlog(listOfBlogs);
    expect(result).toEqual(listOfBlogs[0]);
  });

  test('when given empty list works correctly', () => {
    const result = favoriteBlog([]);
    expect(result).toBe(undefined);
  });

  test('when list only has one blog works correctly', () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0]);
  });
});
