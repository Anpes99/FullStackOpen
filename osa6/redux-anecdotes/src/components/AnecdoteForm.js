import { useDispatch } from 'react-redux'
import {createAnecdote } from '../reducers/anecdoteReducer'
import {createNotification, hideNotification} from '../reducers/notificationReducer'




const generateId = () =>
Number((Math.random() * 1000000).toFixed(0))



const AnecdoteForm = () => {
    const dispatch = useDispatch()


const addAnecdote = (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value=''
    dispatch(createAnecdote(content, generateId() ))
    dispatch(createNotification('You added a new anecdote'))
    setTimeout(()=>dispatch(hideNotification()), 5000)
  }



    return (
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote} >
    <div><input name='anecdote'/></div>
    <button type='submit' >create</button>
  </form>
  </>
  )
}

export default AnecdoteForm