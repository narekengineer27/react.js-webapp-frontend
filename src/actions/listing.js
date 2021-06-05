import Client from "../config/api";
import { createNotification } from "../utils/notification";

const endpoint = process.env.REACT_APP_ENDPOINT;

export function getListingPropertiesSuccess(data) {
  return {
    type: "GET_LISTING_PROPERTIES_SUCCESS",
    listingProperties: data
  };
}

export function setListingsData(listings) {
  return dispatch => {
    dispatch(getListingsSuccess(listings));
  };
}

export function getListingsSuccess(data) {
  return {
    type: "GET_LISTINGS_SUCCESS",
    listings: data
  };
}

export function getListingSuccess(data) {
  return {
    type: "GET_LISTING_SUCCESS",
    currentListing: data
  };
}

export function setCreateNewListingSuccess(status) {
  return {
    type: "SET_CREATE_LISTING_SUCCESS",
    isSuccess: status
  };
}

export function creatingNewListing(status) {
  return {
    type: "CREATING_NEW_LISTING",
    isCreatingListing: status
  };
}

export function setEditListingSuccess(status) {
  return {
    type: "SET_EDIT_LISTING_SUCCESS",
    isSuccess: status
  };
}

export function editListing(status) {
  return {
    type: "EDIT_LISTING",
    isEditListing: status
  };
}

export function getListingsByUserIdSuccess(data) {
  return {
    type: "GET_LISTINGS_BY_USERID_SUCCESS",
    currentListingsByUserId: data
  };
}

export function getListingsByCategoryIdSuccess(data) {
  return {
    type: "GET_LISTINGS_BY_CATEGORYID_SUCCESS",
    currentListingsByCategoryId: data
  };
}

export function getExchangeRatesSuccess(data) {
  return {
    type: "GET_EXCHANGE_RATES_SUCCESS",
    exchangeRates: data
  };
}

export function getSomeListingsByContentSuccess(data) {
  return {
    type: "GET_SOME_LISTINGS_BY_CONTENT_SUCCESS",
    currentSomeListingsByContent: data
  };
}

export function getAllListingsByContentSuccess(data) {
  return {
    type: "GET_ALL_LISTINGS_BY_CONTENT_SUCCESS",
    currentAllListingsByContent: data
  };
}

export function getCurrenciesSuccess(data) {
  return {
    type: "GET_CURRENCIES_SUCCESS",
    currencies: data
  };
}

export function getSomeListingsByPeopleSuccess(data) {
  return {
    type: "GET_SOME_LISTINGS_BY_PEOPLE_SUCCESS",
    currentSomeListingsByPeople: data
  };
}

export function getAllListingsByPeopleSuccess(data) {
  return {
    type: "GET_ALL_LISTINGS_BY_PEOPLE_SUCCESS",
    currentAllListingsByPeople: data
  };
}

export function gettingListingsByWishList(status) {
  return {
    type: "GETTING_LISTINGS_BY_WISHLIST",
    isGettingListingsByWishList: status
  };
}
export function getListingsByWishListSuccess(data) {
  return {
    type: "GET_LISTINGS_BY_WISHLIST_SUCCESS",
    currentListingsByWishList: data
  };
}

// Get Listing Properties
// -----------------------------------------------------------------------------
export const getListingProperties = userInfo => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const data = await client.get(
        `${endpoint}/listings/properties`,
        userInfo
      );
      dispatch(getListingPropertiesSuccess(data.data.data));
      return data.data;
    } catch (e) {
      // console.log(e);
    }
  };
};

// Post A New Listing
// -----------------------------------------------------------------------------
export const createNewListing = newListing => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");

    const client = Client(token);
    const headers = {
      "Content-Type": "multipart/form-data"
    };

    dispatch(creatingNewListing(true));
    dispatch(setCreateNewListingSuccess(false));

    try {
      const res = await client.post(
        `${endpoint}/listings`,
        newListing,
        headers
      );
      dispatch(creatingNewListing(false));
      if (res.data.status === true) {
        dispatch(setCreateNewListingSuccess(true));
        createNotification("New Listing created successfully");
        return res.data.data;
      } else {
        dispatch(setCreateNewListingSuccess(false));
        createNotification("Creating A New Listing failed!", "info");
      }
    } catch (err) {
      dispatch(setCreateNewListingSuccess(false));
      dispatch(creatingNewListing(false));
      createNotification("Creating A New Listing failed!", "info");
      console.log(err);
    }
  };
};

// Put A Listing
// -----------------------------------------------------------------------------
export const editCurrentListing = (newListing, listingId) => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");

    const client = Client(token);
    const headers = {
      "Content-Type": "multipart/form-data"
    };

    dispatch(editListing(true));
    dispatch(setEditListingSuccess(false));

    try {
      const res = await client.post(
        `${endpoint}/listings/${listingId}`,
        newListing,
        headers
      );
      dispatch(editListing(false));
      if (res.data.status === true) {
        dispatch(setEditListingSuccess(true));
        createNotification("Listing is updated successfully");
        return res.data.data;
      } else {
        dispatch(setEditListingSuccess(false));
        createNotification("Update current Listing failed!", "info");
      }
    } catch (err) {
      dispatch(setEditListingSuccess(false));
      dispatch(editListing(false));
      createNotification("Update current Listing failed!", "info");
      console.log(err);
    }
  };
};

// Get Listings
// -----------------------------------------------------------------------------
export const getListings = filterInfo => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(
        `${endpoint}/listings/getListings`,
        filterInfo
      );
      dispatch(getListingsSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      // console.log(e);
    }
  };
};

export const getListing = id => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/listings/${id}`);
      dispatch(getListingSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

//Get Exchange Rates
// -------------------------------------------------------------------------------
export const getExchangeRates = (from, to) => {
  return async dispatch => {
    const client = Client();
    try {
      const res = await client.get("https://api.exchangeratesapi.io/latest");
      dispatch(getExchangeRatesSuccess(res.data.rates));
      return res.data.rates;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getListingsByUserId = ({ userId, productIdSelected }) => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/users/${userId}/listings/${productIdSelected}`
      );
      dispatch(getListingsByUserIdSuccess(res.data.data));
      dispatch(getListingSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getListingsByCategoryId = ({ categoryId, productIdSelected }) => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/categories/${categoryId}/listings/${productIdSelected}`
      );
      dispatch(getListingsByCategoryIdSuccess(res.data.data));
      dispatch(getListingSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getSomeListingsByContent = content => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/listings/search/some?content=${content}`
      );
      dispatch(getSomeListingsByContentSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllListingsByContent = content => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/listings/search/all?content=${content}`
      );
      dispatch(getAllListingsByContentSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getCurrencies = () => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/currencies`);
      dispatch(getCurrenciesSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getSomeListingsByPeople = people => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/users/search/some?content=${people}`
      );
      dispatch(getSomeListingsByPeopleSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllListingsByPeople = people => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(
        `${endpoint}/users/search/all?content=${people}`
      );
      dispatch(getAllListingsByPeopleSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllListingsByUserId = userId => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/users/${userId}/listings`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const sendWishStatus = id => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.post(`${endpoint}/wishlist/${id}`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getListingsByWishList = () => {
  return async dispatch => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/wishlist`);
      dispatch(getListingsByWishListSuccess(res.data.data));
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const getOrderedListings = () => {
  return async () => {
    const token = localStorage.getItem("plastplace_token");
    const client = Client(token);

    try {
      const res = await client.get(`${endpoint}/myorders`);
      
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  };
};
