import * as ActionTypes from "../Types/ActionTypes";

export const MailTime = (
  state = {
    isLoading: true,
    errMess: null,
    mailTime: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_MAILTIME_MASTER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        mailTime: action.payload,
      };
    case ActionTypes.MAILTIME_MASTER_LOADING:
      return { 
        ...state, 
        isLoading: true,
         errMess: null,
         mailTime: [] 
        };

    case ActionTypes.MAILTIME_MASTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        mailTime: [],
      };

    default:
      return state;
  }
};
