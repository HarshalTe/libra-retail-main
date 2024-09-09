import * as ActionTypes from "../Types/ActionTypes";

export const Companies = (
  state = {
    isLoading: true,
    errMess: null,
    companies: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        companies: action.payload,
      };

    case ActionTypes.COMPANIES_LOADING:
      return { ...state, isLoading: true, errMess: null, companies: [] };

    case ActionTypes.COMPANIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        companies: [],
      };

    default:
      return state;
  }
};
