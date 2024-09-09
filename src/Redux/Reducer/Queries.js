import * as ActionTypes from "../Types/ActionTypes";

export const Queries = (
  state = {
    isLoading: true,
    errMess: null,
    queries: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_QUERIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        queries: action.payload,
      };

    case ActionTypes.QUERIES_LOADING:
      return { ...state, isLoading: true, errMess: null, queries: [] };

    case ActionTypes.QUERIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        queries: [],
      };

    default:
      return state;
  }
};
