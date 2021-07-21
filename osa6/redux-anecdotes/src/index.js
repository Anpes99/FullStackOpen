import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import App from './App'
import store from './store'

import { initAnecdotes } from './reducers/anecdoteReducer'



    store.dispatch(initAnecdotes())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)