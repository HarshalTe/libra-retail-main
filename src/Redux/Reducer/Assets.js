import * as ActionTypes from "../Types/ActionTypes";

export const Assets = (
  state = {
    isLoading: true,
    errMess: null,
    assets: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ASSETS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        assets: action.payload,
      };

    case ActionTypes.ASSETS_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        errMess: null, 
        assets: [] 
      };

    case ActionTypes.ASSETS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        assets: [],
      };

    default:
      return state;
  }
};
