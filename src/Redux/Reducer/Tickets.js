import * as ActionTypes from "../Types/ActionTypes";

export const Tickets = (
  state = {
    isLoading: true,
    errMess: null,
    tickets: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_TICKETS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        tickets: action.payload,
      };

    case ActionTypes.TICKETS_LOADING:
      return { ...state, isLoading: true, errMess: null, tickets: [] };

    case ActionTypes.TICKETS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        tickets: [],
      };

    default:
      return state;
  }
};
