import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Page
export const getMailTimeMasterPage = (data) => (dispatch) => {
  dispatch(mailtimeMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
  return fetch(
    baseUrl + "mail-time-slots",
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
    .then((mailtimeMaster) => {
      console.log("mailtimeMaster", mailtimeMaster);
      dispatch(fetchMailTimeMaster(mailtimeMaster));
    })
    .catch((error) => dispatch(mailtimeMasterFailed(error)));
};

//* Get List
export const getMailTimeMasterList = (data) => (dispatch) => {
  dispatch(mailtimeMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "mail-time-slots", {
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
    .then((mailtimeMaster) => {
      console.log("mailtimeMaster", mailtimeMaster);
      dispatch(fetchMailTimeMaster(mailtimeMaster));
    })
    .catch((error) => dispatch(mailtimeMasterFailed(error)));
};

//*Post
export const postMailTimeMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(mailtimeMasterLoading());
    axios
      .post("/mail-time-slots", data, config)
      .then((mailtimeMaster) => {
        console.log("post mailtimeMaster data", mailtimeMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added New MailTime Master!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getMailTimeMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(mailtimeMasterFailed(error)));
  };
};

//* Edit
export const editMailTimeMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(mailtimeMasterLoading());
    axios
      .put(`mail-time-slots/${data.id}`, data, config)
      .then((mailtimeMaster) => {
        console.log("post mailtimeMaster data", mailtimeMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The MailTime Master!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getMailTimeMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(mailtimeMasterFailed(error)));
  };
};

//* Search
export const searchMailTimeMaster = (data, token) => (dispatch) => {
  dispatch(mailtimeMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "mail-time-slots?search=" + data.search, {
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
    .then((mailtimeMaster) => {
      console.log("mailtimeMaster", mailtimeMaster);
      dispatch(fetchMailTimeMaster(mailtimeMaster));
    })
    .catch((error) => dispatch(mailtimeMasterFailed(error)));
};

//* Delete
export const mailtimeMasterDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `mail-time-slots/${data}`, {
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
    .then((mailtimeMaster) => {
      console.log("success!", mailtimeMaster);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected MailTime Master!",
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
          dispatch(getMailTimeMasterPage(data2));
        }
      });
    })
    .catch((error) => dispatch(mailtimeMasterFailed(error)));
};

//*Fetch
export const fetchMailTimeMaster = (data) => ({
  type: ActionTypes.FETCH_MAILTIME_MASTER,
  payload: data,
});

//*Loading
export const mailtimeMasterLoading = () => ({
  type: ActionTypes.MAILTIME_MASTER_LOADING,
});

//*Failed
export const mailtimeMasterFailed = (errmess) => ({
  type: ActionTypes.MAILTIME_MASTER_FAILED,
  payload: errmess,
});
