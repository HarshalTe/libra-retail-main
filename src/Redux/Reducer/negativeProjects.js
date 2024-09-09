import * as ActionTypes from "../Types/ActionTypes";

export const NegativeProjects = (
  state = {
    isLoading: true,
    errMess: null,
    negativeProjects: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_NEGATIVE_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        negativeProjects: action.payload,
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

    case ActionTypes.NEGATIVE_PROJECTS_LOADING:
      return { ...state, isLoading: true, errMess: null, negativeProjects: [] };

    case ActionTypes.NEGATIVE_PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        negativeProjects: [],
      };

    default:
      return state;
  }
};
