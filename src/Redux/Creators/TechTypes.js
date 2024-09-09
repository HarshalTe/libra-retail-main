import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Banks Page
export const getTechTypes = (data) => (dispatch) => {
  dispatch(techTypesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "tech-types", {
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
    .then((techTypes) => {
      console.log("techTypes", techTypes);
      dispatch(fetchTechTypes(techTypes));
    })
    .catch((error) => dispatch(techTypesFailed(error)));
};
//*Fetch
export const fetchTechTypes = (techTypes) => ({
  type: ActionTypes.FETCH_TECH_TYPES,
  payload: techTypes,
});

//*Loading
export const techTypesLoading = () => ({
  type: ActionTypes.TECH_TYPES_LOADING,
});

//*Failed
export const techTypesFailed = (errmess) => ({
  type: ActionTypes.TECH_TYPES_FAILED,
  payload: errmess,
});
