import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editComplianceRemarkData = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `property-compliances`, {
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
            token: token,
          };
          dispatch(getCompliance(data2));
        }
      });
    })
    .catch((error) => dispatch(compliancesFailed(error)));
};

//*Loading
export const compliancesLoading = () => ({
  type: ActionTypes.COMPLIANCESMASTER_LOADING,
});

//*Failed
export const compliancesFailed = (errmess) => ({
  type: ActionTypes.COMPLIANCESMASTER_FAILED,
  payload: errmess,
});

//!get compliance
export const getCompliance = (data) => (dispatch) => {
  dispatch(compliancesLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "compliance-masters", {
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
    .then((compliance) => {
      console.log("compliance", compliance);
      dispatch(fetchCompliance(compliance));
      // dispatch(compliancesLoadingFalse());
    })
    .catch((error) => dispatch(compliancesFailed(error)));
};

//!Loding false
export const compliancesLoadingFalse = () => ({
  type: ActionTypes.COMPLIANCESMASTER_LOADING_FALSE,
});

//!fetchCompliance
export const fetchCompliance = (data) => ({
  type: ActionTypes.FETCH_COMPLIANCEMASTER,
  payload: data,
});
