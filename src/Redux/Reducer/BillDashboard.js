import * as ActionTypes from "../Types/ActionTypes";

export const BillDashboard = (
  state = {
    isLoading: true,
    errMess: null,
    billDashboard: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BILL_DASHBOARD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billDashboard: action.payload,
      };

    case ActionTypes.BILL_DASHBOARD_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        billDashboard: [],
      };

    case ActionTypes.BILL_DASHBOARD_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        billDashboard: [],
      };

    default:
      return state;
  }
};
