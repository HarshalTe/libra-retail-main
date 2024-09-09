import * as ActionTypes from "../Types/ActionTypes";

export const Avm = (
  state = {
    isLoading: true,
    errMess: null,
    avm: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_AVM:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        avm: action.payload,
      };

    case ActionTypes.AVM_LOADING:
      return { ...state, isLoading: true, errMess: null, avm: [] };

    case ActionTypes.AVM_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        avm: [],
      };

    default:
      return state;
  }
};
