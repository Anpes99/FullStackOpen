import React from 'react'
import Country from './Country'
import Weather from './Weather'

const DisplayCountries = ({countriesToShow,changeSearch,weather})=>{
    
    

 
   
    

if (countriesToShow.length<11 && countriesToShow.length>1){

return(

    <div>{countriesToShow.map(country => <div key={country.name}><p >{country.name}</p><button onClick={()=>changeSearch(country.name)}>Show</button></div>)}</div>

)
}
if (countriesToShow.length===1){
    return(

        <div>

<Country countriesToShow={countriesToShow}/>

<Weather countriesToShow={countriesToShow} weather={weather}/>



        </div>



    )
}
else return(<p>Too many matches, specify another filter</p>)
}

export default DisplayCountries