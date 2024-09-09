import * as ActionTypes from "../Types/ActionTypes";

export const DcrGovPolicy = (
  state = {
    isLoading: true,
    errMess: null,
    dcrGovPolicy: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DCR_GOV_POLICY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dcrGovPolicy: action.payload,
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

    case ActionTypes.DCR_GOV_POLICY_LOADING:
      return { ...state, isLoading: true, errMess: null, dcrGovPolicy: [] };

    case ActionTypes.DCR_GOV_POLICY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dcrGovPolicy: [],
      };

    default:
      return state;
  }
};
