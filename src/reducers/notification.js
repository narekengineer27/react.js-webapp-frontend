const initialNotificaionData = {
  notificationList: [],
  unreadCount: 0
};

const notification = (state = initialNotificaionData, action) => {
  let list = [];
  let currentList = state.notificationList;

  switch (action.type) {
    case "RECEIVE_NEW_NOTIFICATION":
      return {
        ...state,
        notificationList: [action.data, ...state.notificationList],
        unreadCount: state.unreadCount + 1
      };
    case "GET_NOTIFICATION_LIST_SUCCESS":
      return {
        ...state,
        notificationList: action.data.notifications,
        unreadCount: action.data.unreadCount
      };
    case "SEND_READ_NOTIFICATION_SUCCESS":
      currentList.map((item) => {
        if (item.UserNotificationId === action.readId) {
          let newItem = { ...item, read: true };
          list.push(newItem);
        } else list.push(item);
        return list;
      });

      return {
        ...state,
        notificationList: list,
        unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0
      };
    case "DELETE_NOTIFICATION_SUCCESS":
      list = currentList.filter(
        item => item.UserNotificationId !== action.deletedId
      );

      return {
        ...state,
        notificationList: list,
        unreadCount: state.unreadCount > 0 ? state.unreadCount - 1 : 0
      };
    default:
      return state;
  }
};

export default notification;
