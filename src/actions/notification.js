import Client from "../config/api";
import { createNotification } from "../utils/notification";

const endpoint = process.env.REACT_APP_ENDPOINT;

export const getNotificationListSuccess = data => {
  return {
    type: "GET_NOTIFICATION_LIST_SUCCESS",
    data
  }
}

export const sendReadNotificationSuccess = id => {
  return {
    type: "SEND_READ_NOTIFICATION_SUCCESS",
    readId: id
  }
}

export const deleteNotificationSuccess = id => {
  return {
    type: "DELETE_NOTIFICATION_SUCCESS",
    deletedId: id
  }
}

export const newNotificationSuccess = data => {
  let userName = "";
  if (data.Actor) {
    userName = data.Actor.first_name + " " + data.Actor.last_name + " ";
  }
  createNotification("New Notification comes: " + userName + data.content, "defalut", "bottom-right");
  return {
    type: "RECEIVE_NEW_NOTIFICATION",
    data
  };
}

export const getNewNotificationList = type => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/notifications/${type}`)

      dispatch(getNotificationListSuccess(res.data.data))
      return res.data.data;
    } catch (e) {
      // console.log(e);
    }
  }
}

export const sendReadNotification = id => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/notifications/${id}/mark-read`)
    
      dispatch(sendReadNotificationSuccess(id))
      return res.status;
    } catch (e) {
      console.log(e);
    }
  }
}

export const deleteNotification = id => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.delete(`${endpoint}/notifications/${id}`)
      
      dispatch(deleteNotificationSuccess(id))
      return res.status;
    } catch (e) {
      console.log(e);
    }
  }
}