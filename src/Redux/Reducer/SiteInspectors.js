import * as ActionTypes from "../Types/ActionTypes";

export const SiteInspectors = (
  state = {
    isLoading: true,
    errMess: null,
    siteInspectors: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_SITE_INSPECTORS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        siteInspectors: action.payload,
      };

    case ActionTypes.SITE_INSPECTORS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        siteInspectors: [],
      };

    case ActionTypes.SITE_INSPECTORS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        siteInspectors: [],
      };

    default:
      return state;
  }
};
