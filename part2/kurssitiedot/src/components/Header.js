import React from "react";

const Header = (props) =>{
    console.log("Header komponentti käynnistyy...")
  return(
    
    <>
    <h4>{props.name} #{props.id}</h4>
    </>
  )
  }

  export default Header