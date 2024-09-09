import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Queries Page
export const getQueriesPage = (data) => (dispatch) => {
  dispatch(queriesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "queries?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((queries) => {
      console.log("queries", queries);
      dispatch(fetchQueries(queries));
    })
    .catch((error) => dispatch(queriesFailed(error)));
};

//*Post
export const queriesPostData = (data) => (dispatch) => {
  dispatch(queriesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "queries", {
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
    .then((queries) => {
      console.log("post queries data", queries);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Query!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getQueriesPage(data));
        }
      });
    })
    .catch((error) => dispatch(queriesFailed(error)));
};

//*Edit
export const queriesEditData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `queries/${data.id}`, {
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
    .then((bank) => {
      console.log("Query Updated", bank);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Query!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getQueriesPage(data));
        }
      });
    })
    .catch((error) => dispatch(queriesFailed(error)));
};

//* Search
export const searchQueriesData = (data) => (dispatch) => {
  dispatch(queriesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "queries?search=" + data.search, {
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
    .then((queries) => {
      console.log("queries", queries);
      dispatch(fetchQueries(queries));
    })
    .catch((error) => dispatch(queriesFailed(error)));
};

//* Delete
export const deleteQueriesAll = (data) => (dispatch) => {
  //*details parameter
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "queriesdeleteall", {
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
    .then((queries) => {
      console.log("success!", queries);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Queries!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getQueriesPage(data));
        }
      });
    })
    .catch((error) => dispatch(queriesFailed(error)));
};

//*Fetch
export const fetchQueries = (data) => ({
  type: ActionTypes.FETCH_QUERIES,
  payload: data,
});

//*Loading
export const queriesLoading = () => ({
  type: ActionTypes.QUERIES_LOADING,
});

//*Failed
export const queriesFailed = (errmess) => ({
  type: ActionTypes.QUERIES_FAILED,
  payload: errmess,
});
