import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";
import history from "../../myCreatedHistory";

//* Get Banks Page
export const getProjectDocumentPage = (data) => (dispatch) => {
  dispatch(projectdocumentLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "project-document",
    // baseUrl + "projectdocument?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((projectdocument) => {
      console.log("projectdocument", projectdocument);
      dispatch(fetchProjectDocument(projectdocument));
    })
    .catch((error) => dispatch(projectdocumentFailed(error)));
};

//*Post
export const postProjectDocument = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(projectdocumentLoading());
    axios
      .post("/project-document", data, config)
      // .post("/pincode-upload", data, config)
      .then((projectdocument) => {
        console.log("post projectdocument data", projectdocument);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Added New Pincode!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getProjectDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(projectdocumentFailed(error)));
  };
};
//* Edit
export const editProjectDocument = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(projectdocumentLoading());
    axios
      .post(`project-document/${data.id}`, data, config)
      .then((projectdocument) => {
        console.log("post projectdocument data", projectdocument);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Pincode!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getProjectDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(projectdocumentFailed(error)));
  };
};


//* Delete
export const projectdocumentDeleteAll1 = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "project-document", {
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
    .then((projectdocument) => {
      console.log("success!", projectdocument);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected ProjectDocument!",
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
          dispatch(getProjectDocumentPage(data2));
        }
      });
    })
    .catch((error) => dispatch(projectdocumentFailed(error)));
};

//delete2
export const projectdocumentDeleteAll = (data, token) => {
  return (dispatch) => {
    if (data) {
      axios
        .delete(baseUrl + `project-document/${data.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(getProjectDocumentPage(data));
            }
          );
        })
        .catch((error) => dispatch(projectdocumentFailed()));
    }
  };
};

//*BulkUpload
export const bulkuploadProjectDocument = (data, token) => {
    console.log("object",data,token)
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(projectdocumentLoading(true));
    axios
      .post("/project-document", data, config)
      .then((pincodeUpload) => {
        console.log("post bulkupload pincodeUpload data", pincodeUpload);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New ProjectDocument!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getProjectDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(projectdocumentFailed(error)));
  };
};

export const bulkuploadProjectDocumentCases = (data, token) => {
    console.log("object",data,token)
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token.token,
    },
  };
  return (dispatch) => {
    dispatch(projectdocumentLoading(true));
    axios
      .post("/project-document", data, config)
      .then((pincodeUpload) => {
        console.log("post bulkupload pincodeUpload data", pincodeUpload);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New ProjectDocument!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getProjectDocumentPage(data2));
            if (token.page===1) {
              history.push(`/admin/viewWorkInProgress/${token.id}`);
            }
          }
        });
      })
      .catch((error) => dispatch(projectdocumentFailed(error)));
  };
};

//*Fetch
export const fetchProjectDocument = (data) => ({
  type: ActionTypes.FETCH_PROJECTDOCUMENT,
  payload: data,
});

//*Loading
export const projectdocumentLoading = () => ({
  type: ActionTypes.PROJECTDOCUMENT_LOADING,
});

//*Failed
export const projectdocumentFailed = (errmess) => ({
  type: ActionTypes.PROJECTDOCUMENT_FAILED,
  payload: errmess,
});
