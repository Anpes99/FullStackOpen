import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = ({courses}) => {
  console.log('Course komponentti käynnistyy....')
  return (
    
    <div>
      { courses.map(course => {
          return( 
            <div key={course.id}>
              <Header  name={course.name} id={course.id}/>
              <Content id={course.id} parts={course.parts}/>
            </div>)})
      }
    
</div>
  )
}







export default Course