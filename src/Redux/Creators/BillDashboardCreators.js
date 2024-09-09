import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Banks Page
export const getBillDashboard = (data) => (dispatch) => {
  dispatch(pincodesLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "get-stats", {
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
    .then((getStats) => {
      console.log("getStats", getStats);
      dispatch(fetchBillDashboard(getStats));
    })
    .catch((error) => dispatch(billDashboardFailed(error)));
};

//*Fetch
export const fetchBillDashboard = (data) => ({
  type: ActionTypes.FETCH_BILL_DASHBOARD,
  payload: data,
});

//*Loading
export const pincodesLoading = () => ({
  type: ActionTypes.BILL_DASHBOARD_LOADING,
});

//*Failed
export const billDashboardFailed = (errmess) => ({
  type: ActionTypes.BILL_DASHBOARD_FAILED,
  payload: errmess,
});
