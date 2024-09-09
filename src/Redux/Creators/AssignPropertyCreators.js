import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

import { getPropertiesPage } from "../Creators/PropertiesCreators";
import { getCompletedPropertiesPage } from "../Creators/PropertiesCompletedCreators";

import { editPropertiesReOpen } from "../Creators/PropertiesCreators";

//* Get Get History
export const getAssignPropertyHistory = (data) => (dispatch) => {
  dispatch(assignPropertyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `assign-property?property_id=${data.property_id}`, {
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
    .then((history) => {
      console.log("history", history);
      dispatch(fetchAssignPropertyHistory(history));
    })
    .catch((error) => dispatch(assignPropertyFailed(error)));
};

//*Post
export const assignPropertyPost = (data) => (dispatch) => {
  console.log("post data", data);
  dispatch(assignPropertyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "assign-property", {
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
    .then((assignProperty) => {
      console.log("post assign-property data", assignProperty);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Reassigned The Property!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        let data2 = {
          pageno: 1,
          pageSize: 10000,
          token: data.token,
        };
        dispatch(getPropertiesPage(data2));
      });
    })
    .catch((error) => dispatch(assignPropertyFailed(error)));
};

//*ReOpen case
// export const reopenPropertyPost = (data, token,dataReOpen) => (dispatch) => {
//   console.log("post data", data);
//   dispatch(assignPropertyLoading(true));
//   const myheader = new Headers({
//     "Content-Type": "multipart/form-data",
//     // "Access-Control-Allow-Origin": "*",
//     Authorization: `Bearer ${token}`,
//   });

//   return fetch(baseUrl + "reopen-property", {
//     method: "post",
//     headers: myheader,
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then((response) => response.json())
//     .then((reopenProperty) => {
//       console.log("post reopenProperty data", reopenProperty);
//       Swal.fire({
//         position: "success",
//         icon: "success",
//         title: "Successfully Reopend The Property!",
//         showConfirmButton: false,
//         timer: 1500,
//       }).then(() => {
//         let data2 = {
//           pageno: 1,
//           pageSize: 10000,
//           token: data.token,
//         };
//         dispatch(getPropertiesPage(data2));
//         dispatch(editPropertiesReOpen(dataReOpen));
//       });
//     })
//     .catch((error) => dispatch(assignPropertyFailed(error)));
// };

export const reopenPropertyPost = (data, token,dataReOpen) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(assignPropertyLoading());
    axios
      .post(`reopen-property`, data, config)
      .then((pincodes) => {
        console.log("Reopend The Property", pincodes);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Reopend The Property!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 10000,
            };
            dispatch(getCompletedPropertiesPage(data2));
            dispatch(editPropertiesReOpen(dataReOpen));
          }
        });
      })
      .catch((error) => dispatch(assignPropertyFailed(error)));
  };
};

//*Fetch
export const fetchAssignPropertyHistory = (data) => ({
  type: ActionTypes.FETCH_ASSIGN_PROPERTY_HISTORY,
  payload: data,
});

//*Loading
export const assignPropertyLoading = () => ({
  type: ActionTypes.ASSIGN_PROPERTY_LOADING,
});

//*Failed
export const assignPropertyFailed = (errmess) => ({
  type: ActionTypes.ASSIGN_PROPERTY_FAILED,
  payload: errmess,
});
