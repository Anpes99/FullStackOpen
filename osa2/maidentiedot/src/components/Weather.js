import React from 'react'

const Weather = ({countriesToShow,weather})=>{


console.log(weather)
return(

<>
    <h3>Weather in {countriesToShow[0].capital}</h3>
    
    <h4>temperature: {weather.current?.temperature}   °C</h4>
    
    <h4>wind: {weather.current?.wind_speed}   km/h</h4>
    
    </>
)


}

export default Weather