import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get List
export const getdropdownDetailsList = (data) => (dispatch) => {
  dispatch(dropdownDetailsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dropdownDetails", {
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
    .then((dropdownDetails) => {
      console.log("dropdownDetails", dropdownDetails);
      dispatch(fetchDropdownDetails(dropdownDetails));
    })
    .catch((error) => dispatch(dropdownDetailsFailed(error)));
};

//*Page Get
export const getdropdownDetailsPage = (data) => (dispatch) => {
  dispatch(dropdownDetailsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "dropdownDetails?page=" +
      data.pageno +
      "&pageSize=" +
      data.pageSize,
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
    .then((dropdownDetails) => {
      console.log("dropdownDetails", dropdownDetails);
      dispatch(fetchDropdownDetails(dropdownDetails));
    })
    .catch((error) => dispatch(dropdownDetailsFailed(error)));
};

//*Dropdown Details Post Data
export const dropdownDetailsPostData = (data) => (dispatch) => {
  console.log("DropdownDetails Post creator data", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dropdownDetails", {
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
    .then((dropdownDetails) => {
      console.log("success!", dropdownDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added New Master Document!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getdropdownDetailsPage(data));
        }
      });
    })
    .catch((error) => dispatch(dropdownDetailsFailed(error)));
};

//* MasterDocument Edit Data
export const EditMasterDocumentsData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  // return fetch(baseUrl + `/dropdownDetails/${data.id}?_method=PUT`, {
  return fetch(baseUrl + `dropdownDetails/${data.id}`, {
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
    .then((masterDocuments) => {
      console.log("Master Document Updated", masterDocuments);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated MasterDocument!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getdropdownDetailsPage(data));
        }
      });
    })
    .catch((error) => dispatch(dropdownDetailsFailed(error)));
};

//* Delete All
export const deleteMasterDocumentsAll = (data) => (dispatch) => {
  console.log("DropdownDetails Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
  let deleteData={ids:data?.ids}
console.log("datawww",deleteData)
  return fetch(baseUrl + `dropdownDetails`, {
    method: "delete",
    headers: myheader,
    body: JSON.stringify(deleteData),
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
    .then((dropdownDetails) => {
      console.log("success!", dropdownDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Master Documents!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getdropdownDetailsList(data));
        }
      });
    })
    .catch((error) => dispatch(dropdownDetailsFailed(error)));
};

//* Search
export const searchDropdownDetailsData = (data) => (dispatch) => {
  console.log("Search DropdownDetails data", data);
  dispatch(dropdownDetailsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dropdownDetailsSearch", {
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
    .then((dropdownDetails) => {
      console.log("search dropdownDetails data", dropdownDetails);
      dispatch(fetchDropdownDetails(dropdownDetails));
    })
    .catch((error) => dispatch(dropdownDetailsFailed(error)));
};

//* fetch data
export const fetchDropdownDetails = (dropdownDetails) => ({
  type: ActionTypes.FETCH_DROPDOWN_DETAILS,
  payload: dropdownDetails,
});

//* loading
export const dropdownDetailsLoading = () => ({
  type: ActionTypes.DROPDOWN_DETAILS_LOADING,
});

//*Failed
export const dropdownDetailsFailed = (errmess) => ({
  type: ActionTypes.DROPDOWN_DETAILS_FAILED,
  payload: errmess,
});
