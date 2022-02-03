import React, { useState } from 'react'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  return(
    <> <div>
      <h2>Create a new blog</h2>
      <form onSubmit={(event) => props.handleCreateBlog(event, title, author, url)}>
        <div>
      title
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
      author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
      url
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submitBlog' type="submit"> Submit </button>
      </form>
    </div> </>)
}

export default NewBlogForm