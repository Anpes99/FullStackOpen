import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const anecdotes = useSelector((state) => state.anecdotes);
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(createNotification(`you voted '${anecdote.content}'`, 5));
  };
  return (
    <div>

      {anecdotes.sort((a, b) => b.votes - a.votes).filter((anecdote) => {
        if (filter.filter === '') { return anecdote; }
        if (anecdote.content.includes(filter.filter)) { return anecdote; }
        if (typeof filter.filter === 'function') { return anecdote; }
        return null;
      }).map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has
            {' '}
            {anecdote.votes}
            <button type="button" onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
