import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserInfo = ({ users }) => {
  const blogs = useSelector((state) => state.blogs)
  const user = users.find(u => u.id === useParams().id)



  console.log(blogs)
  return (
    <div>


      <h3>added blogs</h3>
      {user.blogs.map(blogId => {
        console.log(blogs)
        const blog = blogs.find(b => b.id === blogId)
        //console.log(blog)
        if (blog !== undefined) {
          return(
            <li key={blog.id} >{blog.title}</li>
          )
        }
        else return null

      }

      )}
    </div>
  )
}

export default UserInfo