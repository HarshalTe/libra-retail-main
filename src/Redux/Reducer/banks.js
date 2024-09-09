import * as ActionTypes from "../Types/ActionTypes";

export const Banks = (
  state = {
    isLoading: true,
    errMess: null,
    banks: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BANKS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        banks: action.payload,
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

    case ActionTypes.BANKS_LOADING:
      return { ...state, isLoading: true, errMess: null, banks: [] };

    case ActionTypes.BANKS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        banks: [],
      };

    default:
      return state;
  }
};
