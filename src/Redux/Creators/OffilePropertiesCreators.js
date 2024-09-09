import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Banks Page
export const getOfflineProperties = (data) => (dispatch) => {
  dispatch(offilePropertiesLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "offline-properties?page=" +
      data.pageno +
      "&pageSize=" +
      data.pageSize,
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
    .then((offlineProperties) => {
      console.log("offlineProperties", offlineProperties);
      dispatch(fetchOfflineProperties(offlineProperties));
    })
    .catch((error) => dispatch(offlinePropertiesFailed(error)));
};

//*Post
export const postOfflineProperties = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(offilePropertiesLoading());
    axios
      .post("/offline-properties", data, config)
      .then((offlineProperties) => {
        console.log("post offlineProperties data", offlineProperties);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added  Offline-Property!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getOfflineProperties(data2));
          }
        });
      })
      .catch((error) => dispatch(offlinePropertiesFailed(error)));
  };
};

//* Edit
export const editOfflineProperties = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(offilePropertiesLoading());
    axios
      .post(`offline-properties/${data.get("id")}?_method=PUT`, data, config)
      .then((offlineProperties) => {
        console.log("post offlineProperties data", offlineProperties);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Offline-Property!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getOfflineProperties(data2));
          }
        });
      })
      .catch((error) => dispatch(offlinePropertiesFailed(error)));
  };
};

//* Search
export const searchOfflineProperties = (data, token) => (dispatch) => {
  dispatch(offilePropertiesLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "offline-properties?search=" + data.search, {
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
    .then((offlineProperties) => {
      console.log("offlineProperties", offlineProperties);
      dispatch(fetchOfflineProperties(offlineProperties));
    })
    .catch((error) => dispatch(offlinePropertiesFailed(error)));
};

//* Delete
export const offlinePropertiesDeleteAll = (data, token) => (dispatch) => {
  console.log("underConstructProjects Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "offline-delete-all", {
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
    .then((offlineProperties) => {
      console.log("success!", offlineProperties);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Offline Properties!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          let data2 = {
            token: token,
            pageno: 1,
            pageSize: 10000,
          };
          dispatch(getOfflineProperties(data2));
        }
      });
    })
    .catch((error) => dispatch(offlinePropertiesFailed(error)));
};

//*BulkUpload
export const bulkUploadOfflineProperties = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(offilePropertiesLoading(true));
    axios
      .post("/offline-upload", data, config)
      .then((offlineProperties) => {
        console.log(
          "post bulkupload offlineProperties data",
          offlineProperties
        );
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Offline Properties!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getOfflineProperties(data2));
          }
        });
      })
      .catch((error) => dispatch(offlinePropertiesFailed(error)));
  };
};

//*Fetch
export const fetchOfflineProperties = (data) => ({
  type: ActionTypes.FETCH_OFFLINE_PROPERTIES,
  payload: data,
});

//*Loading
export const offilePropertiesLoading = () => ({
  type: ActionTypes.OFFLINE_PROPERTIES_LOADING,
});

//*Failed
export const offlinePropertiesFailed = (errmess) => ({
  type: ActionTypes.OFFLINE_PROPERTIES_FAILED,
  payload: errmess,
});
