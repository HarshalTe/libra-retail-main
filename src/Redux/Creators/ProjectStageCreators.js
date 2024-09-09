import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editProjectStageData =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `project-stage/${data.id}`, {
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
      .then((projectStage) => {
        console.log("project-stage Updated", projectStage);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Project Stage!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            const data2 = {
              id: data.property_id,
              token: token,
            };
            console.log("data2", data2);
            dispatch(getProjectStage(data2));
            setValue(value);
          }
        });
      })
      .catch((error) => dispatch(projectStageFailed(error)));
  };

export const getProjectStage = (data) => (dispatch) => {
  dispatch(projectStageLoading());
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
      dispatch(projectStageLoadingFalse());
    })
    .catch((error) => dispatch(projectStageFailed(error)));
};

//*Loading
export const projectStageLoading = () => ({
  type: ActionTypes.PROJECT_STAGE_LOADING,
});

//!Loding false
export const projectStageLoadingFalse = () => ({
  type: ActionTypes.PROJECT_STAGE_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});

//*Failed
export const projectStageFailed = (errmess) => ({
  type: ActionTypes.PROJECT_STAGE_FAILED,
  payload: errmess,
});
