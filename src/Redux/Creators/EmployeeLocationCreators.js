import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*
export const getEmployeeLocation = (data) => (dispatch) => {
  dispatch(employeeLocationLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `geo-tag?user_id=${data.user_id}`, {
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
    .then((location) => {
      console.log("location", location);
      dispatch(setEmployeeLocation(location));
    })
    .catch((error) => dispatch(employeeLocationFailed(error)));
};

export const setEmployeeLocation = (data) => ({
  type: ActionTypes.SET_EMPLOYEE_LOCATION,
  payload: data,
});

export const employeeLocationLoading = () => ({
  type: ActionTypes.EMPLOYEE_LOCATION_LOADING,
});

export const employeeLocationFailed = (errmess) => ({
  type: ActionTypes.EMPLOYEE_LOCATION_FAILED,
  payload: errmess,
});
export const getPropertiesLocation = (data) => (dispatch) => {
  dispatch(propertiesLocationLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `render-properties`, {
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
    .then((location) => {
      console.log("location", location);
      dispatch(setPropertiesLocation(location));
    })
    .catch((error) => dispatch(propertiesLocationFailed(error)));
};

export const setPropertiesLocation = (data) => ({
  type: ActionTypes.SET_PROPERTIES_LOCATION,
  payload: data,
});

export const propertiesLocationLoading = () => ({
  type: ActionTypes.PROPERTIES_LOCATION_LOADING,
});

export const propertiesLocationFailed = (errmess) => ({
  type: ActionTypes.PROPERTIES_LOCATION_FAILED,
  payload: errmess,
});
