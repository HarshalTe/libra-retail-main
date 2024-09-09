
import * as ActionTypes from "../Types/ActionTypes";

export const Comparable = (
  state = {
    isLoading1: false,
    errMess1: null,
    isLoading2: false,
    errMess2: null,
    isLoading3: false,
    errMess3: null,
    comparable1: [],
    comparable2: [],
    comparable3: [],
    // projectid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTY_LOADING1:
      return {
        ...state,
        isLoading1: true,
        errMess1: null,
        comparable1: [],
      };
    case ActionTypes.FETCH_PROPERTY1:
      return {
        ...state,
        isLoading1: false,
        errMess1: null,
        comparable1: action.payload,
      };
   
    case ActionTypes.PROPERTY_FAILED1:
      return {
        ...state,
        isLoading1: false,
        errMess1: action.payload,
        comparable1: [],
      };
    case ActionTypes.PROPERTY_LOADING2:
      return {
        ...state,
        isLoading2: true,
        errMess2: null,
        comparable2: [],
      };
    case ActionTypes.FETCH_PROPERTY2:
      return {
        ...state,
        isLoading2: false,
        errMess2: null,
        comparable2: action.payload,
      };
   
    case ActionTypes.PROPERTY_FAILED2:
      return {
        ...state,
        isLoading2: false,
        errMess2: action.payload,
        comparable2: [],
      };
    case ActionTypes.PROPERTY_LOADING3:
      return {
        ...state,
        isLoading3: true,
        errMess3: null,
        comparable3: [],
      };
    case ActionTypes.FETCH_PROPERTY3:
      return {
        ...state,
        isLoading3: false,
        errMess3: null,
        comparable3: action.payload,
      };
   
    case ActionTypes.PROPERTY_FAILED3:
      return {
        ...state,
        isLoading3: false,
        errMess3: action.payload,
        comparable3: [],
      };

    default:
      return state;
  }
};
