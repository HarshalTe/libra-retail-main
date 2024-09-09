import * as ActionTypes from "../Types/ActionTypes";

export const FinalBills = (
  state = {
    isLoading: true,
    errMess: null,
    finalBills: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_FINAL_BILLS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        finalBills: action.payload,
      };

    case ActionTypes.FINAL_BILLS_LOADING:
      return { ...state, isLoading: true, errMess: null, finalBills: [] };

    case ActionTypes.FINAL_BILLS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        finalBills: [],
      };

    default:
      return state;
  }
};
