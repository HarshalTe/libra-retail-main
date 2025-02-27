import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editGeoTags = (data, setValue, value, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `geoTags/${data.id}`, {
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
    .then((geoTags) => {
      console.log("geoTags Updated", geoTags);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated GeoTags!",
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
    .catch((error) => dispatch(geoTagsFailed(error)));
};

//*Loading
export const geoTagsLoading = () => ({
  type: ActionTypes.GEO_TAGS_LOADING,
});

//*Failed
export const geoTagsFailed = (errmess) => ({
  type: ActionTypes.GEO_TAGS_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(geoTagsLoading());
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
      dispatch(geoTagsLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(geoTagsFailed(error)));
};

//!Loding false
export const geoTagsLoadingFalse = () => ({
  type: ActionTypes.GEO_TAGS_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
