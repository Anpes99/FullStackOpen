import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogInForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //  const [title, setTitle] = useState('')
  //  const [author, setAuthor] = useState('')
  //  const [url, setUrl] = useState('')
  const [errorTrue, setErrorTrue] =useState(false)
  const [errorMessage, setErrorMessage] =useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogappUser')
    if (loggedUserJSON){
      console.log(loggedUserJSON)
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  useEffect(() => {

    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => {
        return b.likes - a.likes
      })

      setBlogs( blogs )}
    )
  }, [])

  const handleLike = (blog) => {
    const id = blog.id
    const updatedLikes=blog.likes+1
    blogService.updateBlog(id, { likes:updatedLikes })

  }

  const handleCreateBlog = async (event, title,author,url) => {
    event.preventDefault()
    const token1 = `bearer ${user.token}`
    const res= await blogService.createBlog(title,author,url,token1)
    console.log('@@@@@response to creating a blog :: ',res)
    setBlogs(blogs.concat(res))
    setErrorMessage(`a new blog ${title} was added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    let loggedInUser=null
    try{
      loggedInUser = await loginService.login({ username, password, })
    }
    catch(error){

      setErrorMessage('wrong username or password')
      setErrorTrue(true)
      setTimeout(() => {
        setErrorMessage(null)
        setErrorTrue(false)
      }, 4000)
      return
    }

    console.log(loggedInUser)
    window.localStorage.setItem('LoggedInBlogappUser', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }



  if (user === null) {
    return (<div>
      <Notification message={errorMessage} errorTrue={errorTrue} />
      <Togglable buttonLabel="Log in">
        <LogInForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </Togglable>
    </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} errorTrue={errorTrue} />
      Logged in as {user.name} <button onClick={() => window.localStorage.removeItem('LoggedInBlogappUser')}>log out</button>
      <NewBlogForm  handleCreateBlog={handleCreateBlog}/>
      {blogs.map(blog =>

        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} />


      )}
    </div>
  )
}


export default App