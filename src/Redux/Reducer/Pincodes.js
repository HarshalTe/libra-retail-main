import * as ActionTypes from "../Types/ActionTypes";

export const Pincodes = (
  state = {
    isLoading: true,
    errMess: null,
    pincodes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PINCODES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        pincodes: action.payload,
      };

    case ActionTypes.PINCODES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        pincodes: [],
      };

    case ActionTypes.PINCODES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        pincodes: [],
      };

    default:
      return state;
  }
};
