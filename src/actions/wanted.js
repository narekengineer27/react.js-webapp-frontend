import Client from "../config/api";

const endpoint = process.env.REACT_APP_ENDPOINT;

export function getWantedListsSuccess(data) {
  return {
    type: "GET_WANTED_LISTS_SUCCESS",
    lists: data
  };
}

export const getWantedLists = () => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/wanted`);
      dispatch(getWantedListsSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const creatingWantedLists = wantedData => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/wanted`, wantedData);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateWantedList = (id, wantedData) => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/wanted/${id}`, wantedData);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteWantedList = id => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/wanted/${id}/delete`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};
