const initialUserData = {
  listingProperties: {},
  isCreateListingSuccess: false,
  isCreatingListing: false,
  isEditListingSuccess: false,
  isEditListing: false,
  listings: [],
  currentListing: null,
  currentListingsByUserId: [],
  currentListingsByCategoryId: [],
  currentSomeListingsByContent: [],
  currentAllListingsByContent: [],
  exchangeRates: null,
  currencies: [],
  currentListingsByWishList: []
};

const listing = (state = initialUserData, action) => {
  switch (action.type) {
    case "GET_LISTING_PROPERTIES_SUCCESS":
      return {
        ...state,
        listingProperties: action.listingProperties
      };
    case "SET_CREATE_LISTING_SUCCESS":
      return {
        ...state,
        isCreateListingSuccess: action.isSuccess
      };
    case "CREATING_NEW_LISTING":
      return {
        ...state,
        isCreatingListing: action.isCreatingListing
      };
    case "SET_EDIT_LISTING_SUCCESS":
      return {
        ...state,
        isEditListingSuccess: action.isSuccess
      };
    case "EDIT_LISTING":
      return {
        ...state,
        isEditListing: action.isEditListing
      };
    case "GET_LISTINGS_SUCCESS":
      return {
        ...state,
        listings: action.listings
      };
    case "GET_LISTING_SUCCESS":
      return {
        ...state,
        currentListing: action.listing
      };
    case "GET_LISTINGS_BY_USERID_SUCCESS":
      return {
        ...state,
        currentListingsByUserId: action.currentListingsByUserId,
        listings: action.currentListingsByUserId
      };
    case "GET_LISTINGS_BY_CATEGORYID_SUCCESS":
      return {
        ...state,
        currentListingsByCategoryId: action.currentListingsByCategoryId,
        listings: action.currentListingsByCategoryId
      };
    case "GET_SOME_LISTINGS_BY_CONTENT_SUCCESS":
      return {
        ...state,
        currentSomeListingsByContent: action.currentListingsByContent
      };
    case "GET_ALL_LISTINGS_BY_CONTENT_SUCCESS":
      return {
        ...state,
        currentAllListingsByContent: action.currentAllListingsByContent,
        listings: action.currentAllListingsByContent
      };
    case "GET_EXCHANGE_RATES_SUCCESS":
      return {
        ...state,
        exchangeRates: action.exchangeRates
      };
    case "GET_CURRENCIES_SUCCESS":
      return {
        ...state,
        currencies: action.currencies
      };
    case "GET_SOME_LISTINGS_BY_PEOPLE_SUCCESS":
      return {
        ...state,
        currentSomeListingsByPeople: action.currentSomeListingsByPeople
      };
    case "GET_ALL_LISTINGS_BY_PEOPLE_SUCCESS":
      return {
        ...state,
        currentAllListingsByPeople: action.currentAllListingsByPeople,
        listings: action.currentAllListingsByPeople
      };
    case "GET_LISTINGS_BY_WISHLIST_SUCCESS":
      return {
        ...state,
        currentListingsByWishList: action.currentListingsByWishList
      };
    default:
      return state;
  }
};

export default listing;
