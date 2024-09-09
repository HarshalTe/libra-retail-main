import * as ActionTypes from "../Types/ActionTypes";

export const Branches = (
  state = {
    isLoading: true,
    errMess: null,
    branches: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BRANCHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        branches: action.payload,
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

    case ActionTypes.BRANCHES_LOADING:
      return { ...state, isLoading: true, errMess: null, branches: [] };

    case ActionTypes.BRANCHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        branches: [],
      };

    default:
      return state;
  }
};
