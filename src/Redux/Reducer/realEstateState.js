import * as ActionTypes from "../Types/ActionTypes";

export const RealEstateState = (
  state = {
    isLoading: true,
    errMess: null,
    realEstateState: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_REAL_ESTATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        realEstateState: action.payload,
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

    case ActionTypes.REAL_ESTATE_LOADING:
      return { ...state, isLoading: true, errMess: null, realEstateState: [] };

    case ActionTypes.REAL_ESTATE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        realEstateState: [],
      };

    default:
      return state;
  }
};
