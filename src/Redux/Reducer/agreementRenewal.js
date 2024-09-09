import * as ActionTypes from "../Types/ActionTypes";

export const AgreementsRenewal = (
  state = {
    isLoading: true,
    errMess: null,
    agreements: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_AGREEMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        agreements: action.payload,
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

    case ActionTypes.AGREEMENTS_LOADING:
      return { ...state, isLoading: true, errMess: null, agreements: [] };

    case ActionTypes.AGREEMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        agreements: [],
      };

    default:
      return state;
  }
};
