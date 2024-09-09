import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Banks Page
export const getUnderConstructProjects = (data) => (dispatch) => {
  dispatch(underConstructProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "underConstProjects?page=" +
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
    .then((underConProjects) => {
      console.log("underConProjects", underConProjects);
      dispatch(fetchUnderConstructProjects(underConProjects));
    })
    .catch((error) => dispatch(underConstructProjectsFailed(error)));
};

//*Post
export const postUnderConstructProjects = (data) => (dispatch) => {
  // console.log("Technical Policy Post Data", data.get("subject"));
  dispatch(underConstructProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "underConstProjects", {
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
    .then((underConstProjects) => {
      console.log("post underConstProjects data", underConstProjects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Under Construction Project!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUnderConstructProjects(data));
        }
      });
    })
    .catch((error) => dispatch(underConstructProjectsFailed(error)));
};

//* Edit
export const editUnderConstructProject = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `underConstProjects/${data.id}`, {
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
    .then((underConstProjects) => {
      console.log("underConstProjects Updated", underConstProjects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Project!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUnderConstructProjects(data));
        }
      });
    })
    .catch((error) => dispatch(underConstructProjectsFailed(error)));
};

//* Search
export const searchUnderConstructProjects = (data) => (dispatch) => {
  dispatch(underConstructProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "underConstProjects?search=" + data.search, {
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
    .then((underConstProjects) => {
      console.log("underConstProjects", underConstProjects);
      dispatch(fetchUnderConstructProjects(underConstProjects));
    })
    .catch((error) => dispatch(underConstructProjectsFailed(error)));
};

//* Delete
export const underConstructProjectsDeleteAll = (data) => (dispatch) => {
  console.log("underConstructProjects Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "under-page-deleteall", {
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
    .then((underConstProjects) => {
      console.log("success!", underConstProjects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Projects!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getUnderConstructProjects(data));
        }
      });
    })
    .catch((error) => dispatch(underConstructProjectsFailed(error)));
};

//*BulkUpload
export const bulkUploadUnderConstruct = (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(underConstructProjectsLoading(true));
    axios
      .post("/import-under-page", data, config)
      .then((underConstProjects) => {
        console.log(
          "post bulkupload underConstProjects data",
          underConstProjects
        );
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Projects!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getUnderConstructProjects2(data));
          }
        });
      })
      .catch((error) => dispatch(underConstructProjectsFailed(error)));
  };
};
//*Get2
export const getUnderConstructProjects2 = (data) => (dispatch) => {
  dispatch(underConstructProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(
    baseUrl +
      "underConstProjects?page=" +
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
    .then((underConstProjects) => {
      console.log("underConstProjects", underConstProjects);
      dispatch(fetchUnderConstructProjects(underConstProjects));
    })
    .catch((error) => dispatch(underConstructProjectsFailed(error)));
};

//*Fetch
export const fetchUnderConstructProjects = (underConstProjects) => ({
  type: ActionTypes.FETCH_UNDER_CONSTRUCT_PROJECTS,
  payload: underConstProjects,
});

//*Loading
export const underConstructProjectsLoading = () => ({
  type: ActionTypes.UNDER_CONSTRUCT_PROJECTS_LOADING,
});

//*Failed
export const underConstructProjectsFailed = (errmess) => ({
  type: ActionTypes.UNDER_CONSTRUCT_PROJECTS_FAILED,
  payload: errmess,
});
