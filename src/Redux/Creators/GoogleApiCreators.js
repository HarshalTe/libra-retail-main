import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editGoogleApiData =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `google-api/${data.id}`, {
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
      .then((googleApi) => {
        console.log("google-api Updated", googleApi);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Google Api!",
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
      .catch((error) => dispatch(googleApiFailed(error)));
  };

//*Loading
export const googleApiLoading = () => ({
  type: ActionTypes.GOOGLE_API_LOADING,
});

//*Failed
export const googleApiFailed = (errmess) => ({
  type: ActionTypes.GOOGLE_API_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(googleApiLoading());
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
      dispatch(googleApiLoadingFalse(property));
      setValue(value);
    })
    .catch((error) => dispatch(googleApiFailed(error)));
};

//!Loding false
export const googleApiLoadingFalse = (data) => ({
  type: ActionTypes.GOOGLE_API_LOADING_FALSE,
  payload:data,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
