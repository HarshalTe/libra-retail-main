import * as ActionTypes from "../Types/ActionTypes";

export const PropertiesLocation = (
  state = {
    isLoading: false,
    errMess: null,
    propertiesLocation: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_PROPERTIES_LOCATION:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        propertiesLocation: action.payload,
      };

    case ActionTypes.PROPERTIES_LOCATION_LOADING:
      return { ...state, isLoading: true, errMess: null, propertiesLocation: [] };

    case ActionTypes.PROPERTIES_LOCATION_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        propertiesLocation: [],
      };

    default:
      return state;
  }
};
