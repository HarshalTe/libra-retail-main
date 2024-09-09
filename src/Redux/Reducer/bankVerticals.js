import * as ActionTypes from "../Types/ActionTypes";

export const BankVerticals = (
  state = {
    isLoading: true,
    errMess: null,
    bankVerticals: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_BANK_VERTICALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        bankVerticals: action.payload,
      };

    case ActionTypes.BANK_VERTICALS_LOADING:
      return { ...state, isLoading: true, errMess: null, bankVerticals: [] };

    case ActionTypes.BANK_VERTICALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        bankVerticals: [],
      };

    default:
      return state;
  }
};
