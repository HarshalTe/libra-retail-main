import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";
import history from "../../myCreatedHistory";

//* Get Banks Page
export const getDocumentPage = (data) => (dispatch) => {
  dispatch(documentLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "propertyDocs",
    // baseUrl + "document?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((document) => {
      console.log("document", document);
      dispatch(fetchDocument(document));
    })
    .catch((error) => dispatch(documentFailed(error)));
};

//*Post
export const postDocument = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(documentLoading());
    axios
      .post("/propertyDocs", data, config)
      // .post("/pincode-upload", data, config)
      .then((document) => {
        console.log("post document data", document);
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
            dispatch(getDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(documentFailed(error)));
  };
};
//* Edit
export const editDocument = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(documentLoading());
    axios
      .post(`propertyDocs/${data.id}`, data, config)
      .then((document) => {
        console.log("post document data", document);
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
            dispatch(getDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(documentFailed(error)));
  };
};


//* Delete
export const documentDeleteAll1 = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "propertyDocs", {
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
    .then((document) => {
      console.log("success!", document);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Document!",
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
          dispatch(getDocumentPage(data2));
        }
      });
    })
    .catch((error) => dispatch(documentFailed(error)));
};

//delete2
export const documentDeleteAll = (data, token) => {
  return (dispatch) => {
    if (data) {
      axios
        .delete(baseUrl + `propertyDocs/${data.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(getDocumentPage(data));
            }
          );
        })
        .catch((error) => dispatch(documentFailed()));
    }
  };
};

//*BulkUpload
export const bulkuploadDocument = (data, token) => {
    console.log("object",data,token)
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(documentLoading(true));
    axios
      .post("/propertyDocs", data, config)
      .then((pincodeUpload) => {
        console.log("post bulkupload pincodeUpload data", pincodeUpload);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Document!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getDocumentPage(data2));
          }
        });
      })
      .catch((error) => dispatch(documentFailed(error)));
  };
};

export const bulkuploadDocumentCases = (data, token) => {
    console.log("object",data,token)
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token.token,
    },
  };
  return (dispatch) => {
    dispatch(documentLoading(true));
    axios
      .post("/propertyDocs", data, config)
      .then((pincodeUpload) => {
        console.log("post bulkupload pincodeUpload data", pincodeUpload);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Document!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getDocumentPage(data2));
            if (token.page===1) {
              history.push(`/admin/viewWorkInProgress/${token.id}`);
            }
          }
        });
      })
      .catch((error) => dispatch(documentFailed(error)));
  };
};

//*Fetch
export const fetchDocument = (data) => ({
  type: ActionTypes.FETCH_DOCUMENT,
  payload: data,
});

//*Loading
export const documentLoading = () => ({
  type: ActionTypes.DOCUMENT_LOADING,
});

//*Failed
export const documentFailed = (errmess) => ({
  type: ActionTypes.DOCUMENT_FAILED,
  payload: errmess,
});
