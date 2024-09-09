import * as ActionTypes from "../Types/ActionTypes";

export const Ndmc = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.NDMCE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.NDMCE_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.NDMCE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
