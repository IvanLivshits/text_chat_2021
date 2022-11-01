import React from 'react';
import axios from 'axios';

import socket from './socket';

import reducer from './reducer';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';

function App() {

  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    time: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    // console.log(data)
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message, time) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };


  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
    // socket.on('ROOM:NEW_MESSAGE', addTimer);
  }, []);

  window.socket = socket;

  return (
    <div>
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;