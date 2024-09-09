import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editDocumentData = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .put(`/documents/${data.id}`, data, config)
      .then((documents) => {
        console.log("put documents data", documents);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Documents!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(documentsFailed(error)));
  };
};

//*Loading
export const documentsLoading = () => ({
  type: ActionTypes.DOCUMENTS_LOADING,
});

//*Failed
export const documentsFailed = (errmess) => ({
  type: ActionTypes.DOCUMENTS_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data) => (dispatch) => {
  dispatch(documentsLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
  console.log("object",baseUrl + "properties/" + data.id)

  return fetch(baseUrl + "properties/" + data.id, {
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
    .then((property) => {
      console.log("property", property);
      dispatch(fetchProperty(property));
      dispatch(documentsLoadingFailed());
    })
    .catch((error) => dispatch(documentsFailed(error)));
};

//!Loding false
export const documentsLoadingFailed = () => ({
  type: ActionTypes.DOCUMENTS_LOADING_FAILED,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});

//*Upload Documents
export const uploadDocuments = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .post(`/document-details`, data, config)
      .then((documentDetails) => {
        console.log("put documentDetails data", documentDetails);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Uploaded The Documents!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.get("property_id"),
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(documentsFailed(error)));
  };
};

//*delete
export const deleteDocuments = ({ id, property_id }, token) => {
  console.log("tokendata", token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    axios
      .delete(`/document-details/${id}`, config)
      .then((response) => {
        console.log("Deleted documentDetails data", response);
        Swal.fire({
          icon: "success",
          title: "Successfully Deleted The Documents!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getProperty({ id: property_id, token }));
          }
        });
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        dispatch(documentsFailed(error));
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to Delete The Documents!",
          showConfirmButton: true,
        });
      });
  };
};
