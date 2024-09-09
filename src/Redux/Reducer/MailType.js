import * as ActionTypes from "../Types/ActionTypes";

export const MailType = (
  state = {
    isLoading: true,
    errMess: null,
    mailType: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MAILTYPE_MASTER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        mailType: action.payload,
      };
    case ActionTypes.MAILTYPE_MASTER_LOADING:
      return { ...state, 
        isLoading: true,
         errMess: null,
        mailType: [] };

    case ActionTypes.MAILTYPE_MASTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        mailType: [],
      };

    default:
      return state;
  }
};
