import * as ActionTypes from "../Types/ActionTypes";

export const Learnings = (
  state = {
    isLoading: true,
    errMess: null,
    learnings: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_LEARNINGS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        learnings: action.payload,
      };

    case ActionTypes.LEARNINGS_LOADING:
      return { ...state, isLoading: true, errMess: null, learnings: [] };

    case ActionTypes.LEARNINGS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        learnings: [],
      };

    default:
      return state;
  }
};
