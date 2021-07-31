import loginService from '../services/login'
import { createNotification } from './notificationReducer'

const initialState = { user:null }

export const logInUser = (username, password) => {

  return async (dispatch) => {

    console.log('logging in with', username, password)
    let loggedInUser=null
    try{
      loggedInUser = await loginService.login({ username, password, })
    }
    catch(error){

      dispatch(createNotification('wrong username or password', 4, true))

      return
    }

    console.log(loggedInUser)
    window.localStorage.setItem('LoggedInBlogappUser', JSON.stringify(loggedInUser))
    return dispatch({ type:'SET_USER', data:{ user:loggedInUser } })




  }
}



const userReducer = (state=initialState, action) => {

  switch (action.type){
  case 'SET_USER':
    return { user:action.data.user }
  default:
    return state}

}

export default userReducer