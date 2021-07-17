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
      <NewBlogForm  token={user.token} setBlogs={setBlogs} setErrorMessage={setErrorMessage} blogs={blogs} user={user}/>
      {blogs.map(blog =>

        <Blog key={blog.id} blog={blog} user={user} />


      )}
    </div>
  )
}


export default App