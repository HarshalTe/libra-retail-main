import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editHomeImprovementData = (data, setValue, value, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .post(`/home-improvements/${data.get("id")}?_method=put`, data, config)
      .then((homeImprovements) => {
        console.log("put home-improvements data", homeImprovements);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Home Improvements!",
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
      .catch((error) => dispatch(homeImprovementsFailed(error)));
  };
};

//*Loading
export const homeImprovementsLoading = () => ({
  type: ActionTypes.HOME_IMPROVEMENTS_LOADING,
});

//*Failed
export const homeImprovementsFailed = (errmess) => ({
  type: ActionTypes.HOME_IMPROVEMENTS_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(homeImprovementsLoading());
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
      dispatch(homeImprovementsLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(homeImprovementsFailed(error)));
};

//!Loding false
export const homeImprovementsLoadingFalse = () => ({
  type: ActionTypes.HOME_IMPROVEMENTS_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
