import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//!edit

//* Get single property Page
export const getProperty1 = (data) => (dispatch) => {
  dispatch(propertyLoading1(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id[0], {
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
    .then((property) => {
      console.log("property", property);
      dispatch(fetchProperty1(property));
    })
    .catch((error) => dispatch(propertyFailed1(error)));
};
export const getProperty2 = (data) => (dispatch) => {
  dispatch(propertyLoading2(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id[1], {
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
    .then((property) => {
      console.log("property", property);
      dispatch(fetchProperty2(property));
    })
    .catch((error) => dispatch(propertyFailed2(error)));
};
export const getProperty3 = (data) => (dispatch) => {
  dispatch(propertyLoading3(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id[2], {
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
    .then((property) => {
      console.log("property", property);
      dispatch(fetchProperty3(property));
    })
    .catch((error) => dispatch(propertyFailed3(error)));
};

export const fetchProperty1 = (data) => ({
  type: ActionTypes.FETCH_PROPERTY1,
  payload: data,
});

export const propertyLoading1 = () => ({
  type: ActionTypes.PROPERTY_LOADING1,
});

export const propertyFailed1 = (errmess) => ({
  type: ActionTypes.PROPERTY_FAILED1,
  payload: errmess,
});
export const fetchProperty2 = (data) => ({
  type: ActionTypes.FETCH_PROPERTY2,
  payload: data,
});

export const propertyLoading2 = () => ({
  type: ActionTypes.PROPERTY_LOADING2,
});

export const propertyFailed2 = (errmess) => ({
  type: ActionTypes.PROPERTY_FAILED2,
  payload: errmess,
});
export const fetchProperty3 = (data) => ({
  type: ActionTypes.FETCH_PROPERTY3,
  payload: data,
});

export const propertyLoading3 = () => ({
  type: ActionTypes.PROPERTY_LOADING3,
});

export const propertyFailed3 = (errmess) => ({
  type: ActionTypes.PROPERTY_FAILED3,
  payload: errmess,
});
