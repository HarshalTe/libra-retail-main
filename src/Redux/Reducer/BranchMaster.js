import * as ActionTypes from "../Types/ActionTypes";

export const BranchMaster = (
  state = {
    isLoading: true,
    errMess: null,
    branchMaster: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BRANCH_MASTER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        branchMaster: action.payload,
      };

    case ActionTypes.BRANCH_MASTER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        branchMaster: [],
      };

    case ActionTypes.BRANCH_MASTER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        branchMaster: [],
      };

    default:
      return state;
  }
};
