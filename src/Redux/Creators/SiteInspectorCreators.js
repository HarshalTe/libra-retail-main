import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get
export const getSiteInspectorsPage = (data) => (dispatch) => {
  dispatch(siteInspectorsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "get-site-inspector?page=" +
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
    .then((siteInspectors) => {
      console.log("siteInspectors", siteInspectors);
      dispatch(fetchSiteInspectors(siteInspectors));
    })
    .catch((error) => dispatch(siteInspectorsFailed(error)));
};

//* Search
export const searchSiteInspectors = (data) => (dispatch) => {
  dispatch(siteInspectorsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "get-site-inspector?search=" + data.search, {
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
    .then((siteInspectors) => {
      console.log("siteInspectors", siteInspectors);
      dispatch(fetchSiteInspectors(siteInspectors));
    })
    .catch((error) => dispatch(siteInspectorsFailed(error)));
};

//*Fetch
export const fetchSiteInspectors = (data) => ({
  type: ActionTypes.FETCH_SITE_INSPECTORS,
  payload: data,
});

//*Loading
export const siteInspectorsLoading = () => ({
  type: ActionTypes.SITE_INSPECTORS_LOADING,
});

//*Failed
export const siteInspectorsFailed = (errmess) => ({
  type: ActionTypes.SITE_INSPECTORS_FAILED,
  payload: errmess,
});

//*assign cases
export const siteInspectorsAssignPostData =
  (data, allocateCaseModal, setSelected) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });

    return fetch(baseUrl + "mass-assign", {
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
      .then((massAssign) => {
        console.log("success!", massAssign);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Assigned Cases!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          console.log("result", result);
          if (result.isDismissed) {
            allocateCaseModal(false);
            setSelected([]);
            dispatch(getSiteInspectorsPage(data));
          }
        });
      })
      .catch((error) => dispatch(siteInspectorsFailed(error)));
  };
