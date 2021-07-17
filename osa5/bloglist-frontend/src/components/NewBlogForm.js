import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const token1 = `bearer ${props.user.token}`
    const res= await blogService.createBlog(title,author,url,token1)
    console.log('@@@@@response to creating a blog :: ',res)
    props.setBlogs(props.blogs.concat(res))
    props.setErrorMessage(`a new blog ${title} was added`)
    setTimeout(() => {
      props.setErrorMessage(null)
    }, 4000)
  }

  return(
    <> <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
      title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
      author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
      url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit"> Submit </button>
      </form>
    </div> </>)
}

export default NewBlogForm