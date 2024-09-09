import * as ActionTypes from "../Types/ActionTypes";

export const Projects = (
  state = {
    isLoading: false,
    errMess: null,
    projects: [],
    projectid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROJECTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        projects: action.payload,
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
    //     projectid: action.payload,
    //   };

    case ActionTypes.PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        projects: [],
      };

    case ActionTypes.PROJECTS_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.PROJECTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        projects: [],
      };

    case ActionTypes.FETCH_PROJECTS_ID:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        projectid: action.payload,
      };

    default:
      return state;
  }
};
