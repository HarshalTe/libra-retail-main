import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Page
export const getPaymentMasterPage = (data) => (dispatch) => {
  dispatch(paymentMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
console.log("object1234",baseUrl + "payements?page=" + data.pageno + "&pageSize=" + data.pageSize)
  return fetch(
    baseUrl + "payements?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((paymentMaster) => {
      console.log("paymentMaster", paymentMaster);
      dispatch(fetchPaymentMaster(paymentMaster));
    })
    .catch((error) => dispatch(paymentMasterFailed(error)));
};

//* Get List
export const getPaymentMasterList = (data) => (dispatch) => {
  dispatch(paymentMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "payements", {
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
    .then((paymentMaster) => {
      console.log("paymentMaster", paymentMaster);
      dispatch(fetchPaymentMaster(paymentMaster));
    })
    .catch((error) => dispatch(paymentMasterFailed(error)));
};

//*Post
export const postPaymentMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(paymentMasterLoading());
    axios
      .post("/payements", data, config)
      .then((paymentMaster) => {
        console.log("post paymentMaster data", paymentMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added New Libra Bank Details!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getPaymentMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(paymentMasterFailed(error)));
  };
};

//* Edit
export const editPaymentMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
  };
  return (dispatch) => {
    dispatch(paymentMasterLoading());
    axios
      .post(`payements/${token.id}`, data, config)
      .then((paymentMaster) => {
        console.log("post paymentMaster data", paymentMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Libra Bank Details!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getPaymentMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(paymentMasterFailed(error)));
  };
};

//* Search
export const searchPaymentMaster = (data, token) => (dispatch) => {
  dispatch(paymentMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "payements?search=" + data.search, {
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
    .then((paymentMaster) => {
      console.log("paymentMaster", paymentMaster);
      dispatch(fetchPaymentMaster(paymentMaster));
    })
    .catch((error) => dispatch(paymentMasterFailed(error)));
};

//* Delete
export const paymentMasterDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "payement-delete-all", {
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
    .then((paymentMaster) => {
      console.log("success!", paymentMaster);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Libra Bank Details!",
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
          dispatch(getPaymentMasterPage(data2));
        }
      });
    })
    .catch((error) => dispatch(paymentMasterFailed(error)));
};

//*Fetch
export const fetchPaymentMaster = (data) => ({
  type: ActionTypes.FETCH_PAYMENT_MASTER,
  payload: data,
});

//*Loading
export const paymentMasterLoading = () => ({
  type: ActionTypes.PAYMENT_MASTER_LOADING,
});

//*Failed
export const paymentMasterFailed = (errmess) => ({
  type: ActionTypes.PAYMENT_MASTER_FAILED,
  payload: errmess,
});
