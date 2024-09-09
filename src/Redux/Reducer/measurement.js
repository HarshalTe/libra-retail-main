import * as ActionTypes from "../Types/ActionTypes";

export const Measurement = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.MEASUREMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.MEASUREMENT_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.MEASUREMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
