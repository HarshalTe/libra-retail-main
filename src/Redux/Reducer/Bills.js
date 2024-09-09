import * as ActionTypes from "../Types/ActionTypes";

export const Bills = (
  state = {
    isLoading: true,
    errMess: null,
    bills: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BILLS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        bills: action.payload,
      };

    // case ActionTypes.FETCH_PRODUCTORDER:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errMess: null,
    //     productorder: action.payload,
    //   };

    // case ActionTypes.FETCH_PRODUCTID:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errMess: null,
    //     productid: action.payload,
    //   };

    case ActionTypes.BILLS_LOADING:
      return { ...state, isLoading: true, errMess: null, bills: [] };

    case ActionTypes.BILLS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        bills: [],
      };

    default:
      return state;
  }
};
