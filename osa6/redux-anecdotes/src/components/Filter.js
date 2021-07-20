import React from 'react'
import { useDispatch } from 'react-redux'
import {setFilter} from '../reducers/filterReducer'


const Filter = () => {

const dispatch = useDispatch()

  const handleChange = (event) => {
      if(event.target.value !== null){
      dispatch(setFilter(event.target.value))}
    // input-kentän arvo muuttujassa event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input id='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter