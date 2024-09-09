import * as ActionTypes from "../Types/ActionTypes";

export const ProjectStage = (
  state = {
    isLoading: false,
    errMess: null,
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

    case ActionTypes.PROJECT_STAGE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.PROJECT_STAGE_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.PROJECT_STAGE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
