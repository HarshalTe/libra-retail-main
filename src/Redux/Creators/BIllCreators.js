import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get list
export const getBillsList = (data) => (dispatch) => {
  dispatch(billsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "initiate-bill", {
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
    .then((bill) => {
      console.log("bill", bill);
      dispatch(fetchBills(bill));
    })
    .catch((error) => dispatch(billsFailed(error)));
};

//*Post
export const billsPostData = (data, title) => (dispatch) => {
  dispatch(billsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "initiate-bill", {
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
    .then((bill) => {
      console.log("post bill data", bill);
      Swal.fire({
        position: "success",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getBillsList(data));
        }
      });
    })
    .catch((error) => dispatch(billsFailed(error)));
};
//*Post
export const billsPostData2 = (data, title,token) => (dispatch) => {
  dispatch(billsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "initiate-bill", {
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
    .then((bill) => {
      console.log("post bill data", bill);
      Swal.fire({
        position: "success",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data={
            token:token
          }
          dispatch(getBillsList(data));
        }
      });
    })
    .catch((error) => dispatch(billsFailed(error)));
};

//* Edit
export const billsEditData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `initiate-bill/${data.id}`, {
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
    .then((bill) => {
      console.log("Bill Updated", bill);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Bill!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getBillsList(data));
        }
      });
    })
    .catch((error) => dispatch(billsFailed(error)));
};

//* Search
export const searchBillsData = (data) => (dispatch) => {
  dispatch(billsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "initiate-bill", {
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
    .then((bill) => {
      console.log("search bill data", bill);
      dispatch(fetchBills(bill));
    })
    .catch((error) => dispatch(billsFailed(error)));
};

//* Delete
export const deleteBillsAll = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "initiate-bill", {
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
    .then((bill) => {
      console.log("success!", bill);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Bills!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBillsList(data));
        }
      });
    })
    .catch((error) => dispatch(billsFailed(error)));
};

//*Fetch
export const fetchBills = (data) => ({
  type: ActionTypes.FETCH_BILLS,
  payload: data,
});

//*Loading
export const billsLoading = () => ({
  type: ActionTypes.BILLS_LOADING,
});

//*Failed
export const billsFailed = (errmess) => ({
  type: ActionTypes.BILLS_FAILED,
  payload: errmess,
});
