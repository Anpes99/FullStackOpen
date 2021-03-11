import React from 'react'

const Country = ({countriesToShow})=>{


return(


    <>
<div>
<h2>{countriesToShow[0].name}</h2>
<p>Capital:  {countriesToShow[0].capital}</p>
<p>Population:   {countriesToShow[0].population}</p>
<h3>Languages</h3>
{countriesToShow[0].languages.map(language => <p key={language.name}>{language.name}</p>)}
</div>

<img alt="country flag"src={countriesToShow[0].flag} width="150" height="100"/>
</>
)

}

export default Country