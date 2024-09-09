import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editSpecialRemarkData = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `special_remarks/${data.id}`, {
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
    .then((special_remarks) => {
      console.log("special_remarks Updated", special_remarks);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Remarks!",
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
    .catch((error) => dispatch(specialRemarkFailed(error)));
};

//*Loading
export const specialRemarkLoading = () => ({
  type: ActionTypes.SPECIAL_REMARK_LOADING,
});

//*Failed
export const specialRemarkFailed = (errmess) => ({
  type: ActionTypes.SPECIAL_REMARK_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data) => (dispatch) => {
  dispatch(specialRemarkLoading());
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
      dispatch(specialRemarkLoadingFalse());
    })
    .catch((error) => dispatch(specialRemarkFailed(error)));
};

//!Loding false
export const specialRemarkLoadingFalse = () => ({
  type: ActionTypes.SPECIAL_REMARK_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
