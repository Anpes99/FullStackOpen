import anecdoteService from '../services/anecdotes'




const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    
    dispatch({type: 'INIT_ANECDOTES', data:anecdotes})
  }
}

export const voteAnecdote = (id) =>{
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({type:'VOTE',id:id})}
}

export const createAnecdote = (content) =>{
  const id = getId()
  return async dispatch =>{
    await anecdoteService.createAnecdote(content, id)
    dispatch({type:'NEW_ANECDOTE', data:{content, id }})
  }
}

let initialState = []


const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === 'VOTE'){
    let arr = [...state]
    if (action.id)
    {
    let index = arr.findIndex(a => a.id === action.id)
    arr[index].votes += 1 }

    return [...arr]
  }

  if (action.type === 'NEW_ANECDOTE'){
    
    if(action.data){
      
    return [...state, {content:action.data.content, id:action.data.id, votes:0 }]
  }
  }

  if(action.type === 'INIT_ANECDOTES'){
    if(action.data){
      return action.data
    }
  }
  return state
}

export default reducer