
const initialState={notification:'Add more anecdotes..', visibleTrue:false}

export const createNotification = (message) =>{
    return {type:'NEW_NOTIFICATION', data:{notification:message}}
}

export const hideNotification = () =>{
    return {type:'SET_VISIBLE', data:{visibleTrue:false}}
}

const notificationReducer = (state=initialState, action) =>{

    if (action.type ='NEW_NOTIFICATION'){
        if (action.data)
        {let notification = action.data.notification
        return {notification:notification, visibleTrue:true}}
    }

    if (action.type= 'SET_VISIBLE'){
       if (action.data) {return {notification:state.notification, visibleTrue:action.data.visibleTrue}}
    }



    return state
}

export default notificationReducer