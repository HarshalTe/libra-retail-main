import * as ActionTypes from "../Types/ActionTypes";

export const RelievingLetters = (
  state = {
    isLoading: true,
    errMess: null,
    relievingLetters: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_RELIEVINGLETTERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        relievingLetters: action.payload,
      };

    case ActionTypes.RELIEVINGLETTERS_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        errMess: null, 
        relievingLetters: [] 
      };

    case ActionTypes.RELIEVINGLETTERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        relievingLetters: [],
      };

    default:
      return state;
  }
};
