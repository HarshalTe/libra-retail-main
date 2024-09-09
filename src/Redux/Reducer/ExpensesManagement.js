import * as ActionTypes from "../Types/ActionTypes";

export const Expenses = (
  state = {
    isLoading: true,
    errMess: null,
    expenses: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_EXPENSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expenses: action.payload,
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

    case ActionTypes.EXPENSES_LOADING:
      return { ...state, isLoading: true, errMess: null, expenses: [] };

    case ActionTypes.EXPENSES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        expenses: [],
      };

    default:
      return state;
  }
};
