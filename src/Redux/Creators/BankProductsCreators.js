import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get List
export const getBankProductsList = (data) => (dispatch) => {
  dispatch(bankProductsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankProducts", {
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
    .then((bankProducts) => {
      console.log("bankProducts", bankProducts);
      dispatch(fetchBankProducts(bankProducts));
    })
    .catch((error) => dispatch(bankProductsFailed(error)));
};

//*Page Get
export const getBankProductsPage = (data) => (dispatch) => {
  dispatch(bankProductsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "bankProducts?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((bankProducts) => {
      console.log("bankProducts", bankProducts);
      dispatch(fetchBankProducts(bankProducts));
    })
    .catch((error) => dispatch(bankProductsFailed(error)));
};

//*Post
export const bankProductsPostData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankProducts", {
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
    .then((bankProducts) => {
      console.log("success!", bankProducts);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added New Bank Product!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBankProductsPage(data));
        }
      });
    })
    .catch((error) => dispatch(bankProductsFailed(error)));
};

//* Edit
export const editBankProductsData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `bankProducts/${data.id}`, {
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
    .then((bankProducts) => {
      console.log("Updated", bankProducts);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Bank Product!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBankProductsPage(data));
        }
      });
    })
    .catch((error) => dispatch(bankProductsFailed(error)));
};

//* Delete All
export const deleteBankProductsAll = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankProductsDeleteAll", {
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
    .then((bankProducts) => {
      console.log("success!", bankProducts);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Bank Products!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBankProductsPage(data));
        }
      });
    })
    .catch((error) => dispatch(bankProductsFailed(error)));
};

//* Search
export const searchBankProductsData = (data) => (dispatch) => {
  dispatch(bankProductsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "bankProducts", {
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
    .then((bankProducts) => {
      console.log("search bankProducts data", bankProducts);
      dispatch(fetchBankProducts(bankProducts));
    })
    .catch((error) => dispatch(bankProductsFailed(error)));
};

//* fetch data
export const fetchBankProducts = (data) => ({
  type: ActionTypes.FETCH_BANK_PRODUCTS,
  payload: data,
});

//* loading
export const bankProductsLoading = () => ({
  type: ActionTypes.BANK_PRODUCTS_LOADING,
});

//*Failed
export const bankProductsFailed = (errmess) => ({
  type: ActionTypes.BANK_PRODUCTS_FAILED,
  payload: errmess,
});
