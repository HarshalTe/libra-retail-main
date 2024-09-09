import * as ActionTypes from "../Types/ActionTypes";

export const TechTypes = (
  state = {
    isLoading: true,
    errMess: null,
    techTypes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_TECH_TYPES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        techTypes: action.payload,
      };

    case ActionTypes.TECH_TYPES_LOADING:
      return { ...state, isLoading: true, errMess: null, techTypes: [] };

    case ActionTypes.TECH_TYPES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        techTypes: [],
      };

    default:
      return state;
  }
};
