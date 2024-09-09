import * as ActionTypes from "../Types/ActionTypes";

export const Dropdowns = (
  state = {
    isLoading: true,
    errMess: null,
    dropdowns: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_DROPDOWNS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dropdowns: action.payload,
      };

    case ActionTypes.DROPDOWNS_LOADING:
      return { ...state, isLoading: true, errMess: null, dropdowns: [] };

    case ActionTypes.DROPDOWNS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dropdowns: [],
      };

    default:
      return state;
  }
};
