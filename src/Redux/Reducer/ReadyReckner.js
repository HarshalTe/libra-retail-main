import * as ActionTypes from "../Types/ActionTypes";

export const ReadyReckners = (
  state = {
    isLoading: true,
    errMess: null,
    readyReckners: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_READYRECKNERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        readyReckners: action.payload,
      };
    case ActionTypes.READYRECKNERS_LOADING:
      return { ...state, 
        isLoading: true,
         errMess: null,
        readyReckners: [] };

    case ActionTypes.READYRECKNERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        readyReckners: [],
      };

    default:
      return state;
  }
};
