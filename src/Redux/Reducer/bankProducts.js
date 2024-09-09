import * as ActionTypes from "../Types/ActionTypes";

export const BankProducts = (
  state = {
    isLoading: true,
    errMess: null,
    bankProducts: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BANK_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        bankProducts: action.payload,
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

    case ActionTypes.BANK_PRODUCTS_LOADING:
      return { ...state, isLoading: true, errMess: null, bankProducts: [] };

    case ActionTypes.BANK_PRODUCTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        bankProducts: [],
      };

    default:
      return state;
  }
};
