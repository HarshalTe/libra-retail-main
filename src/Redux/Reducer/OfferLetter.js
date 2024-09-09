import * as ActionTypes from "../Types/ActionTypes";

export const OfferLetters = (
  state = {
    isLoading: true,
    errMess: null,
    offerLetters: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERLETTERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        offerLetters: action.payload,
      };

    case ActionTypes.OFFERLETTERS_LOADING:
      return { 
        ...state, 
        isLoading: true, 
        errMess: null, 
        offerLetters: [] 
      };

    case ActionTypes.OFFERLETTERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        offerLetters: [],
      };

    default:
      return state;
  }
};
