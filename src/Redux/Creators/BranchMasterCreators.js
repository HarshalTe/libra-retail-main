import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Page
export const getBranchMasterPage = (data) => (dispatch) => {
  dispatch(branchMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
console.log("object1234",baseUrl + "branch-master")
  return fetch(
    baseUrl + "branch-master",
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
    .then((branchMaster) => {
      console.log("branchMaster", branchMaster);
      dispatch(fetchBranchMaster(branchMaster));
    })
    .catch((error) => dispatch(branchMasterFailed(error)));
};

//* Get List
export const getBranchMasterList = (data) => (dispatch) => {
  dispatch(branchMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "branch-master", {
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
    .then((branchMaster) => {
      console.log("branchMaster", branchMaster);
      dispatch(fetchBranchMaster(branchMaster));
    })
    .catch((error) => dispatch(branchMasterFailed(error)));
};

//*Post
export const postBranchMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(branchMasterLoading());
    axios
      .post("/branch-master", data, config)
      .then((branchMaster) => {
        console.log("post branchMaster data", branchMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added New Branch Master!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getBranchMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(branchMasterFailed(error)));
  };
};

//* Edit
export const editBranchMaster = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(branchMasterLoading());
    axios
      .put(`branch-master/${data.id}`, data, config)
      .then((branchMaster) => {
        console.log("post branchMaster data", branchMaster);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Branch Master!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getBranchMasterPage(data2));
          }
        });
      })
      .catch((error) => dispatch(branchMasterFailed(error)));
  };
};

//* Search
export const searchBranchMaster = (data, token) => (dispatch) => {
  dispatch(branchMasterLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "branch-master?search=" + data.search, {
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
    .then((branchMaster) => {
      console.log("branchMaster", branchMaster);
      dispatch(fetchBranchMaster(branchMaster));
    })
    .catch((error) => dispatch(branchMasterFailed(error)));
};

//* Delete
export const branchMasterDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `branch-master/${data.id}`, {
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
    .then((branchMaster) => {
      console.log("success!", branchMaster);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Branch Master!",
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
          dispatch(getBranchMasterPage(data2));
        }
      });
    })
    .catch((error) => dispatch(branchMasterFailed(error)));
};

//*Fetch
export const fetchBranchMaster = (data) => ({
  type: ActionTypes.FETCH_BRANCH_MASTER,
  payload: data,
});

//*Loading
export const branchMasterLoading = () => ({
  type: ActionTypes.BRANCH_MASTER_LOADING,
});

//*Failed
export const branchMasterFailed = (errmess) => ({
  type: ActionTypes.BRANCH_MASTER_FAILED,
  payload: errmess,
});
