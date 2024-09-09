import * as ActionTypes from "../Types/ActionTypes";

export const States = (
  state = {
    isLoading: true,
    errMess: null,
    states: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_STATES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        states: action.payload,
      };

    case ActionTypes.STATES_LOADING:
      return { ...state, isLoading: true, errMess: null, states: [] };

    case ActionTypes.STATES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        states: [],
      };

    default:
      return state;
  }
};
