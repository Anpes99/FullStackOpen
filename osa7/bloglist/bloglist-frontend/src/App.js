import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogInForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { setBlogs, createBlog, likeBlog } from './reducers/blogsReducer'
import { logInUser } from './reducers/userReducer'
import {
  Switch, Route, Link
} from 'react-router-dom'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'
import { setUsers } from './reducers/usersReducer'
import BlogPage from './components/BlogPage'
import Container from '@material-ui/core/Container'

const App = () => {
  const user = useSelector((state) => state.loggedInUser.user)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users.users)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [comment, setComment] = useState('')

  //  const [title, setTitle] = useState('')
  //  const [author, setAuthor] = useState('')
  //  const [url, setUrl] = useState('')
  //const [errorTrue, setErrorTrue] =useState(false)
  //const [errorMessage, setErrorMessage] =useState(null)

  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(setUsers())
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogappUser')
    if (loggedUserJSON){
      console.log(loggedUserJSON)
      await dispatch({ type:'SET_USER', data: { user:JSON.parse(loggedUserJSON) } })
    }

    const blogsInit= await blogService.getAll()
    blogsInit.sort((a,b) => {
      return b.likes - a.likes
    })

    await dispatch(setBlogs( blogsInit ))
    console.log(blogs)

  }, [])

  /* useEffect(async () => {

    const blogs= await blogService.getAll()
    blogs.sort((a,b) => {
      return b.likes - a.likes
    })

    await dispatch(setBlogs( blogs ))

  }, [])*/

  const handleLike = (e,blog) => {
    e.preventDefault
    dispatch(likeBlog(blog, blogs))
  }



  const handleCreateBlog = async (event, title,author,url) => {
    event.preventDefault()
    const token1 = `bearer ${user.token}`
    dispatch(createBlog(title,author,url,token1))
    dispatch(createNotification('new blog created!', 4, false))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logInUser(username, password))

  }



  if (user === null) {
    return (<div>
      <Notification />
      <Togglable buttonLabel="Log in">
        <LogInForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </Togglable>
    </div>
    )
  }

  return (<Container>
    <><div>
      <div>
        <Link to='/' style={ { padding:5 } }>Home</Link>
        <Link to='/blogs' style={ { padding:5 } }>Blogs</Link>
        <Link to='/users' style={ { padding:5 }} >Users</Link>


        <Notification />
      Logged in as {user.name} <button onClick={() => window.localStorage.removeItem('LoggedInBlogappUser')}>log out</button></div>
    </div>
    <h2>blogs</h2>
    <Switch>
      <Route path='/users/:id'>
        <UserInfo users={users}  />
      </Route>
      <Route path='/users'>
        <UsersInfo users={users}/>
      </Route>
      <Route path='/blogs/:id'>
        <BlogPage blogs={blogs} comment={comment} setComment={setComment} />
      </Route>
      <Route path='/blogs'>
        <div>

          <NewBlogForm  handleCreateBlog={handleCreateBlog}/>
          {blogs.map(blog =>

            <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} />


          )}
        </div>

      </Route>
      <Route path='/'>

      </Route>
    </Switch></>
  </Container>)
}


export default App