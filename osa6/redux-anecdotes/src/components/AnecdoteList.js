import {useDispatch, useSelector} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, hideNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import { setFilter } from '../reducers/filterReducer'


const AnecdoteList = ()=>{

const anecdotes = useSelector(state => state.anecdotes)
const filter = useSelector(state => state.filter)

const dispatch = useDispatch()



const vote = (id) => {
  console.log('vote', id)
  dispatch(  voteAnecdote(id)   )
  dispatch( createNotification('your vote was received'))
  
  
  setTimeout(() => {
      dispatch(hideNotification())
  }, 5000);
}
return(
<div>

{anecdotes.sort((a,b)=>b.votes-a.votes).filter(anecdote => anecdote.content.includes(filter.filter)).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  )}
</div>
  )

}

export default AnecdoteList