import React from 'react'

const Addperson = (props) =>{

console.log('AddPerson props :  ....',{props})
return(
    <div>
        <form onSubmit={props.handleSubmitName}>
            <div>name: <input onChange={props.handleOnChangeName} value={props.newName} /></div>
            <div>number: <input onChange={props.handleOnChangeNumber} value={props.newNumber} /></div>
            <div><button type="submit">add number</button></div>
            
        </form></div>
)

}


export default Addperson