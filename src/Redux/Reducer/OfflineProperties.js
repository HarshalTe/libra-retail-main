import * as ActionTypes from "../Types/ActionTypes";

export const OfflineProperties = (
  state = {
    isLoading: true,
    errMess: null,
    offlineProperties: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFLINE_PROPERTIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        offlineProperties: action.payload,
      };

    case ActionTypes.OFFLINE_PROPERTIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        offlineProperties: [],
      };

    case ActionTypes.OFFLINE_PROPERTIES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        offlineProperties: [],
      };

    default:
      return state;
  }
};
