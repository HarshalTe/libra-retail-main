import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editComplianceData = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `compliance/${data.id}`, {
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
    .then((compliance) => {
      console.log("compliance Updated", compliance);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Compliances!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            id: data.property_id,
            token: token,
          };
          dispatch(getProperty(data2));
        }
      });
    })
    .catch((error) => dispatch(compliancesFailed(error)));
};

//*Loading
export const compliancesLoading = () => ({
  type: ActionTypes.COMPLIANCES_LOADING,
});

//*Failed
export const compliancesFailed = (errmess) => ({
  type: ActionTypes.COMPLIANCES_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data) => (dispatch) => {
  dispatch(compliancesLoading());
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
      dispatch(compliancesLoadingFalse());
    })
    .catch((error) => dispatch(compliancesFailed(error)));
};

//!Loding false
export const compliancesLoadingFalse = () => ({
  type: ActionTypes.COMPLIANCES_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
