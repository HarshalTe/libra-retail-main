import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get Banks list
export const getBanksList = (data) => (dispatch) => {
  dispatch(banksLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "banks", {
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
    .then((banks) => {
      console.log("banks", banks);
      dispatch(fetchBanks(banks));
    })
    .catch((error) => dispatch(banksFailed(error)));
};

//* Get Banks Page
export const getBanksPage = (data) => (dispatch) => {
  dispatch(banksLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "banks?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((banks) => {
      console.log("banks", banks);
      dispatch(fetchBanks(banks));
    })
    .catch((error) => dispatch(banksFailed(error)));
};

//*Post
export const banksPostData = (data) => (dispatch) => {
  console.log("Banks Post Data", data);
  dispatch(banksLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "banks", {
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
    .then((banks) => {
      console.log("post banks data", banks);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Bank!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: data.token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getBanksPage(data2));
        }
      });
    })
    .catch((error) => dispatch(banksFailed(error)));
};

//* Edit
export const banksEditData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `banks/${data.id}`, {
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
    .then((bank) => {
      console.log("Bank Updated", bank);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Bank!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: data.token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getBanksPage(data2));
        }
      });
    })
    .catch((error) => dispatch(banksFailed(error)));
};

//* Search
export const searchBanksData = (data) => (dispatch) => {
  console.log("Search User Data", data);
  dispatch(banksLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "banksSearch", {
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
    .then((banks) => {
      console.log("search banks data", banks);
      dispatch(fetchBanks(banks));
    })
    .catch((error) => dispatch(banksFailed(error)));
};

//* Delete
export const deleteBanksAll = (data) => (dispatch) => {
  console.log("Banks Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "banksdeleteall", {
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
    .then((banks) => {
      console.log("success!", banks);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Banks!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          let data2 = {
            token: data.token,
            pageno: 1,
            pageSize: 100,
          };
          dispatch(getBanksPage(data2));
        }
      });
    })
    .catch((error) => dispatch(banksFailed(error)));
};

//*Fetch
export const fetchBanks = (banks) => ({
  type: ActionTypes.FETCH_BANKS,
  payload: banks,
});

//*Loading
export const banksLoading = () => ({
  type: ActionTypes.BANKS_LOADING,
});

//*Failed
export const banksFailed = (errmess) => ({
  type: ActionTypes.BANKS_FAILED,
  payload: errmess,
});
