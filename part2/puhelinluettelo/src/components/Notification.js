import React from 'react'
import reactDom from 'react-dom'

const Notification = ({ message,errorTrue }) => {
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