import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import axios from "../../shared/axios";
import Swal from "sweetalert2";

//* Get Banks Page
export const getNegativeProjectsPage = (data) => (dispatch) => {
  dispatch(negativeProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "negativeProjects?page=" +
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
    .then((negativeProjects) => {
      console.log("negativeProjects", negativeProjects);
      dispatch(fetchNegativeProjects(negativeProjects));
    })
    .catch((error) => dispatch(negativeProjectsFailed(error)));
};

//* FormData Get negative Projjects Page
export const getFormDataNegativeProjectsPage = (data) => (dispatch) => {
  dispatch(negativeProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(
    baseUrl +
      "negativeProjects?page=" +
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
    .then((negativeProjects) => {
      console.log("negativeProjects", negativeProjects);
      dispatch(fetchNegativeProjects(negativeProjects));
    })
    .catch((error) => dispatch(negativeProjectsFailed(error)));
};

//*Post
export const negativeProjectsPostData = (token, data) => (dispatch) => {
  const project_name = data.get("project_name");
  const address = data.get("address");
  const pincode = data.get("pincode");
  const reasons = data.get("reasons");
  const file = data.get("file");

  console.log("FormData negative", {
    project_name,
    address,
    pincode,
    reasons,
    file,
  });

  dispatch(negativeProjectsLoading(true));
  const myheader = new Headers({
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "negativeProjects", {
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
    .then((negativeProjects) => {
      console.log("post negativeProjects data", negativeProjects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Negative Project!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getFormDataNegativeProjectsPage(data));
        }
      });
    })
    .catch((error) => dispatch(negativeProjectsFailed(error)));
};

//*Post method by axios
export const negativeProjectsPostData2 = (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(negativeProjectsLoading(true));
    axios
      .post("/negativeProjects", data, config)
      .then((negativeProjects) => {
        console.log("post negativeProjects data", negativeProjects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Project!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getFormDataNegativeProjectsPage(data));
          }
        });
      })
      .catch((error) => dispatch(negativeProjectsFailed(error)));
  };
};

//* Edit
export const negativeProjectsEditData = (data) => {
  console.log("file:", data.get("file"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(negativeProjectsLoading(true));
    axios
      .post(`/negativeProjects/${data.get("id")}?_method=PUT`, data, config)
      .then((negativeProjects) => {
        console.log("Put  negativeProjects data", negativeProjects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully updated the project!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getFormDataNegativeProjectsPage(data));
          }
        });
      })
      .catch((error) => dispatch(negativeProjectsFailed(error)));
  };
};

//*upload file with axios
export const negativeProjectsEditData2 = (data) => {
  console.log("file:", data.get("file"));
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(negativeProjectsLoading(true));
    axios
      .post(`/negativeProjects/${data.get("id")}?_method=PUT`, data, config)
      .then((negativeProjects) => {
        console.log("Put  negativeProjects data", negativeProjects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully uploaded the file!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getFormDataNegativeProjectsPage(data));
          }
        });
      })
      .catch((error) => dispatch(negativeProjectsFailed(error)));
  };
};

//* Bulk Upload
export const bulkUploadData = (data) => (dispatch) => {
  console.log("data file", data.get("file"));
  dispatch(negativeProjectsLoading(true));
  const myheader = new Headers({
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(baseUrl + "importNegative", {
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
    .then((negativeProjects) => {
      console.log("post bulk upload data", negativeProjects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Uploaded All New Negative Projects!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          // dispatch(getFormDataNegativeProjectsPage(data));
          console.log("hello");
        }
      });
    })
    .catch((error) => dispatch(negativeProjectsFailed(error)));
};

//*BulkUpload Axios
export const bulkUploadNegativeProjects = (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.get("token")}`,
    },
  };
  return (dispatch) => {
    dispatch(negativeProjectsLoading(true));
    axios
      .post("/importNegative", data, config)
      .then((negativeProjects) => {
        console.log("post bulkupload negativeProjects data", negativeProjects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Projects!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getFormDataNegativeProjectsPage(data));
          }
        });
      })
      .catch((error) => dispatch(negativeProjectsFailed(error)));
  };
};

export const searchNegativeProjectsData = (data) => (dispatch) => {
  dispatch(negativeProjectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "negativeProjects?search=" + data.search, {
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
    .then((negativeProjects) => {
      console.log("negativeProjects", negativeProjects);
      dispatch(fetchNegativeProjects(negativeProjects));
    })
    .catch((error) => dispatch(negativeProjectsFailed(error)));
};

//* Delete
export const deleteNegativeProjectsAll = (data) => (dispatch) => {
  console.log("Negative Projects Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "negativesdeleteall", {
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
    .then((negativeProjects) => {
      console.log("success!", negativeProjects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Negative Projects!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getNegativeProjectsPage(data));
        }
      });
    })
    .catch((error) => dispatch(negativeProjectsFailed(error)));
};

//*Fetch
export const fetchNegativeProjects = (negativeProjects) => ({
  type: ActionTypes.FETCH_NEGATIVE_PROJECTS,
  payload: negativeProjects,
});

//*Loading
export const negativeProjectsLoading = () => ({
  type: ActionTypes.NEGATIVE_PROJECTS_LOADING,
});

//*Failed
export const negativeProjectsFailed = (errmess) => ({
  type: ActionTypes.NEGATIVE_PROJECTS_FAILED,
  payload: errmess,
});
