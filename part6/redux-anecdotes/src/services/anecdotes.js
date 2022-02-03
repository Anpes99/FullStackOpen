import axios from 'axios';

const getAll = async () => {
  const res = await axios.get('http://localhost:3001/anecdotes');
  return res.data;
};

const createAnecdote = async (content, id) => {
  const res = await axios.post('http://localhost:3001/anecdotes', { content, id, votes: 0 });
  return res;
};

const voteAnecdote = async (id) => {
  const res = await axios.get('http://localhost:3001/anecdotes');
  const anecdote = await res.data.find((anecdote1) => anecdote1.id === id);
  anecdote.votes += 1;
  const putRes = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote);
  return putRes;
};

export default { getAll, createAnecdote, voteAnecdote };
