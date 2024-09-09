import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Banks Page
export const getRealEstatePage = (data) => (dispatch) => {
  dispatch(realEstateLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "linkDetails?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((linkDetails) => {
      console.log("linkDetails", linkDetails);
      dispatch(fetchRealEstate(linkDetails));
    })
    .catch((error) => dispatch(realEstateFailed(error)));
};

//*Post
export const postRealEstateData = (data) => (dispatch) => {
  console.log("Real Estate Post Data", data);
  dispatch(realEstateLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "linkDetails", {
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
    .then((linkDetails) => {
      console.log("post linkDetails data", linkDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Real Estate!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getRealEstatePage(data));
        }
      });
    })
    .catch((error) => dispatch(realEstateFailed(error)));
};

//* Edit
export const editRealEstateData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `linkDetails/${data.id}`, {
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
    .then((linkDetails) => {
      console.log("RealEstate Updated", linkDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Real Estate!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getRealEstatePage(data));
        }
      });
    })
    .catch((error) => dispatch(realEstateFailed(error)));
};

//* Search
export const searchRealEstate = (data) => (dispatch) => {
  dispatch(realEstateLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "linkDetails?search=" + data.search, {
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
    .then((linkDetails) => {
      console.log("linkDetails", linkDetails);
      dispatch(fetchRealEstate(linkDetails));
    })
    .catch((error) => dispatch(realEstateFailed(error)));
};

//* Delete
export const deleteRealEstateAll = (data) => (dispatch) => {
  console.log("RealEstate Post Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "linkdetailsdeleteall", {
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
    .then((linkDetails) => {
      console.log("success!", linkDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Real Estate!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getRealEstatePage(data));
        }
      });
    })
    .catch((error) => dispatch(realEstateFailed(error)));
};

//*Fetch
export const fetchRealEstate = (linkDetails) => ({
  type: ActionTypes.FETCH_REAL_ESTATE,
  payload: linkDetails,
});

//*Loading
export const realEstateLoading = () => ({
  type: ActionTypes.REAL_ESTATE_LOADING,
});

//*Failed
export const realEstateFailed = (errmess) => ({
  type: ActionTypes.REAL_ESTATE_FAILED,
  payload: errmess,
});
