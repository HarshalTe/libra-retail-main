import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Banks Page
export const getAgreementRenewal = (data) => (dispatch) => {
  dispatch(agreementRenewal(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "bank-agreements?page=" +
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
    .then((bankagreements) => {
      console.log("bank-agreements", bankagreements);
      dispatch(fetchAgreements(bankagreements));
    })
    .catch((error) => dispatch(agreementsFailed(error)));
};

//*Post
export const agreementsPostData = (data) => (dispatch) => {
  console.log("Agreements Post Data", data);
  dispatch(agreementRenewal(true));
  const myheader = new Headers({
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(baseUrl + "bank-agreements", {
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
    .then((bankagreements) => {
      console.log("post bank-agreements data", bankagreements);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Renewed New Agreement!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          const data2 = {
            token: data.get("token"),
            pageno: data.get("pageno"),
            pageSize: data.get("pageSize"),
          };
          dispatch(getAgreementRenewal(data2));
        }
      });
    })
    .catch((error) => dispatch(agreementsFailed(error)));
};

//* close
export const agreementClose = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data?.token,
  });

  return fetch(baseUrl + `bank-agreements/${data?.id}`, {
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
    .then((bankagreements) => {
      console.log("Closed", bankagreements);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Closed the agreement!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          const data2 = {
            token: data?.token,
          };
          dispatch(getAgreementRenewal(data2));
        }
      });
    })
    .catch((error) => dispatch(agreementsFailed(error)));
};

//* Search
// export const searchBanksData = (data) => (dispatch) => {
//   console.log("Search User Data", data);
//   dispatch(agreementRenewal(true));
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token,
//   });

//   return fetch(baseUrl + "banksSearch", {
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
//     .then((banks) => {
//       console.log("search banks data", banks);
//       dispatch(fetchAgreemnets(banks));
//     })
//     .catch((error) => dispatch(agreementsFailed(error)));
// };

//* Delete
// export const deleteBanksAll = (data) => (dispatch) => {
//   console.log("Banks Post Delete", data);
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token,
//   });

//   return fetch(baseUrl + "banksdeleteall", {
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
//     .then((banks) => {
//       console.log("success!", banks);
//       Swal.fire({
//         position: "success",
//         icon: "success",
//         title: "Deleted Selected Banks!",
//         showConfirmButton: false,
//         timer: 1500,
//       }).then((result) => {
//         console.log("result", result);
//         if (result.isDismissed) {
//           dispatch(getAgreementRenewal(data));
//         }
//       });
//     })
//     .catch((error) => dispatch(agreementsFailed(error)));
// };

//*Fetch
export const fetchAgreements = (data) => ({
  type: ActionTypes.FETCH_AGREEMENTS,
  payload: data,
});

//*Loading
export const agreementRenewal = () => ({
  type: ActionTypes.AGREEMENTS_LOADING,
});

//*Failed
export const agreementsFailed = (errmess) => ({
  type: ActionTypes.AGREEMENTS_FAILED,
  payload: errmess,
});
