import * as ActionTypes from "../Types/ActionTypes";

export const Documents = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DOCUMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.DOCUMENTS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.DOCUMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
