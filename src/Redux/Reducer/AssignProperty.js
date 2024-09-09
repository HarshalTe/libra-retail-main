import * as ActionTypes from "../Types/ActionTypes";

export const AssignProperty = (
  state = {
    isLoading: false,
    errMess: null,
    assignProperty: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_ASSIGN_PROPERTY_HISTORY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        assignProperty: action.payload,
      };

    case ActionTypes.ASSIGN_PROPERTY_LOADING:
      return { ...state, isLoading: true, errMess: null, companies: [] };

    case ActionTypes.ASSIGN_PROPERTY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        assignProperty: [],
      };

    default:
      return state;
  }
};
