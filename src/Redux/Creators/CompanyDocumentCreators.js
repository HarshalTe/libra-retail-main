import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Page
export const getCompanyDocumentPage = (data) => (dispatch) => {
  dispatch(companyDocumentLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
console.log("object1234",baseUrl + "branch-documents")
  return fetch(
    baseUrl + "branch-documents",
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
    .then((companyDocument) => {
      console.log("companyDocument", companyDocument);
      dispatch(fetchCompanyDocument(companyDocument));
    })
    .catch((error) => dispatch(companyDocumentFailed(error)));
};

//* Get List
export const getCompanyDocumentList = (data) => (dispatch) => {
  dispatch(companyDocumentLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "branch-documents", {
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
    .then((companyDocument) => {
      console.log("companyDocument", companyDocument);
      dispatch(fetchCompanyDocument(companyDocument));
    })
    .catch((error) => dispatch(companyDocumentFailed(error)));
};

//*Post
export const postCompanyDocument = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(companyDocumentLoading());
    axios
      .post("/branch-documents", data, config)
      .then((companyDocument) => {
        console.log("post companyDocument data", companyDocument);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added New Libra Company Document!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getCompanyDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(companyDocumentFailed(error)));
  };
};

//* Edit
export const editCompanyDocument = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(companyDocumentLoading());
    axios
      .put(`branch-documents/${data.id}`, data, config)
      .then((companyDocument) => {
        console.log("post companyDocument data", companyDocument);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Libra Company Document!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getCompanyDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(companyDocumentFailed(error)));
  };
};

//* Search
export const searchCompanyDocument = (data, token) => (dispatch) => {
  dispatch(companyDocumentLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "branch-documents?search=" + data.search, {
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
    .then((companyDocument) => {
      console.log("companyDocument", companyDocument);
      dispatch(fetchCompanyDocument(companyDocument));
    })
    .catch((error) => dispatch(companyDocumentFailed(error)));
};

//* Delete
export const companyDocumentDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `branch-documents/${data.id}`, {
    method: "delete",
    headers: myheader,
    // body: JSON.stringify(data),
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
    .then((companyDocument) => {
      console.log("success!", companyDocument);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Libra Company Document!",
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
          dispatch(getCompanyDocumentPage(data2));
        }
      });
    })
    .catch((error) => dispatch(companyDocumentFailed(error)));
};

//*Fetch
export const fetchCompanyDocument = (data) => ({
  type: ActionTypes.FETCH_COMPANY_DOCUMENT,
  payload: data,
});

//*Loading
export const companyDocumentLoading = () => ({
  type: ActionTypes.COMPANY_DOCUMENT_LOADING,
});

//*Failed
export const companyDocumentFailed = (errmess) => ({
  type: ActionTypes.COMPANY_DOCUMENT_FAILED,
  payload: errmess,
});
