import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editAnnexureData = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .post(`/annexures/${data.get("id")}?_method=put`, data, config)
      .then((annexures) => {
        console.log("put annexures data", annexures);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Annexures!",
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
      .catch((error) => dispatch(annexuresFailed(error)));
  };
};

//*Loading
export const annexuresLoading = () => ({
  type: ActionTypes.ANNEXURES_LOADING,
});

//*Failed
export const annexuresFailed = (errmess) => ({
  type: ActionTypes.ANNEXURES_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data) => (dispatch) => {
  dispatch(annexuresLoading());
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
      dispatch(annexuresLoadingFalse());
    })
    .catch((error) => dispatch(annexuresFailed(error)));
};

//!Loding false
export const annexuresLoadingFalse = () => ({
  type: ActionTypes.ANNEXURES_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
