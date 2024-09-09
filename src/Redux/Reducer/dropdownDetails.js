import * as ActionTypes from "../Types/ActionTypes";

export const DropdownDetails = (
  state = {
    isLoading: true,
    errMess: null,
    dropdownDetails: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DROPDOWN_DETAILS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dropdownDetails: action.payload,
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

    case ActionTypes.DROPDOWN_DETAILS_LOADING:
      return { ...state, isLoading: true, errMess: null, dropdownDetails: [] };

    case ActionTypes.DROPDOWN_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dropdownDetails: [],
      };

    default:
      return state;
  }
};
