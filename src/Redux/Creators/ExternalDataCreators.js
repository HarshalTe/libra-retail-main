import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import axios from "../../shared/axios";

import Swal from "sweetalert2";

//* Get List
export const getExternalDataList = (data) => (dispatch) => {
  dispatch(externalDataLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "externalPage", {
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
    .then((externalData) => {
      console.log("externalData", externalData);
      dispatch(fetchExternalData(externalData));
    })
    .catch((error) => dispatch(externalDataFailed(error)));
};

//* Get
export const getExternalDataPage = (data) => (dispatch) => {
  dispatch(externalDataLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "externalPage?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((externalData) => {
      console.log("externalData", externalData);
      dispatch(fetchExternalData(externalData));
    })
    .catch((error) => dispatch(externalDataFailed(error)));
};

//*Post
export const postExternalData = (data) => (dispatch) => {
  console.log("External data Post Data", data);
  dispatch(externalDataLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "externalPage", {
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
    .then((externalData) => {
      console.log("post externalData data", externalData);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New External Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getExternalDataPage(data));
        }
      });
    })
    .catch((error) => dispatch(externalDataFailed(error)));
};

//* Edit
export const editExternalData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `externalPage/${data.id}`, {
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
    .then((externalData) => {
      console.log("External Data Updated", externalData);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The External Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getExternalDataPage(data));
        }
      });
    })
    .catch((error) => dispatch(externalDataFailed(error)));
};

//* Search
export const searchExternalData = (data) => (dispatch) => {
  dispatch(externalDataLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "externalPage?search=" + data.search, {
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
    .then((externalData) => {
      console.log("externalData", externalData);
      dispatch(fetchExternalData(externalData));
    })
    .catch((error) => dispatch(externalDataFailed(error)));
};

//* Delete
export const deleteExternalDataAll = (data) => (dispatch) => {
  console.log("External Data Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "externalsdeleteall", {
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
    .then((externalData) => {
      console.log("success!", externalData);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected External Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getExternalDataPage(data));
        }
      });
    })
    .catch((error) => dispatch(externalDataFailed(error)));
};

//* Bulk Upload
export const bulkUploadData = (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(externalDataLoading(true));
    axios
      .post("/importExternal", data, config)
      .then((externalData) => {
        console.log("post bulkupload exteranlData data", externalData);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Projects!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: data.get("token"),
              pageno: data.get("pageno"),
              pageSize: data.get("pageSize"),
            };
            dispatch(getExternalDataPage(data2));
          }
        });
      })
      .catch((error) => dispatch(externalDataFailed(error)));
  };
};

//*Fetch
export const fetchExternalData = (externalData) => ({
  type: ActionTypes.FETCH_EXTERNAL_DATA,
  payload: externalData,
});

//*Loading
export const externalDataLoading = () => ({
  type: ActionTypes.EXTERNAL_DATA_LOADING,
});

//*Failed
export const externalDataFailed = (errmess) => ({
  type: ActionTypes.EXTERNAL_DATA_FAILED,
  payload: errmess,
});
