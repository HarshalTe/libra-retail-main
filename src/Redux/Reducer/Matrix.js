import * as ActionTypes from "../Types/ActionTypes";

export const Matrixs = (
  state = {
    isLoading: true,
    errMess: null,
    matrixs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MATRIXS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        matrixs: action.payload,
      };
    case ActionTypes.MATRIXS_LOADING:
      return { ...state, 
              isLoading: true,
              errMess: null,
              matrixs: [] };

    case ActionTypes.MATRIXS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        matrixs: [],
      };

    default:
      return state;
  }
};
