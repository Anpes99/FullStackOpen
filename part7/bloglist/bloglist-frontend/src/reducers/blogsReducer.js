import blogService from '../services/blogs'


const initialState= []

export const setBlogs = (blogs) => {
  return { type:'SET_BLOGS', data:{ blogs } }
}

export const createBlog = (title, author, url , token) => {

  return async (dispatch) => {
    const res= await blogService.createBlog(title,author,url,token)
    console.log('@@@@@response to creating a blog :: ',res)
    dispatch({ type:'ADD_BLOG', data:{ newBlog:res } })}

}

export const likeBlog = (blog, blogs) => {
  const id = blog.id
  const updatedLikes=blog.likes+1
  blogService.updateBlog(id, { likes:updatedLikes })
  const index=blogs.findIndex(b => b.id === id)
  let blogarray = blogs
  blogarray[index].likes = updatedLikes
  return { type:'SET_BLOGS', data:{ blogs:[...blogarray] } }
}

export const deleteBlog = (blog, token) => {
  console.log('here')
  return async (dispatch) => {
    console.log('here')
    await blogService.deleteBlog(blog.id, token)
    dispatch({ type:'DELETE_BLOG', data:{ blog } })
  }
}

const blogsReducer = (state=initialState, action) => {


  switch (action.type){
  case 'SET_BLOGS':
    return action.data.blogs
  case 'ADD_BLOG':

    return [...state, action.data.newBlog]
  case 'DELETE_BLOG':
    var stateCopy = state.blogs.filter(b => b.id !== action.data.blog.id)
    return [...stateCopy]
  default:
    return state
  }

}


export default blogsReducer