const initialMessageData = {
  contactList: [],
  messages: [],
  unreadMessages: [],
  isAddContactSuccess: false,
  currentOpponentOnlineStatus: false,
  currentBidderArrayOnlineStatus: []
};

const newContactList = (contactList, newMsg) => {
  let newContactList = [...contactList];

  newContactList.forEach((contact, index) => {
    if (
      contact.ListingId === newMsg.ListingId &&
      ((contact.SellerId === newMsg.Sender &&
        contact.CustomerId === newMsg.Recipient) ||
        (contact.SellerId === newMsg.Recipient &&
          contact.CustomerId === newMsg.Sender))
    ) {
      newContactList[index].Message = newMsg;
    }
  });

  return newContactList;
};

const message = (state = initialMessageData, action) => {
  switch (action.type) {
    case "GET_MESSAGES_SUCCESS":
      return {
        ...state,
        messages: action.messages
      };
    case "GET_UNREADMESSAGES_SUCCESS":
      return {
        ...state,
        unreadMessages: action.messages
      };
    case "RECEIVE_NEW_MESSAGE":
      return {
        ...state,
        contactList: newContactList(state.contactList, action.message),
        messages: [...state.messages, action.message],
        unreadMessages: [...state.unreadMessages, action.message]
      };
    case "SEND_NEW_MESSAGE_SUCCESS":
      return {
        ...state,
        contactList: newContactList(state.contactList, action.message),
        messages: [...state.messages, action.message]
      };
    case "ADD_CONTACT_SUCCESS":
      return {
        ...state,
        isAddContactSuccess: action.isAddContactSuccess
      };
    case "GET_CONTACTLIST_SUCCESS":
      return {
        ...state,
        contactList: action.contactList
      };
    case "GET_ONLINE_STATUS_SUCCESS":
      return {
        ...state,
        currentOpponentOnlineStatus: action.data.status
      };
    case "GET_ONLINE_STATUS_ARRAY_SUCCESS":
      return {
        ...state,
        currentBidderArrayOnlineStatus: action.data
      };
    default:
      return state;
  }
};

export default message;
