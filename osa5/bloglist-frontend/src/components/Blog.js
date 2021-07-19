import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike }) => {


  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // let userCreatedBlog =false

  // if (blog.user){
  //   if (user.id === blog.user.id){userCreatedBlog=true}}



  const handleDelete = () => {
    const token = `bearer ${user.token}`
    const deleteConfirm = window.confirm('Do you really want to delete this blog?')
    if (deleteConfirm) blogService.deleteBlog(blog.id, token)

  }

  return (
    <div className='blog'  style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" >
        <ul key={blog._id}>
          <li>{blog.url}</li>
          <li >likes: <a className="likes">{blog.likes}</a> <button className='likeButton' onClick={(e) => {handleLike(e,blog)}} >like</button></li>
          <li>  {blog.user ? blog.user.username: ''}</li>
        </ul>
        <div style ={{ display: user.id === blog.user.id ? '' : 'none' }}> <button onClick={handleDelete} >delete</button></div>
      </Togglable>
    </div> )
}

export default Blog