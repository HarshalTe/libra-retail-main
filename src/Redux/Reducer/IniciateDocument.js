import * as ActionTypes from "../Types/ActionTypes";

export const IniciateDocument = (
  state = {
    isLoading: true,
    errMess: null,
    iniciateDocument: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DOCUMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        iniciateDocument: action.payload,
      };

    case ActionTypes.DOCUMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        iniciateDocument: [],
      };

    case ActionTypes.DOCUMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        iniciateDocument: [],
      };

    default:
      return state;
  }
};
