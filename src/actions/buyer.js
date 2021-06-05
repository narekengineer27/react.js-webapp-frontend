import Client from "../config/api";

const endpoint = process.env.REACT_APP_ENDPOINT;

export const getAuctionSuccess = (isSuccess, data = null) => {
  return {
    type: "GET_AUCTION_SUCCESS",
    isSuccess,
    data
  };
};

export const bidAuction = data => {
  return dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    client
      .post(`${endpoint}/auction/${data.ListingId}`, { price: data.price })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getAuction = data => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);
    getAuctionSuccess(false);

    client
      .get(`${endpoint}/auction/${data.ListingId}/info`)
      .then(res => {
        dispatch(getAuctionSuccess(true, res.data.data));

        return res.data.data;
      })
      .catch(err => {
        getAuctionSuccess(false);
        console.log(err);
      });
  };
};
