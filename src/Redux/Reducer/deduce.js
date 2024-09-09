import * as ActionTypes from "../Types/ActionTypes";

export const Deduce = (
  state = {
    isLoading: true,
    errMess: null,
    deduce: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DEDUCE_ID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        deduce: action.payload,
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
    //     projectid: action.payload,
    //   };

    case ActionTypes.DEDUCE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        deduce: [],
      };

    case ActionTypes.DEDUCE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        deduce: [],
      };

    default:
      return state;
  }
};
