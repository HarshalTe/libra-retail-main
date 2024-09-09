import * as ActionTypes from "../Types/ActionTypes";

export const BrokerApi = (
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
    case ActionTypes.FETCH_GOOGLEAPI:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        brokersApi: action.payload,
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

    case ActionTypes.GOOGLEAPI_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        brokersApi: [],
      };

    case ActionTypes.GOOGLEAPI_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        brokersApi: [],
      };

    default:
      return state;
  }
};
