import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editDeviationData = (data, setValue, value, token) => {
  console.log("hello", data.get("property_vertical"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .post(`/deviation/${data.get("id")}?_method=put`, data, config)
      .then((deviation) => {
        console.log("put deviation data", deviation);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Deviation!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.get("property_id"),
              token: token,
            };
            dispatch(getProperty(data2, setValue, value));
          }
        });
      })
      .catch((error) => dispatch(deviationFailed(error)));
  };
};

//*Loading
export const deviationLoading = () => ({
  type: ActionTypes.DEVIATION_LOADING,
});

//*Failed
export const deviationFailed = (errmess) => ({
  type: ActionTypes.DEVIATION_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(deviationLoading());
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
      dispatch(deviationLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(deviationFailed(error)));
};

//!Loding false
export const deviationLoadingFalse = () => ({
  type: ActionTypes.DEVIATION_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
