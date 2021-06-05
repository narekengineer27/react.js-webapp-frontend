import io from "socket.io-client";
import {
  receiveNewMessage,
  getOnlineStatusSuccess,
  getContactList,
  getOnlineStatusArraySuccess
} from "../../actions/message";
import { newNotificationSuccess } from "../../actions/notification";

let endpoint = process.env.REACT_APP_ENDPOINT;
endpoint = endpoint.slice(0, -3);

const socket = io(endpoint);

const configureSocket = dispatch => {
  socket.on("connected", () => {
    console.log("connected");
  });

  socket.on("RECEIVE_NEW_MESSAGE", data => {
    dispatch(receiveNewMessage(data));
    if (data.isNewContact) dispatch(getContactList());
  });

  socket.on("GET_ONLINE_STATUS", data => {
    dispatch(getOnlineStatusSuccess(data));
  });

  socket.on("GET_ONLINE_STATUS_ARRAY", data => {
    dispatch(getOnlineStatusArraySuccess(data));
  });

  socket.on("NEW_NOTIFICATION", data => {
    dispatch(newNotificationSuccess(data));
  });

  return socket;
};

export const sendNewMessage = data => {
  socket.emit("SEND_NEW_MESSAGE", data);
};

export const sendGetOnlineStatusRequest = data => {
  socket.emit("SEND_GET_ONLINE_STATUS_REQUEST", data);
};

export const sendGetOnlineStatusArrayRequest = data => {
  socket.emit("SEND_GET_ONLINE_STATUS_ARRAY_REQUEST", data);
};

export default configureSocket;
