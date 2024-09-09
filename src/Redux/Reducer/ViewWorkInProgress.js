// import * as ActionTypes from "../Types/ActionTypes";

// export const Property = (
//   state = {
//     isLoading: false,
//     errMess: null,
//     property: [],
//   },
//   action
// ) => {
//   switch (action.type) {
//     case ActionTypes.FETCH_PROPERTY:
//       return {
//         ...state,
//         isLoading: false,
//         errMess: null,
//         property: action.payload,
//       };

//     case ActionTypes.PROPERTY_LOADING:
//       return { ...state, isLoading: true, errMess: null, property: [] };

//     case ActionTypes.PROPERTY_FAILED:
//       return {
//         ...state,
//         isLoading: false,
//         errMess: action.payload,
//         property: [],
//       };

//     default:
//       return state;
//   }
// };
import * as ActionTypes from "../Types/ActionTypes";

export const Property = (
  state = {
    isLoading: false,
    errMess: null,
    property: [],
    // projectid: [],
    // productorder: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROPERTIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        property: [],
      };
    case ActionTypes.FETCH_PROPERTY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        property: action.payload,
      };
   
    case ActionTypes.PROPERTY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        property: [],
      };

    default:
      return state;
  }
};
