import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editSpecificationsData =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `specifications/${data.id}`, {
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
      .then((specifications) => {
        console.log("specifications Updated", specifications);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Specifications!",
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
      .catch((error) => dispatch(specificationsFailed(error)));
  };
export const editSpecificationsData2 =
  (data, setValue, value, token) => (dispatch) => {
    console.log("data, setValue, value, token",data, setValue, value, token)
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `specifications/${data.id}`, {
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
      .then((specifications) => {
        console.log("specifications Updated", specifications)
        .then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2, setValue, value));
          }
        });
      })
      .catch((error) => dispatch(specificationsFailed(error)));
  };

//*Loading
export const specificationsLoading = () => ({
  type: ActionTypes.SPECIFICATIONS_LOADING,
});

//*Failed
export const specificationsFailed = (errmess) => ({
  type: ActionTypes.SPECIFICATIONS_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(specificationsLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
  console.log("specifications Updated");
  return fetch(baseUrl + "properties/" + data.id, {
    method: "get",
    headers: myheader,
  })
  
    .then((response) => {
      console.log("specifications Updated");
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );
      console.log("specifications Updated");
      error.response = response;
      throw error;
      
    })
    .then((response) => response.json())
    .then((property) => {
      console.log("specifications Updated");
      console.log("property", property);
      dispatch(fetchProperty(property));
      dispatch(specificationsLoadingFalse());
      console.log("specifications Updated");
      setValue(value);
      console.log("specifications Updated");
    })
    .catch((error) => dispatch(specificationsFailed(error)));
};

//!Loding false
export const specificationsLoadingFalse = () => ({
  type: ActionTypes.SPECIFICATIONS_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
