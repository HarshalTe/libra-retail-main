import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get List
export const getBankVerticalsList = (data) => (dispatch) => {
  dispatch(bankVerticalsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankVerticals", {
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
    .then((bankVerticals) => {
      console.log("bankVerticals", bankVerticals);
      dispatch(setBankVerticals(bankVerticals));
    })
    .catch((error) => dispatch(bankVerticalsFailed(error)));
};

//!fix this and put pageno
//* Get
export const getBankVerticals = (data) => (dispatch) => {
  dispatch(bankVerticalsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankVerticals", {
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
    .then((bankVerticals) => {
      console.log("bankVerticals", bankVerticals);
      dispatch(setBankVerticals(bankVerticals));
    })
    .catch((error) => dispatch(bankVerticalsFailed(error)));
};

export const bankVerticalsPostData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankVerticals", {
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
    .then((bankVerticals) => {
      console.log("success!", bankVerticals);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added New Bank Vertical!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBankVerticalsList(data));
        }
      });
    })
    .catch((error) => dispatch(bankVerticalsFailed(error)));
};

export const setBankVerticals = (data) => {
  console.log("bankVerticals2", data);
  return {
    type: ActionTypes.SET_BANK_VERTICALS,
    payload: data,
  };
};

export const bankVerticalsLoading = () => ({
  type: ActionTypes.BANK_VERTICALS_LOADING,
});

export const bankVerticalsFailed = (errmess) => ({
  type: ActionTypes.BANK_VERTICALS_FAILED,
  payload: errmess,
});
