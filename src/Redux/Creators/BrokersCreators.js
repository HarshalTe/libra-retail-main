import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Brokers Page
export const getBrokers = (data) => (dispatch) => {
  dispatch(brokersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "brokers?page=" + data.pageno + "&pageSize=" + data.pageSize,
    // baseUrl + "brokers",
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
    .then((brokers) => {
      console.log("brokers", brokers);
      dispatch(fetchBrokers(brokers));
    })
    .catch((error) => dispatch(brokersFailed(error)));
};

//* Get Brokers List
export const getBrokersList = (data) => (dispatch) => {
  dispatch(brokersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "brokers", {
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
    .then((brokers) => {
      console.log("brokers", brokers);
      dispatch(fetchBrokers(brokers));
    })
    .catch((error) => dispatch(brokersFailed(error)));
};

//*Post
export const postBrokers = (data) => (dispatch) => {
  // console.log("Technical Policy Post Data", data.get("subject"));
  dispatch(brokersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "brokers", {
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
      // let error = new Error("Error" + response.json());

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((brokers) => {
      console.log("post brokers data", brokers);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Broker!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getBrokers(data));
        }
      });
    })
    .catch((error) => dispatch(brokersFailed(error)));
};

//* Edit
export const editBrokersData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `brokers/${data.id}`, {
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
    .then((brokers) => {
      console.log("brokers Updated", brokers);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Broker!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getBrokers(data));
        }
      });
    })
    .catch((error) => dispatch(brokersFailed(error)));
};

//* Search
export const searchBroker = (data) => (dispatch) => {
  dispatch(brokersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "brokers?search=" + data.search, {
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
    .then((brokers) => {
      console.log("brokers", brokers);
      dispatch(fetchBrokers(brokers));
    })
    .catch((error) => dispatch(brokersFailed(error)));
};

//* Delete
export const brokerDeleteAll = (data) => (dispatch) => {
  console.log("brokers Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "broker-deleteall", {
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
    .then((brokers) => {
      console.log("success!", brokers);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Brokers!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getBrokers(data));
        }
      });
    })
    .catch((error) => dispatch(brokersFailed(error)));
};

//*Fetch
export const fetchBrokers = (data) => ({
  type: ActionTypes.FETCH_BROKERS,
  payload: data,
});

//*Loading
export const brokersLoading = () => ({
  type: ActionTypes.BROKERS_LOADING,
});

//*Failed
export const brokersFailed = (errmess) => {
  console.log("errormessage", errmess);
  return {
    type: ActionTypes.BROKERS_FAILED,
    payload: errmess,
  };
};
