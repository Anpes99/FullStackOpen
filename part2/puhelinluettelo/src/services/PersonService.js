import React from 'react'
import axios from 'axios'

const create = (newPerson)=>{

return axios.post('http://localhost:3001/persons',newPerson)

}

const getAll = ()=>{

return axios.get('http://localhost:3001/persons')

}

const remove = (id)=>{
    return axios.delete(`http://localhost:3001/persons/${id}`)

}

const update = (name,number,id)=>{
    
return (axios.put(`http://localhost:3001/persons/${id}`,{name,number,id}))

}


export default {create,getAll,remove,update}