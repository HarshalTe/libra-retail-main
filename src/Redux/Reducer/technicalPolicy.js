import * as ActionTypes from "../Types/ActionTypes";

export const TechPolicy = (
  state = {
    isLoading: true,
    errMess: null,
    techPolicy: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_TECH_POLICY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        techPolicy: action.payload,
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

    case ActionTypes.TECH_POLICY_LOADING:
      return { ...state, isLoading: true, errMess: null, techPolicy: [] };

    case ActionTypes.TECH_POLICY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        techPolicy: [],
      };

    default:
      return state;
  }
};
