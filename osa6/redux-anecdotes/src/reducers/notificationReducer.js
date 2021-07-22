const initialState = { notification: 'Add more anecdotes..', visibleTrue: false };

let notificationTimeout;

export const hideNotification = () => ({ type: 'SET_VISIBLE', data: { visibleTrue: false } });

export const createNotification = (message, visibleTime) => async (dispatch) => {
  dispatch({ type: 'NEW_NOTIFICATION', data: { notification: message } });
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => dispatch(hideNotification()), visibleTime * 1000);
};

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'NEW_NOTIFICATION') {
    if (action.data) {
      const { notification } = action.data;
      return { notification, visibleTrue: true };
    }
  }

  if (action.type === 'SET_VISIBLE') {
    if (action.data) {
      return { notification: state.notification, visibleTrue: action.data.visibleTrue };
    }
  }

  return state;
};

export default notificationReducer;
