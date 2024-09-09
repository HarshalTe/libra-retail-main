import * as ActionTypes from "../Types/ActionTypes";

export const Users = (
  state = {
    isLoading: true,
    errMess: null,
    users: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        users: action.payload,
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

    case ActionTypes.USERS_LOADING:
      return { ...state, isLoading: true, errMess: null, users: [] };

    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        users: [],
      };

    default:
      return state;
  }
};
