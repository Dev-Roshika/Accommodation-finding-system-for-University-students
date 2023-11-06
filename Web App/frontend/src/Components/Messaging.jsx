import React from "react";

function Messaging({ currentUser, recipientUser }) {
  
  return (
    <div className="messaging-container">
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
         
        />
        <button >Send</button>
       
      </div>
    </div>
  );
}

export default Messaging;
