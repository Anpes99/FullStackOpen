import axios from 'axios'
const initialState={ Users:[] }

export const setUsers = () => {

  return async (dispatch) => {
    const res= await axios.get('/api/users')
    console.log(res.data)
    return dispatch({ type:'SET_USERS', data:{ users: res.data } })
  }
}

const usersReducer = (state=initialState, action) => {

  switch(action.type){
  case 'SET_USERS':
    return { users:action.data.users }
  default:
    return state
  }


}

export default usersReducer

