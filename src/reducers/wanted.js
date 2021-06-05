const initialData = {
  lists: null
};

const wanted = (state = initialData, action) => {
  switch (action.type) {
    case "GET_WANTED_LISTS_SUCCESS":
      return {
        ...state,
        lists: action.lists
      };
    default:
      return state;
  }
};

export default wanted;
