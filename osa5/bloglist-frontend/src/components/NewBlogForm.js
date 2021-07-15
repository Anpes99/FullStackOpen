import React from 'react'
const NewBlogForm = (props) => (
   <> <div>
    <h2>Create a new blog</h2>
    <form onSubmit={props.handleCreateBlog}>
    <div>
      title
        <input
        type="text"
        value={props.title}
        name="Title"
        onChange={({ target }) => props.setTitle(target.value)}
      />
    </div>
    <div>
      author
        <input
        type="text"
        value={props.author}
        name="Author"
        onChange={({ target }) => props.setAuthor(target.value)}
      />
    </div>
    <div>
      url
        <input
        type="text"
        value={props.url}
        name="Url"
        onChange={({ target }) => props.setUrl(target.value)}
      />
    </div>
    <button type="submit"> Submit </button>
    </form>
  </div> </>
)

export default NewBlogForm