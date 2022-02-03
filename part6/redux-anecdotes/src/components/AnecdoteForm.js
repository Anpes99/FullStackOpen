
import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content, generateId());
    props.createNotification(`you created a new anecdote:  '${content}'`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {createAnecdote, createNotification}

export default connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm);
