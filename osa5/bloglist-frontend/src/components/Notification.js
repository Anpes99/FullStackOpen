import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message,errorTrue }) => {

  Notification.propTypes = {
    errorTrue: PropTypes.bool.isRequired,
  }

  if (message === null) {
    return null
  }

  const notificationStyle={

    color:'green'
  }

  const errorStyle ={

    color:'red'
  }

  return (
    <div style={errorTrue?errorStyle:notificationStyle} className="error">
      {message}
    </div>
  )
}

export default Notification