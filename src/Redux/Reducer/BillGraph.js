import * as ActionTypes from "../Types/ActionTypes";

export const BillGraph = (
  state = {
    isLoading: true,
    errMess: null,
    billGraph: [],//done
    billConfigGraph: [],//done
    rentConfigGraph: [],//done
    yieldConfigGraph: [],//done
    projectRateGraph: [],//done
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.BILL_GRAPH_GET:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billGraph: action.payload,
      };
    case ActionTypes.BILL_CONFIG_GET:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billConfigGraph: action.payload,
      };
    case ActionTypes.YIELD_GET:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        yieldConfigGraph: action.payload,
      };
    case ActionTypes.RENT_GET:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        rentConfigGraph: action.payload,
      };
    case ActionTypes.PROJECT_RATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        projectRateGraph: action.payload,
      };

    default:
      return state;
  }
};
