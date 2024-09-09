import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editMeasurementData = (data, token) => {
  console.log("dataaaaa: ", data);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    axios
      .post(`/measurement/${data.get("id")}?_method=put`, data, config)
      .then((measurement) => {
        console.log("put measurement data", measurement);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Measurement!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.get("property_id"),
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(measurementFailed(error)));
  };
};

//*Loading
export const measurementLoading = () => ({
  type: ActionTypes.MEASUREMENT_LOADING,
});

//*Failed
export const measurementFailed = (errmess) => ({
  type: ActionTypes.MEASUREMENT_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data) => (dispatch) => {
  dispatch(measurementLoading());
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
      dispatch(measurementLoadingFalse());
    })
    .catch((error) => dispatch(measurementFailed(error)));
};

//!Loding false
export const measurementLoadingFalse = () => ({
  type: ActionTypes.MEASUREMENT_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
