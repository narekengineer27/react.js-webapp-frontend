const initialData = {
  isGetAuctionSuccess: false,
  currentAuction: null
};

const buyer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_AUCTION_SUCCESS":
      return {
        ...state,
        isGetAuctionSuccess: action.isSuccess,
        currentAuction: action.data
          ? { ...action.data, bidders: [...action.data.bidders.reverse()] }
          : null
      };
    default:
      return state;
  }
};

export default buyer;
