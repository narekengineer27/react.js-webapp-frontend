import React from "react";

const Contact = props => {
  const { contact, onClickContact, opponentName, isCurrent } = props;
  let listingTitle;
  let createdDate = getDate(contact.createdAt);

  if (contact.Listing) listingTitle = contact.Listing.title;

  return (
    <div
      className="contact-container"
      onClick={onClickContact(contact)}
      style={isCurrent ? { background: "#f1f1f1" } : {}}
    >
      <span className="contact-date">{createdDate}</span>
      <span className="contact-profile">
        {renderImage(contact.Listing.ListingImage)}
        {renderProfile(contact, listingTitle, opponentName)}
      </span>
      {props.unreadMessagesCount > 0 ? (
        <span className="contact-unreadmessages">
          {props.unreadMessagesCount}
        </span>
      ) : null}
    </div>
  );
};

const getDate = dt => {
  let date = new Date(dt);

  let hour = getFormatNumber(date.getHours());
  let min = getFormatNumber(date.getMinutes());
  let year = date.getFullYear();
  let month = getFormatNumber(date.getMonth() + 1);
  let day = getFormatNumber(date.getDate());

  return `${hour}:${min} ${month}/${day}/${year}`;
};

const getFormatNumber = num => (num < 10 ? "0" : "") + num;

const renderImage = src => (
  <img className="contact-profile-avatar" src={src} alt="" />
);

const renderProfile = (contact, listingTitle, opponentName) => (
  <span className="contact-profile-text">
    <span className="contact-listing-name">{listingTitle}</span>
    <span className="contact-opponent-name-container">
      <span className="contact-opponet-name">{opponentName}</span>
    </span>
    <span className="contact-last-message">
      {contact.Message ? contact.Message.content : null}
    </span>
  </span>
);

export default Contact;
