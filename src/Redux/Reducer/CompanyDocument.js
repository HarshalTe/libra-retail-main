import * as ActionTypes from "../Types/ActionTypes";

export const CompanyDocument = (
  state = {
    isLoading: true,
    errMess: null,
    companyDocument: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANY_DOCUMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        companyDocument: action.payload,
      };

    case ActionTypes.COMPANY_DOCUMENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        companyDocument: [],
      };

    case ActionTypes.COMPANY_DOCUMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        companyDocument: [],
      };

    default:
      return state;
  }
};
