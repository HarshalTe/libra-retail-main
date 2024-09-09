import * as ActionTypes from "../Types/ActionTypes";

export const Leaves = (
  state = {
    isLoading: true,
    errMess: null,
    leaves: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_LEAVES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        leaves: action.payload,
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

    case ActionTypes.LEAVES_LOADING:
      return { ...state, isLoading: true, errMess: null, leaves: [] };

    case ActionTypes.LEAVES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        leaves: [],
      };

    default:
      return state;
  }
};
