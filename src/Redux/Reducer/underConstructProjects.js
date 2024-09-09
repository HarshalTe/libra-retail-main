import * as ActionTypes from "../Types/ActionTypes";

export const UnderConstructProjects = (
  state = {
    isLoading: true,
    errMess: null,
    underConstructProjects: [],
    // productid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_UNDER_CONSTRUCT_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        underConstructProjects: action.payload,
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

    case ActionTypes.UNDER_CONSTRUCT_PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        underConstructProjects: [],
      };

    case ActionTypes.UNDER_CONSTRUCT_PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        underConstructProjects: [],
      };

    default:
      return state;
  }
};
