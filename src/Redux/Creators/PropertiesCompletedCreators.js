import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import history from "../../myCreatedHistory";

//* Get Properties Page
export const getCompletedPropertiesPage = (data) => (dispatch) => {
  console.log("properties", data);
  dispatch(completedPropertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "complete-property",
    {
      method: "get",
      headers: myheader,
    }
  )
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
    .then((completeProperty) => {
      console.log("completeProperty", completeProperty);
      dispatch(fetchCompletedProperties(completeProperty));
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//* Get completed branch properties Page
export const getCompletedBranchPropertiesPage = (data) => (dispatch) => {
  console.log("properties", data);
  dispatch(completedPropertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "complete-property?page=" +
      data.pageno +
      "&pageSize=" +
      data.pageSize +
      "&branch_id=" +
      data.branch_id,
    {
      method: "get",
      headers: myheader,
    }
  )
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
    .then((properties) => {
      console.log("properties", properties);
      dispatch(fetchCompletedProperties(properties));
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

export const editCompletedPropertiesData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  // return fetch(baseUrl + `/users/${data.id}?_method=PUT`, {
  return fetch(baseUrl + `properties/${data.id}`, {
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
    .then((properties) => {
      console.log("Properties Updated", properties);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully updated the property!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getCompletedPropertiesPage(data));
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

export const fetchCompletedProperties = (data) => ({
  type: ActionTypes.FETCH_COMPLETED_PROPERTIES,
  payload: data,
});

export const completedPropertiesLoading = () => ({
  type: ActionTypes.COMPLETED_PROPERTIES_LOADING,
});

export const propertiesFailed = (errmess) => ({
  type: ActionTypes.COMPLETED_PROPERTIES_FAILED,
  payload: errmess,
});
