const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  let favBlog = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes >= favBlog.likes) {
      favBlog = blog;
    }
  });

  return favBlog;
};

const mostBlogs = (blogs) => {
  const authorsBlogCount = [];
  blogs.forEach((blog) => {
    const authorInList = authorsBlogCount.find((b) => b.author === blog.author);
    if (authorInList) {
      authorsBlogCount[authorsBlogCount.findIndex((a) => a.author === blog.author)].blogs += 1;
    } else { authorsBlogCount.push({ author: blog.author, blogs: 1 }); }
  });

  let authorWithMostBlogs = { author: 'test', blogs: 0 };

  authorsBlogCount.forEach(
    (a) => { if (a.blogs > authorWithMostBlogs.blogs) { authorWithMostBlogs = a; } },
  );
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const authorsLikeCount = [];
  blogs.forEach((blog) => {
    const authorInList = authorsLikeCount.find((b) => b.author === blog.author);
    if (authorInList) {
      const authorIndex = authorsLikeCount.findIndex((a) => a.author === blog.author);
      authorsLikeCount[authorIndex].likes += blog.likes;
    } else { authorsLikeCount.push({ author: blog.author, likes: blog.likes }); }
  });

  let authorWithMostLikes = { author: 'test', likes: 0 };

  authorsLikeCount.forEach(
    (a) => { if (a.likes > authorWithMostLikes.likes) { authorWithMostLikes = a; } },
  );

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
