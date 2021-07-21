import {useDispatch, useSelector} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, hideNotification } from '../reducers/notificationReducer'



const AnecdoteList = ()=>{

const anecdotes = useSelector(state => state.anecdotes)
const filter = useSelector(state => state.filter)

const dispatch = useDispatch()



const vote = (id) => {
  console.log('vote', id)
  dispatch(  voteAnecdote(id)   )
  const anecdote = anecdotes.find(a=> a.id ===id)
  dispatch(createNotification(`you voted '${anecdote.content}'`, 10))
  
  
}
return(
<div>

{anecdotes.sort((a,b)=>b.votes-a.votes).filter(anecdote => {
    if (filter.filter = ''){return anecdote};
    if (anecdote.content.includes(filter.filter)){return anecdote};
}).map(anecdote =>
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