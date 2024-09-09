import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get List
export const getDropdownsList = (data) => (dispatch) => {
  dispatch(dropdownsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dropdowns", {
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
    .then((dropdowns) => {
      console.log("dropdowns", dropdowns);
      dispatch(setDropdowns(dropdowns));
    })
    .catch((error) => dispatch(dropdownsFailed(error)));
};

//!fix this and put pageno
//* Get Dropdowns
export const getDropdowns = (data) => (dispatch) => {
  dispatch(dropdownsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dropdowns", {
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
    .then((dropdowns) => {
      console.log("dropdowns123", dropdowns);
      dispatch(setDropdowns(dropdowns));
    })
    .catch((error) => dispatch(dropdownsFailed(error)));
};

export const dropdownPostData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dropdowns", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
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
    .then((dropdowns) => {
      console.log("success!", dropdowns);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added New Master Dropdown!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getDropdowns(data));
        }
      });
    })
    .catch((error) => dispatch(dropdownsFailed(error)));
};

export const setDropdowns = (dropdowns) => ({
  type: ActionTypes.SET_DROPDOWNS,
  payload: dropdowns,
});

export const dropdownsLoading = () => ({
  type: ActionTypes.DROPDOWNS_LOADING,
});

export const dropdownsFailed = (errmess) => ({
  type: ActionTypes.DROPDOWNS_FAILED,
  payload: errmess,
});
