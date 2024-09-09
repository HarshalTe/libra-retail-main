import * as ActionTypes from "../Types/ActionTypes";

export const PaymentMaster = (
  state = {
    isLoading: true,
    errMess: null,
    paymentMaster: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_PAYMENT_MASTER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        paymentMaster: action.payload,
      };

    case ActionTypes.PAYMENT_MASTER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        paymentMaster: [],
      };

    case ActionTypes.PAYMENT_MASTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        paymentMaster: [],
      };

    default:
      return state;
  }
};
