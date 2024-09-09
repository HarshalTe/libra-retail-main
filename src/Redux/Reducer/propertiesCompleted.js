import * as ActionTypes from "../Types/ActionTypes";

export const CompletedProperties = (
  state = {
    isLoading: true,
    errMess: null,
    completedProperties: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPLETED_PROPERTIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        completedProperties: action.payload,
      };

    case ActionTypes.COMPLETED_PROPERTIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        completedProperties: [],
      };

    case ActionTypes.COMPLETED_PROPERTIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        completedProperties: [],
      };

    default:
      return state;
  }
};
