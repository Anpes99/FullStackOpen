import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(10+1).join('0').split('').map(parseFloat))
  

  const generateAnecdote = () =>{
    const rndNumber = Math.floor(Math.random() * Math.floor(6))
    setSelected(rndNumber)

  }
  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}



  const voteAnecdote = () =>{ 
    
    let votesCopy =[...points]
    votesCopy[selected] += 1
    setPoints(votesCopy)
  }

  return (
    <div>
      <Button handleClick={generateAnecdote} text="Generate anecdote"/>
      <Button handleClick={voteAnecdote} text="Vote"/>
      <div>{anecdotes[selected]}</div>
      <h4>{points[selected]}</h4>

      <>
        <h2>anecdote with most votes</h2>
        {anecdotes[indexOfMax(points)]}
        <h4>{points[indexOfMax(points)]}</h4>
      </>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



const Button = ({handleClick, text}) => {
  
  return(

    <><button onClick={handleClick} >{text}</button></>

  )

}

ReactDOM.render(
  <App  />,
  document.getElementById('root')
)