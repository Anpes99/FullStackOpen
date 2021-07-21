import axios from 'axios'


const getAll = async () => {

    const res = await axios.get('http://localhost:3001/anecdotes')
    return res.data
}

const createAnecdote = async (content, id) =>{

    const res = await axios.post('http://localhost:3001/anecdotes', {content, id, votes:0})
    return res
}

const voteAnecdote = async (id) =>{
    const res = await axios.get('http://localhost:3001/anecdotes')
    const anecdote = await res.data.find(anecdote=> anecdote.id === id)
    anecdote.votes+=1
    return await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
}

export default {getAll, createAnecdote, voteAnecdote}