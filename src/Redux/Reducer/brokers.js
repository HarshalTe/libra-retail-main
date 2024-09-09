import * as ActionTypes from "../Types/ActionTypes";

export const Brokers = (
  state = {
    isLoading: true,
    errMess: null,
    brokers: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BROKERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        brokers: action.payload,
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

    case ActionTypes.BROKERS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        brokers: [],
      };

    case ActionTypes.BROKERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        brokers: [],
      };

    default:
      return state;
  }
};
