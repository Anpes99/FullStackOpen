
import React from 'react'

const FilterNumbers = ({handleFilterChange,newFilter}) => {


return(
<div>
<p>filter shown with </p><input value={newFilter} onChange={handleFilterChange}/>
</div>)



}

export default FilterNumbers