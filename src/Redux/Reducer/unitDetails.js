import * as ActionTypes from "../Types/ActionTypes";

export const UnitDetails = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.UNITDETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.UNITDETAIL_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.UNITDETAIL_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
