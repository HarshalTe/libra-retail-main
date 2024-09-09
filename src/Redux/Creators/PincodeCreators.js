import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Banks Page
export const getPincodesPage = (data) => (dispatch) => {
  dispatch(pincodesLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "pincodes?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((pincodes) => {
      console.log("pincodes", pincodes);
      dispatch(fetchPincodes(pincodes));
    })
    .catch((error) => dispatch(pincodesFailed(error)));
};

//*Post
export const postPincodes = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(pincodesLoading());
    axios
      .post("/pincodes", data, config)
      // .post("/pincode-upload", data, config)
      .then((pincodes) => {
        console.log("post pincodes data", pincodes);
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
            dispatch(getPincodesPage(data2));
          }
        });
      })
      .catch((error) => dispatch(pincodesFailed(error)));
  };
};

// export const postDocumentData = (data, user, toggle) => {
//   return (dispatch) => {
//     dispatch(pincodesLoading());

//     axios
//       .post(baseUrl + "pincodes", user, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data?.token,
//         },
//       })
//       .then(() => {
//         console.log("swal");
//         Swal.fire({
//           position: "success",
//           icon: "success",
//           title: "Successfully Added New Pincode!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(pincodesFailed(error));
//       });
//   };
// };


//* Edit
export const editPincodes = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
  };
  return (dispatch) => {
    dispatch(pincodesLoading());
    axios
      .post(`pincodes/${token.id}`, data, config)
      .then((pincodes) => {
        console.log("post pincodes data", pincodes);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Pincode!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getPincodesPage(data2));
          }
        });
      })
      .catch((error) => dispatch(pincodesFailed(error)));
  };
};

//* Search
export const searchPincodes = (data, token) => (dispatch) => {
  dispatch(pincodesLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "pincodes?search=" + data.search, {
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
    .then((pincodes) => {
      console.log("pincodes", pincodes);
      dispatch(fetchPincodes(pincodes));
    })
    .catch((error) => dispatch(pincodesFailed(error)));
};

//* Delete
export const pincodeDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "pincode-delete-all", {
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
    .then((pincodes) => {
      console.log("success!", pincodes);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Pincodes!",
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
          dispatch(getPincodesPage(data2));
        }
      });
    })
    .catch((error) => dispatch(pincodesFailed(error)));
};

//delete2
export const deletePincode = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `pincodes/${data.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(getPincodesPage(data));
            }
          );
        })
        .catch((error) => dispatch(pincodesFailed()));
    }
  };
};

//*BulkUpload
export const bulkuploadPincodes = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(pincodesLoading(true));
    axios
      .post("/pincodes", data, config)
      .then((pincodeUpload) => {
        console.log("post bulkupload pincodeUpload data", pincodeUpload);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Uploaded All New Pincodes!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getPincodesPage(data2));
          }
        });
      })
      .catch((error) => dispatch(pincodesFailed(error)));
  };
};

//*Fetch
export const fetchPincodes = (data) => ({
  type: ActionTypes.FETCH_PINCODES,
  payload: data,
});

//*Loading
export const pincodesLoading = () => ({
  type: ActionTypes.PINCODES_LOADING,
});

//*Failed
export const pincodesFailed = (errmess) => ({
  type: ActionTypes.PINCODES_FAILED,
  payload: errmess,
});
