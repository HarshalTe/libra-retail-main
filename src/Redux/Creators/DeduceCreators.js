import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";
// Middleware, or anywhere
import history from "../../myCreatedHistory";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

//* Get Deduce
export const getDeduceID = (data) => (dispatch) => {
  dispatch(deduceLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `projects/${data.project_id}`, {
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
    .then((deduce) => {
      console.log("deduce", deduce);
      dispatch(fetchDeduceID(deduce));
    })
    .catch((error) => dispatch(deduceFailed(error)));
};

//*Post deduce
export const deducePostData = (data) => (dispatch) => {
  dispatch(deduceLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `dedupe/${data.property_id}`, {
    method: "post",
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
    .then((dedupe) => {
      console.log("post dedupe data", dedupe);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Created New Case!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("rededupe", dedupe?.success);
        if (result.isDismissed) {
          swalWithBootstrapButtons
          .fire({
            title: "Do You want to Upload Document?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Upload",
            cancelButtonText: "No, cancel!",
            reverseButtons: false,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // <DocumentsUploadPage/>
              history.push(`/admin/uploadDocuments/${dedupe?.success?.id}`);
            } else
            {
              history.push(`/admin/viewWorkInProgress/${dedupe?.success?.id}`);
            }
          });
          // dispatch(getBanksPage(data));
        }
      });
    })
    .catch((error) => dispatch(deduceFailed(error)));
};

//*Fetch
export const fetchDeduceID = (data) => ({
  type: ActionTypes.FETCH_DEDUCE_ID,
  payload: data,
});

//*Loading
export const deduceLoading = () => ({
  type: ActionTypes.DEDUCE_LOADING,
});

//*Failed
export const deduceFailed = (errmess) => ({
  type: ActionTypes.DEDUCE_FAILED,
  payload: errmess,
});
