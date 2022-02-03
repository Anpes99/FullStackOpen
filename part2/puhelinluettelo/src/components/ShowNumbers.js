import React from 'react'

const ShowNumbers = ({persons,newFilter,remove,setPersons}) => {


return(
<div>
    {(persons?.filter(person => person.name.toLowerCase().includes((newFilter).toLowerCase()))).map(person =>
             <div key={person.name}>
                <p >{person.name} {person.number}</p>
                    <button onClick={()=>
                            {
                                const confirmDelete = window.confirm("Do you really want to delete "+ person.name+" from the list?")
                                if (confirmDelete) {
                                    const id=person.id
                                    remove(person.id)
                                setPersons(persons.filter(p=>p.id!==id))
                                }
                            }
                        }
                    >X</button>
            </div>)}
</div>)



}

export default ShowNumbers