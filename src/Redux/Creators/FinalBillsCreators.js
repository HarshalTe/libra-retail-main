import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get list
export const getFinalBillsPage = (data) => (dispatch) => {
  dispatch(finalBillsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "finalBills?page=" + data.pageno + "&pageSize=" + data.pageSize,
    // baseUrl + "finalBills",
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
    .then((finalsBills) => {
      console.log("finalsBills", finalsBills);
      dispatch(fetchFinalBills(finalsBills));
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

//*Post
export const finalBillsPostData = (data) => (dispatch) => {
  dispatch(finalBillsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "finalBills", {
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
    .then((finalBills) => {
      console.log("post finalBills data", finalBills);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Final Bill!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data = {
            token: data.token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getFinalBillsPage(data));
        }
      });
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

export const finalBillsApproveAll = (data,token) => (dispatch) => {
  dispatch(finalBillsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "mass-update-bill", {
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
    .then((finalBills) => {
      console.log("post finalBills data", finalBills);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated All Bills!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data = {
            token: token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getFinalBillsPage(data));
        }
      });
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

//* Edit
export const finalBillsEditData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `finalBills/${data.id}`, {
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
    .then((finalBills) => {
      console.log("FinalBills", finalBills);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Bill!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data = {
            token: data.token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getFinalBillsPage(data));
        }
      });
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};


export const finalBillsEditData2 = (data,token,dataId) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `finalBills/${dataId}`, {
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
    .then((finalBills) => {
      console.log("FinalBills", finalBills);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Bill!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getFinalBillsPage(data2));
        }
      });
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

//*Paid Bill
export const billPaymentPost = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `finalBills/${data.id}`, {
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
    .then((finalBills) => {
      console.log("FinalBills", finalBills);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Completed The Bill Payment!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: token,
            pageno: 1,
            pageSize: 10000,
          };
          dispatch(getFinalBillsPage(data2));
        }
      });
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

//* Search
export const searchFinalBillsData = (data) => (dispatch) => {
  dispatch(finalBillsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "finalBills", {
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
      console.log("search final bill data", bill);
      dispatch(fetchFinalBills(bill));
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

//* Delete
export const deleteFinalBillsAll = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "deletefinalBills", {
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
          let data = {
            token: data.token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getFinalBillsPage(data));
        }
      });
    })
    .catch((error) => dispatch(finalBillsFailed(error)));
};

//*Fetch
export const fetchFinalBills = (data) => ({
  type: ActionTypes.FETCH_FINAL_BILLS,
  payload: data,
});

//*Loading
export const finalBillsLoading = () => ({
  type: ActionTypes.FINAL_BILLS_LOADING,
});

//*Failed
export const finalBillsFailed = (errmess) => ({
  type: ActionTypes.FINAL_BILLS_FAILED,
  payload: errmess,
});
