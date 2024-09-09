import * as ActionTypes from "../Types/ActionTypes";

export const ProjectDocument = (
  state = {
    isLoading: true,
    errMess: null,
    ProjectDocument: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROJECTDOCUMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        ProjectDocument: action.payload,
      };

    case ActionTypes.PROJECTDOCUMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        ProjectDocument: [],
      };

    case ActionTypes.PROJECTDOCUMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        ProjectDocument: [],
      };

    default:
      return state;
  }
};
