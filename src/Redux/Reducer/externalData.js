import * as ActionTypes from "../Types/ActionTypes";

export const ExternalData = (
  state = {
    isLoading: true,
    errMess: null,
    externalData: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_EXTERNAL_DATA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        externalData: action.payload,
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

    case ActionTypes.EXTERNAL_DATA_LOADING:
      return { ...state, isLoading: true, errMess: null, externalData: [] };

    case ActionTypes.EXTERNAL_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        externalData: [],
      };

    default:
      return state;
  }
};
