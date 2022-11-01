import React from 'react';
import axios from 'axios';

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const time = new Date().toLocaleTimeString();
  // console.log(time)

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Wrong data!');
    }
    const obj = {
      roomId,
      userName
    };
    // console.log(obj)
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="startpage">
      <h2 className="start-text">Welcome to chat! Please enter the number of the room (Room ID) you want to enter and Your name! </h2>
        <input
          className="join-block-RoomID"
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          className="join-block-Name"
          type="text"
          placeholder="Your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button 
        disabled={isLoading} 
        onClick={onEnter} 
        className="join-block-button">
          {isLoading ? 'JOIN...' : 'JOIN'}
        </button>
    </div>
  );
}

export default JoinBlock;