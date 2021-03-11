import React, {useState, useEffect} from 'react';
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

function App() {
  const [weather,setWeather] = useState([])
  const [newSearch, setSearch] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])
  const [countriesData, setCountriesData] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  
 

  useEffect(()=>{
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountriesData(response.data)
        })},[])

    const handleSearchChange= (event) =>{

        setSearch(event.target.value)
        setCountriesToShow(countriesData.filter(country => (country.name).toLowerCase().includes((event.target.value).toLowerCase())))
    }
    const handleCountryButtonClick = (countryName) =>{
     setSearch(countryName)
      setCountriesToShow(countriesData.filter(country=>country.name.toLowerCase() ===countryName.toLowerCase()))
  
    }
    useEffect(()=> {if (countriesToShow.length===1){axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesToShow[0].capital}`).then(response =>{ setWeather(response.data);console.log(response.data)})}}
,[newSearch])
  return (

<div>

<input type="text"id="countryInput" value={newSearch} onChange={handleSearchChange}/>

<div>
<DisplayCountries countriesToShow={countriesToShow} weather={weather} changeSearch={a => handleCountryButtonClick(a)}/>


</div>

</div>

  )



}

export default App;
