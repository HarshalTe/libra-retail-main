import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Dropdowns
export const getStatesData = (data) => (dispatch) => {
  dispatch(statesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "links", {
    method: "get",
    headers: myheader,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((state) => {
      console.log("state", state.data);
      dispatch(setDropdowns(state.data));
    })
    .catch((error) => dispatch(statesFailed(error)));
};

export const setDropdowns = (state) => ({
  type: ActionTypes.SET_STATES,
  payload: state,
});

export const statesLoading = () => ({
  type: ActionTypes.STATES_LOADING,
});

export const statesFailed = (errmess) => ({
  type: ActionTypes.STATES_FAILED,
  payload: errmess,
});
