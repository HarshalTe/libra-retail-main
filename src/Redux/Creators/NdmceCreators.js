import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editNdmceData = (data, setValue, value, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `nDMC/${data.id}`, {
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
    .then((ndmce) => {
      console.log("ndmce Updated", ndmce);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The NDMCE!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            id: data.property_id,
            token: token,
          };
          dispatch(getProperty(data2, setValue, value));
        }
      });
    })
    .catch((error) => dispatch(ndmceFailed(error)));
};

//*Loading
export const ndmceLoading = () => ({
  type: ActionTypes.NDMCE_LOADING,
});

//*Failed
export const ndmceFailed = (errmess) => ({
  type: ActionTypes.NDMCE_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(ndmceLoading());
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
      dispatch(ndmceLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(ndmceFailed(error)));
};

//!Loding false
export const ndmceLoadingFalse = () => ({
  type: ActionTypes.NDMCE_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
