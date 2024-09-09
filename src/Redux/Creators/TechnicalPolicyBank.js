import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Banks Page
export const getTechnicalPolicy = (data) => (dispatch) => {
  dispatch(technicalPolicyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "techPages?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((techPages) => {
      console.log("techPages", techPages);
      dispatch(fetchTechnicalPolicy(techPages));
    })
    .catch((error) => dispatch(technicalPolicyFailed(error)));
};

//*Post
export const postTechnicalPolicy = (data) => (dispatch) => {
  // console.log("Technical Policy Post Data", data.get("subject"));
  dispatch(technicalPolicyLoading(true));
  const myheader = new Headers({
    // Accept: "application/json",
    // "Content-Type": "multipart/form-data",
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(baseUrl + "techPages", {
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
    .then((techPages) => {
      console.log("post techPages data", techPages);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Technical Policy!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getTechnicalPolicy2(data));
        }
      });
    })
    .catch((error) => dispatch(technicalPolicyFailed(error)));
};

//*Post2
export const postTechnicalPolicy2 = (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(technicalPolicyLoading(true));
    axios
      .post("/techPages", data, config)
      .then((techPages) => {
        console.log("post techPages data", techPages);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Technical Policy!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getTechnicalPolicy2(data));
          }
        });
      })
      .catch((error) => dispatch(technicalPolicyFailed(error)));
  };
};
//*Get2
export const getTechnicalPolicy2 = (data) => (dispatch) => {
  dispatch(technicalPolicyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(
    baseUrl +
      "techPages?page=" +
      data.get("pageno") +
      "&pageSize=" +
      data.get("pageSize"),
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
    .then((techPages) => {
      console.log("techPages", techPages);
      dispatch(fetchTechnicalPolicy(techPages));
    })
    .catch((error) => dispatch(technicalPolicyFailed(error)));
};

//* Edit
export const editTechnicalPolicy = (data) => (dispatch) => {
  const myheader = new Headers({
    // Accept: "application/json",
    Accept: "multipart/form-data",
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(baseUrl + `techPages/${data.get("id")}`, {
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
    .then((techPages) => {
      console.log("Technical Policy Updated", techPages);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Technical Policy!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getTechnicalPolicy(data));
        }
      });
    })
    .catch((error) => dispatch(technicalPolicyFailed(error)));
};

//* Search
export const searchTechnicalPolicy = (data) => (dispatch) => {
  dispatch(technicalPolicyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "techPages?search=" + data.search, {
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
    .then((techPages) => {
      console.log("techPages", techPages);
      dispatch(fetchTechnicalPolicy(techPages));
    })
    .catch((error) => dispatch(technicalPolicyFailed(error)));
};

//* Delete
export const deleteTechnicalPolicyAll = (data) => (dispatch) => {
  console.log("Technical Policy Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "techdeleteall", {
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
    .then((techPages) => {
      console.log("success!", techPages);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Technical Policy!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getTechnicalPolicy(data));
        }
      });
    })
    .catch((error) => dispatch(technicalPolicyFailed(error)));
};

//*Fetch
export const fetchTechnicalPolicy = (linkDetails) => ({
  type: ActionTypes.FETCH_TECH_POLICY,
  payload: linkDetails,
});

//*Loading
export const technicalPolicyLoading = () => ({
  type: ActionTypes.TECH_POLICY_LOADING,
});

//*Failed
export const technicalPolicyFailed = (errmess) => ({
  type: ActionTypes.TECH_POLICY_FAILED,
  payload: errmess,
});
