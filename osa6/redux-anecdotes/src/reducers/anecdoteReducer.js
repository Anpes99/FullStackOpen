const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes =(state) => {
  let arr = [...state]
  arr=arr.sort((a,b)=>b.votes-a.votes)
return [...arr]
}

export const voteAnecdote = (id) =>{
  return {type:'VOTE',id:id}
}

export const createAnecdote = (content, id) =>{
  return {type:'NEW_ANECDOTE', data:{content, id}}
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  if (action.type === 'VOTE'){
    let arr = [...state]
    if (action.id)
    {
    let index = arr.findIndex(a => a.id === action.id)
    arr[index].votes += 1 }

    return sortAnecdotes([...arr])
  }

  if (action.type === 'NEW_ANECDOTE'){
    if(action.data){
    return sortAnecdotes([...state, {content:action.data.content, id:action.data.id, votes:0 }])
  }
  }
  return state
}

export default reducer