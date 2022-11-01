export default (state, action) => {
    switch (action.type) {
      case 'JOINED':
        return {
          ...state,
          joined: true,
          userName: action.payload.userName,
          roomId: action.payload.roomId,
          time: action.payload.time,
        };
  
      case 'SET_DATA':
        return {
          ...state,
          users: action.payload.users,
          messages: action.payload.messages,
          time: action.payload.time,
        };
  
      case 'SET_USERS':
        return {
          ...state,
          users: action.payload,
        };
  
      case 'NEW_MESSAGE':
        // console.log(`act p ${action.payload.time}`)
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      default:
        return state;
    }
  };
 