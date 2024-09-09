import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Branches Page
export const getBranchesPage = (data) => (dispatch) => {
  dispatch(branchesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    // baseUrl + "branches?page=" + data.pageno + "&pageSize=" + data.pageSize,
    baseUrl + "branches?page=" + 1 + "&pageSize=" + 10000000,
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
    .then((branches) => {
      console.log("branches", branches);
      dispatch(fetchBranches(branches));
    })
    .catch((error) => dispatch(branchesFailed(error)));
};

//!Get Branches List
export const getBranchesList = (data) => (dispatch) => {
  dispatch(branchesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "branches", {
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
    .then((branches) => {
      console.log("branches", branches);
      dispatch(fetchBranches(branches));
    })
    .catch((error) => dispatch(branchesFailed(error)));
};

//*Post
export const branchesPostData = (data) => (dispatch) => {
  console.log("Branches Post Data", data);
  dispatch(branchesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "branches", {
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
    .then((branches) => {
      console.log("post branches data", branches);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Branch!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getBranchesPage(data));
        }
      });
    })
    .catch((error) => console.log(error));

    // .catch((error) => dispatch(branchesFailed(error)));
};

//* Edit
export const branchesEditData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `branches/${data.id}`, {
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
    .then((branches) => {
      console.log("Branch Updated", branches);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Branch!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getBranchesPage(data));
        }
      });
    })
    .catch((error) => dispatch(branchesFailed(error)));
};

//* Search
export const searchBranchesData = (data) => (dispatch) => {
  dispatch(branchesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "branches?search=" + data.search, {
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
    .then((branches) => {
      console.log("branches", branches);
      dispatch(fetchBranches(branches));
    })
    .catch((error) => dispatch(branchesFailed(error)));
};

//* Delete
export const deleteBranchsesAll = (data) => (dispatch) => {
  console.log("Braches Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "branchesdeleteall", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data.branches),
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
    .then((branches) => {
      console.log("success!", branches);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Branches!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBranchesPage(data));
        }
      });
    })
    .catch((error) => dispatch(branchesFailed(error)));
};

//*Fetch
export const fetchBranches = (branches) => ({
  type: ActionTypes.FETCH_BRANCHES,
  payload: branches,
});

//*Loading
export const branchesLoading = () => ({
  type: ActionTypes.BRANCHES_LOADING,
});

//*Failed
export const branchesFailed = (errmess) => ({
  type: ActionTypes.BRANCHES_FAILED,
  payload: errmess,
});
