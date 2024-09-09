import * as ActionTypes from "../Types/ActionTypes";

export const CompaniesMaster = (
  state = {
    isLoading: true,
    errMess: null,
    companiesmaster: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPLIANCEMASTER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        companiesmaster: action.payload,
      };

    case ActionTypes.COMPLIANCESMASTER_LOADING:
      return { ...state, isLoading: true, errMess: null, companiesmaster: [] };

    case ActionTypes.COMPLIANCESMASTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        companiesmaster: [],
      };

    default:
      return state;
  }
};
