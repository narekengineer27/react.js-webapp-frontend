import Client from "../config/api";
import { socket } from "../index";
import { createNotification } from "../utils/notification";

const endpoint = process.env.REACT_APP_ENDPOINT;

export const getMessagesSuccess = messages => {
  return {
    type: "GET_MESSAGES_SUCCESS",
    messages
  };
};

export const receiveNewMessage = message => {
  createNotification(
    "New message comes: " + message.content,
    "defalut",
    "bottom-right"
  );
  return {
    type: "RECEIVE_NEW_MESSAGE",
    message
  };
};

export const sendNewMessageSuccess = message => {
  return {
    type: "SEND_NEW_MESSAGE_SUCCESS",
    message
  };
};

export const addContactSuccess = isAddContactSuccess => {
  return {
    type: "ADD_CONTACT_SUCCESS",
    isAddContactSuccess
  };
};

export const getContactListSuccess = contactList => {
  return {
    type: "GET_CONTACTLIST_SUCCESS",
    contactList
  };
};

export const getOnlineStatusSuccess = data => {
  return {
    type: "GET_ONLINE_STATUS_SUCCESS",
    data
  };
};

export const getUnreadMessagesSuccess = messages => {
  return {
    type: "GET_UNREADMESSAGES_SUCCESS",
    messages
  };
};

export const getOnlineStatusArraySuccess = data => {
  return {
    type: "GET_ONLINE_STATUS_ARRAY_SUCCESS",
    data
  };
};

export const getMessages = info => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/getMessages`, {
        ListingId: info.ListingId,
        opponentId: info.opponentId
      });

      dispatch(getMessagesSuccess(res.data.data.messages));

      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendNewMessage = message => {
  return dispatch => {
    socket && socket.emit("SEND_NEW_MESSAGE", message);
    dispatch(
      sendNewMessageSuccess({
        ListingId: message.ListingId,
        Sender: message.from,
        Recipient: message.to,
        content: message.message,
        time: message.time
      })
    );
  };
};

export const setMessageUserId = data => {
  return dispatch => {
    socket && socket.emit("SET_USERID", data);
  };
};

export const addContact = data => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    dispatch(addContactSuccess(false));

    try {
      const res = await client.post(`${endpoint}/addContact`, {
        ListingId: data.ListingId,
        SellerId: data.SellerId,
        content: data.content,
        time: new Date().toLocaleString()
      });

      dispatch(addContactSuccess(true));

      return res.data;
    } catch (e) {
      dispatch(addContactSuccess(false));
      console.log(e);
    }
  };
};

export const getContactList = data => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/getContactList`);

      dispatch(getContactListSuccess(res.data.data));

      return res.data;
    } catch (e) {
      // console.log(e);
    }
  };
};

export const getUnreadMessages = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);
    if (!getState().user.isAuthenticated) return
    try {
      const res = await client.get(`${endpoint}/getUnreadMessages`);

      dispatch(getUnreadMessagesSuccess(res.data.data));

      return res.data.data;
    } catch (e) {
      // console.log(e);
    }
  };
};
