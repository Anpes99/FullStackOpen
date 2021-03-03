import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    
    <div>
      <h1> Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="Good"></Button>
      
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
      
      <Button handleClick={() => setBad(bad + 1)} text="Bad"></Button>
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if (good!==0 || neutral !==0 || bad!==0){
return(

<div><h1>Statistics</h1>
<table>
      <StatisticsLine text="Good" value={good}/>
      <StatisticsLine text="Neutral" value={neutral}/>
      <StatisticsLine text="Bad" value={bad}/>
      <StatisticsLine text="All" value={good+neutral+bad}/>
      <StatisticsLine text="Average" value={((good+neutral*0+bad*(-1))/(good+neutral+bad))}/>
      <StatisticsLine text="Positive" value={(good/(good+neutral+bad))*100+" %"}/>
</table>
      
      </div>


)
}
return (

  <div><h3>No feedback given</h3></div>
)
}

const StatisticsLine = ({text,value}) =>
<>
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
</>

const Button = (props) => {

  return (
    <><button onClick={props.handleClick}> {props.text}</button></>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)