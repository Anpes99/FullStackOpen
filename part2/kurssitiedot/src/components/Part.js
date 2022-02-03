import React from "react";

const Part = (props) => {
    console.log('Part komponentti käynnistyy...')
    return(
      <>
      <p>
          {props.part} {props.exercise}
        </p>
      </>
  
    )
  
  }

  export default Part