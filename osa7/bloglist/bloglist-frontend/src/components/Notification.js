import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'


const Notification = () => {

  const notification = useSelector((state) => state.notification)



  if (notification.notification === '') {
    return null
  }


  return (
    <div>
      <div style={{ display: notification.visibleTrue?'':'none' }}>
        <Alert severity={notification.errorTrue?'error':'success'} >
          {notification.notification}
        </Alert>
      </div>
    </div>
  )
}

export default Notification