import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LogInForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorTrue, setErrorTrue] =useState(false)
  const [errorMessage, setErrorMessage] =useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogappUser')
    if (loggedUserJSON){
      console.log(loggedUserJSON)
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    let loggedInUser=null
    try{
    loggedInUser = await loginService.login({username, password,})
    }
    catch(error){

      setErrorMessage("wrong username or password");
       setErrorTrue(true)
       setTimeout(() => {
        setErrorMessage(null);
        setErrorTrue(false)
       }, 4000);
      return
      }
      
    console.log(loggedInUser)
    window.localStorage.setItem('LoggedInBlogappUser', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  const handleCreateBlog = async (event) =>{
    event.preventDefault()
    const token1 = `bearer ${user.token}`
    const res= await blogService.createBlog(title,author,url,token1)
    console.log("@@@@@response to creating a blog :: ",res)
    setBlogs(blogs.concat(res))
    setErrorMessage(`a new blog ${title} was added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000);
  }

  if (user === null) {
    return (<div>
      <Notification message={errorMessage} errorTrue={errorTrue} />
      <LogInForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} errorTrue={errorTrue} />
      Logged in as {user.name} <button onClick={()=> window.localStorage.removeItem('LoggedInBlogappUser')}>log out</button>
      <NewBlogForm title={title} author={author} url={url} token={user.token} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App