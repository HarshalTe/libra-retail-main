import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editUnitDetailData =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `unit-detail/${data.id}`, {
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
      .then((unitDetail) => {
        console.log("unit-detail Updated", unitDetail);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Unit Details!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            const data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2, setValue, value));
            // setValue(value);
          }
        });
      })
      .catch((error) => dispatch(unitDetailFailed(error)));
  };
export const editUnitDetailData2 =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `unit-detail/${data.id}`, {
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
      .then((unitDetail) => {
        console.log("unit-detail Updated", unitDetail)
        .then((result) => {
          if (result.isDismissed) {
            const data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2, setValue, value));
            // setValue(value);
          }
        });
      })
      .catch((error) => dispatch(unitDetailFailed(error)));
  };

//get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(unitDetailLoading());
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
      dispatch(unitDetailLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(unitDetailLoadingFalse(error)));
};

//*Loading
export const unitDetailLoading = () => ({
  type: ActionTypes.UNITDETAIL_LOADING,
});

//*Failed
export const unitDetailFailed = (errmess) => ({
  type: ActionTypes.UNITDETAIL_FAILED,
  payload: errmess,
});

//!Loding false
export const unitDetailLoadingFalse = () => ({
  type: ActionTypes.UNITDETAIL_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
