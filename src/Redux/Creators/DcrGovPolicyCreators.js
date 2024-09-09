import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Banks Page
export const getDcrGovPolicy = (data) => (dispatch) => {
  dispatch(dcrGovPolicyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "dcrs?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((dcr) => {
      console.log("dcr", dcr);
      dispatch(fetchDcrGovPolicy(dcr));
    })
    .catch((error) => dispatch(dcrGovPolicyFailed(error)));
};

//*Post
export const postDcrGovPolicy = (data) => (dispatch) => {
  dispatch(dcrGovPolicyLoading(true));
  const myheader = new Headers({
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(baseUrl + "dcrs", {
    method: "post",
    headers: myheader,
    body: data,
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
    .then((dcrs) => {
      console.log("post dcrs data", dcrs);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New DCR/GoV Policy!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: data.get("token"),
            pageno: data.get("pageno"),
            pageSize: data.get("pageSize"),
          };
          dispatch(getDcrGovPolicy(data2));
        }
      });
    })
    .catch((error) => dispatch(dcrGovPolicyFailed(error)));
};

//* Edit
export const editDcrGovLinkPolicy = (data) => (dispatch) => {
  const myheader = new Headers({
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(baseUrl + `dcrs/${data.get("id")}?_method=PUT`, {
    method: "post",
    headers: myheader,
    body: data,
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
    .then((dcrs) => {
      console.log("Dcr Updated", dcrs);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The DCR/Gov Policy!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: data.get("token"),
            pageno: data.get("pageno"),
            pageSize: data.get("pageSize"),
          };
          dispatch(getDcrGovPolicy(data2));
        }
      });
    })
    .catch((error) => dispatch(dcrGovPolicyFailed(error)));
};

//* Search
export const searchDcrGovPolicy = (data) => (dispatch) => {
  dispatch(dcrGovPolicyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dcrs?search=" + data.search, {
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
    .then((dcrs) => {
      console.log("dcrs", dcrs);
      dispatch(fetchDcrGovPolicy(dcrs));
    })
    .catch((error) => dispatch(dcrGovPolicyFailed(error)));
};

//* Delete
export const deleteDcrsGovPolicy = (data) => (dispatch) => {
  console.log("DCR/GOV Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "dcrsdeleteall", {
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
    .then((dcrs) => {
      console.log("success!", dcrs);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected DCRS/GOV Policy!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getDcrGovPolicy(data));
        }
      });
    })
    .catch((error) => dispatch(dcrGovPolicyFailed(error)));
};

//*Fetch
export const fetchDcrGovPolicy = (dcrs) => ({
  type: ActionTypes.FETCH_DCR_GOV_POLICY,
  payload: dcrs,
});

//*Loading
export const dcrGovPolicyLoading = () => ({
  type: ActionTypes.DCR_GOV_POLICY_LOADING,
});

//*Failed
export const dcrGovPolicyFailed = (errmess) => ({
  type: ActionTypes.DCR_GOV_POLICY_FAILED,
  payload: errmess,
});
