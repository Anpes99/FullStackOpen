import React,{ useState,useEffect} from 'react'
import Addperson from './components/Addperson'
import ShowNumbers from './components/ShowNumbers'
import FilterNumbers from './components/FilterNumbers'
import PersonService from './services/PersonService'
import './index.css'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [newNumber,setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorTrue, setErrorTrue] = useState(false)

    useEffect(() => {
      console.log('effect')
      PersonService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })
    }, [])

    const handleSubmitName = (event) =>{
        event.preventDefault()
        const newPerson ={name : newName, number:newNumber}
        let nameIn=false
        for (let index = 0; index < persons.length; index++) {
            if (persons[index].name === newName){nameIn=true}
            
        }
        if (nameIn){
          const p= persons.find(p=>p.name ===newName)
          if (p.number!==newNumber){
              const replaceConfirm=window.confirm("This person is already added to phonebook Would you like to replace the number?")
              if (replaceConfirm){
                        PersonService.update(p.name,newNumber,p.id)
                                        .then(()=> {setErrorMessage( `Number changed succesfully`)} )
                                        .catch(() => 
                                            {
                                              setErrorTrue(true)
                                              setErrorMessage("Error: That person was already deleted from the phonebook")
                                              setPersons(persons.filter(person=>person.id!==p.id))
                                              }
                                            )
                        setTimeout(() => {
                          setErrorMessage(null)
                          setErrorTrue(false)
                        }, 5000)
                      }


              else window.alert(`${newName} is already added to phonebook`)}  
            }
         
        else {
          PersonService
                      .create(newPerson)
                      .then(response=> 
                        {
                        setPersons(persons.concat(response.data))
                        setErrorMessage( `Person added succesfully`)
                        setTimeout(() =>
                         {
                            setErrorMessage(null)
                          }, 5000)
                        })
                      .catch(error=>{console.log("error in handleSubmitName")})
          
      }
    }

    const handleOnChangeName = (event) =>{

        setNewName(event.target.value)
    }
    const handleOnChangeNumber = (event) =>{

        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) =>{

        setFilter(event.target.value)
    }

    const handleRemovePerson = (id)=>{

      const promise =PersonService.remove(id)
      promise.then(()=> {
                          
      setErrorMessage(
        `Person removed succesfully`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)})
    }
    

    return (
      <div>
        <h1>Phonebook</h1>
        <Notification message={errorMessage} errorTrue={errorTrue}/>
        <FilterNumbers handleFilterChange={handleFilterChange}/>
                
        <Addperson newName={newName} newNumber={newNumber} handleOnChangeName={handleOnChangeName} handleOnChangeNumber={handleOnChangeNumber} handleSubmitName={handleSubmitName} />
               

        {console.log('return')}
        <h2>Numbers</h2>
        <ShowNumbers persons={persons} remove={(id)=>{handleRemovePerson(id)}} newFilter={newFilter}  setPersons={(a)=>setPersons(a)}/>
      </div>
    )
  
  }

export default App