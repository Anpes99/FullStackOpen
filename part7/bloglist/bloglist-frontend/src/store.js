import thunk from 'redux-thunk'
import { createStore,  applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  loggedInUser: userReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store