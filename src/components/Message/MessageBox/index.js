import React from "react";

const MessageBox = props => {
  const {
    myId,
    messages,
    setBoxRef,
    currentOpponent,
    currentListingId
  } = props;

  return (
    <div
      className="messages-show-box"
      ref={boxRef => {
        if (boxRef) setBoxRef(boxRef);
      }}
    >
      {messages.map((message, index) => {
        return currentListingId === message.ListingId ? (
          myId === message.Sender ? (
            <div key={index}>{renderMyMessage(message)}</div>
          ) : myId === message.Recipient ? (
            <div key={index}>
              {renderOpponentMessage(message, currentOpponent)}
            </div>
          ) : null
        ) : null;
      })}
    </div>
  );
};

const renderMyMessage = message => (
  <div className="my-message-container">
    <div className="my-message-inner-container">
      <div className="my-message-content">{message.content}</div>
      <div className="my-message-time">
        {getTimePassed(message.createdAt ? message.createdAt : message.time)}
      </div>
    </div>
  </div>
);

const renderOpponentMessage = (message, currentOpponent) => {
  let opponentContractedName = null;

  if (currentOpponent) {
    opponentContractedName =
      currentOpponent.first_name.charAt(0).toUpperCase() +
      currentOpponent.last_name.charAt(0).toUpperCase();
  }

  return (
    <div className="opponent-message-container">
      <div className="opponent-avatar">{opponentContractedName}</div>
      <div className="opponent-message-inner-container">
        <div className="opponent-message-content">{message.content}</div>
        <div className="opponent-message-time">
          {getTimePassed(message.createdAt ? message.createdAt : message.time)}
        </div>
      </div>
    </div>
  );
};

const getTimePassed = dt => {
  let time;
  let date = new Date(dt);
  let now = new Date();

  let period = (now - date) / 1000;

  if (period < 60) time = "Just Now";
  else if (period < 60 * 60)
    time =
      Math.floor(period / 60) +
      (Math.floor(period / 60) === 1 ? " minute ago" : " minutes ago");
  else if (period < 60 * 60 * 24)
    time =
      Math.floor(period / (60 * 60)) +
      (Math.floor(period / (60 * 60)) === 1 ? " hour ago" : " hours ago");
  else if (period < 60 * 60 * 24 * 8)
    time =
      Math.floor(period / (60 * 60 * 24)) +
      (Math.floor(period / (60 * 60 * 24)) === 1 ? " day ago" : " days ago");
  else time = date.toLocaleDateString();

  return time;
};

export default MessageBox;
