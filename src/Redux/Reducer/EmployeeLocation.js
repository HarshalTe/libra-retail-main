import * as ActionTypes from "../Types/ActionTypes";

export const EmployeeLocation = (
  state = {
    isLoading: false,
    errMess: null,
    employeeLocation: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SET_EMPLOYEE_LOCATION:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        employeeLocation: action.payload,
      };

    case ActionTypes.EMPLOYEE_LOCATION_LOADING:
      return { ...state, isLoading: true, errMess: null, employeeLocation: [] };

    case ActionTypes.EMPLOYEE_LOCATION_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        employeeLocation: [],
      };

    default:
      return state;
  }
};
