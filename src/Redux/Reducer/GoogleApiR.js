import * as ActionTypes from "../Types/ActionTypes";

export const GoogleApi = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GOOGLE_API_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.GOOGLE_API_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,

      };

    case ActionTypes.GOOGLE_API_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
