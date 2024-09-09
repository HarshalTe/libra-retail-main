import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//!edit
export const editPropertiesData = (data, setValue, value) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `properties/${data.id}`, {
    method: "put",
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
    .then((properties) => {
      console.log("Properties Updated", properties);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully updated the property!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            id: data.id,
            token: data.token,
          };
          dispatch(getPropertySetValue(data2, setValue, value));
          setValue(value);
        }
      });
    })
    .catch((error) => dispatch(propertyFailed(error)));
};

//* Get single property Page and setvalye
export const getPropertySetValue = (data, setValue, value) => (dispatch) => {
  dispatch(propertyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id, {
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
      dispatch(fetchProperty(property));
      setValue(value);
    })
    .catch((error) => dispatch(propertyFailed(error)));
};

//* Get single property Page
export const getProperty = (data) => (dispatch) => {
  dispatch(propertyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id, {
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
      dispatch(fetchProperty(property));
    })
    .catch((error) => dispatch(propertyFailed(error)));
};

export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});

export const propertyLoading = () => ({
  type: ActionTypes.PROPERTY_LOADING,
});

export const propertyFailed = (errmess) => ({
  type: ActionTypes.PROPERTY_FAILED,
  payload: errmess,
});
