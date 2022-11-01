import React from 'react';
import socket from '../socket';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
function Chat({ users, messages, userName, roomId, onAddMessage }) {
  
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    const time = `${new Date().toString()}`
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
      time,
    });
    onAddMessage({ userName, time, text: messageValue });
    setMessageValue('');
  };
  // console.log(userName)
  // console.log(roomId)
  // console.log(time)

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Room: <b>{roomId}</b>
        <hr />
        <b>Online ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => 
            <div>
              <div className="message">
                <div>
                  <span>{message.userName}</span>
                </div>
                <p>{message.text}</p>
                <div>
                  <span>{message.time}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <Button onClick={onSendMessage} variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;