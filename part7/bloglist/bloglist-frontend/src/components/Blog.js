import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {


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



  /*const handleDelete = async () => {
    const token = `bearer ${user.token}`
    const deleteConfirm = window.confirm('Do you really want to delete this blog?')
    if (deleteConfirm) {await dispatch(deleteBlog(blog, token))}
  }*/

  console.log(blog.user)
  return (

    <div className='blog'  style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
    </div> )
}

export default Blog