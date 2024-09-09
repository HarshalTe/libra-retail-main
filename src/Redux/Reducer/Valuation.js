import * as ActionTypes from "../Types/ActionTypes";

export const Valuation = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.VALUATION_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.VALUATION_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.VALUATION_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
