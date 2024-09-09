import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Page
export const getMailTypeMasterPage = (data) => (dispatch) => {
  dispatch(mailtypeMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
  return fetch(
    baseUrl + "mail-types",
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
    .then((mailtypeMaster) => {
      console.log("mailtypeMaster", mailtypeMaster);
      dispatch(fetchMailTypeMaster(mailtypeMaster));
    })
    .catch((error) => dispatch(mailtypeMasterFailed(error)));
};

//* Get List
export const getMailTypeMasterList = (data) => (dispatch) => {
  dispatch(mailtypeMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "mail-types", {
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
    .then((mailtypeMaster) => {
      console.log("mailtypeMaster", mailtypeMaster);
      dispatch(fetchMailTypeMaster(mailtypeMaster));
    })
    .catch((error) => dispatch(mailtypeMasterFailed(error)));
};

//*Post
export const postMailTypeMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(mailtypeMasterLoading());
    axios
      .post("/mail-types", data, config)
      .then((mailtypeMaster) => {
        console.log("post mailtypeMaster data", mailtypeMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added New MailType Master!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getMailTypeMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(mailtypeMasterFailed(error)));
  };
};

//* Edit
export const editMailTypeMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(mailtypeMasterLoading());
    axios
      .put(`mail-types/${data.id}`, data, config)
      .then((mailtypeMaster) => {
        console.log("post mailtypeMaster data", mailtypeMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The MailType Master!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getMailTypeMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(mailtypeMasterFailed(error)));
  };
};

//* Search
export const searchMailTypeMaster = (data, token) => (dispatch) => {
  dispatch(mailtypeMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "mail-types?search=" + data.search, {
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
    .then((mailtypeMaster) => {
      console.log("mailtypeMaster", mailtypeMaster);
      dispatch(fetchMailTypeMaster(mailtypeMaster));
    })
    .catch((error) => dispatch(mailtypeMasterFailed(error)));
};

//* Delete
export const mailtypeMasterDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `mail-types/${data}`, {
    method: "delete",
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
    .then((mailtypeMaster) => {
      console.log("success!", mailtypeMaster);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected MailType Master!",
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
          dispatch(getMailTypeMasterPage(data2));
        }
      });
    })
    .catch((error) => dispatch(mailtypeMasterFailed(error)));
};

//*Fetch
export const fetchMailTypeMaster = (data) => ({
  type: ActionTypes.FETCH_MAILTYPE_MASTER,
  payload: data,
});

//*Loading
export const mailtypeMasterLoading = () => ({
  type: ActionTypes.MAILTYPE_MASTER_LOADING,
});

//*Failed
export const mailtypeMasterFailed = (errmess) => ({
  type: ActionTypes.MAILTYPE_MASTER_FAILED,
  payload: errmess,
});
