import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="view" onClick={toggleVisibility} >{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='moreInfoToggled'>
        {props.children}
        <Button variant='contained' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

export default Togglable