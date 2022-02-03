
import { useParams } from 'react-router'
import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { createNotification } from '../reducers/notificationReducer'


const BlogPage = ({ blogs,comment, setComment }) => {
  const blog = blogs.find(b => b.id === useParams().id )
  let id=0
  const dispatch = useDispatch()
  const handleCommentSubmit =async (event) => {
    event.preventDefault()
    blog.comments.push(comment)
    setComment('')
    dispatch(createNotification('comment added', 4, false))
    await axios.post(`/api/blogs/${blog.id}/comment`, { comment })
  }

  if (!blog){return null}
  return(

    <div>
      <h2>{blog.title}</h2>
      <li>{blog.url}</li>
      <li>Likes: {blog.likes}</li>
      added by  {blog.user?.username}
      <h3>comments</h3>
      <form onSubmit={(event) => handleCommentSubmit(event)}>
        <div> <input
          id='username'
          type="text"
          value={comment}
          name="Username"
          onChange={({ target }) => setComment(target.value)}
        /></div>
        <button type='submit'>add comment</button>
      </form>
      {

        blog.comments.map(comment => {
          id++
          return (<li key={`${id}`}>{comment}</li>)

        })

      }
    </div>
  )
}


export default BlogPage