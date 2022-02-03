import React from "react";
import Part from './Part'

const Content = ({parts}) =>{
    console.log("Content komponentti käynnistyy...")

    

    let sumOfExercises= parts.reduce((sum,p) => sum+p.exercises,0 )

    return(
      <>

      {parts.map(part => {
          return(<div key={part.id}>< Part part={part.name} exercise={part.exercises}/></div>)

      })}

      <h4>total of {sumOfExercises} exercises</h4>
      </>
  
    )
  }

  export default Content