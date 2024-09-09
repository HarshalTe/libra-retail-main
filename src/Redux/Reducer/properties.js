import * as ActionTypes from "../Types/ActionTypes";

export const Properties = (
  state = {
    isLoading: true,
    errMess: null,
    properties: [],
    propertyid: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROPERTIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        properties: action.payload,
      };

    case ActionTypes.FETCH_SINGLE_PROPERTY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        propertyid: action.payload,
      };

    case ActionTypes.PROPERTIES_LOADING:
      return { ...state, isLoading: true, errMess: null, properties: [] };

    case ActionTypes.PROPERTIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        properties: [],
      };

    default:
      return state;
  }
};
