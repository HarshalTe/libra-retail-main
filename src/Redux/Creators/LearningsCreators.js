import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";
//* Get Learnings Page
export const getLearningsPage = (data) => (dispatch) => {
  dispatch(learningsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "learnings",
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
    .then((learnings) => {
      console.log("learnings", learnings);
      dispatch(fetchLearnings(learnings));
    })
    .catch((error) => dispatch(learningsFailed(error)));
};

//*Post
export const learningsPostData = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return(dispatch)=>{
    dispatch(learningsLoading(true));
    axios
    .post("/learnings",data,config)
    .then((learnings) => {
      console.log("post learnings data", learnings);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Query!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data={
            token:token
          }
          dispatch(getLearningsPage(data));
        }
      });
    })
    .catch((error) => dispatch(learningsFailed(error)));
  };
}

//*Edit
export const learningsEditData = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
  };
  return(dispatch)=>{
    dispatch(learningsLoading(true));
    axios
    .post(`/learnings/${token?.id}`,data,config)
    .then((bank) => {
      console.log("Query Updated", bank);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Learnings!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getLearningsPage(token));
        }
      });
    })
    .catch((error) => dispatch(learningsFailed(error)));
};
}

//* Search
export const searchLearningsData = (data) => (dispatch) => {
  dispatch(learningsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "learnings?search=" + data.search, {
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
    .then((learnings) => {
      console.log("learnings", learnings);
      dispatch(fetchLearnings(learnings));
    })
    .catch((error) => dispatch(learningsFailed(error)));
};

//* Delete
export const deleteLearningsAll = (data) => (dispatch) => {
  //*details parameter
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `learnings/${data.id}`, {
    method: "delete",
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
    .then((learnings) => {
      console.log("success!", learnings);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Learnings!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getLearningsPage(data));
        }
      });
    })
    .catch((error) => dispatch(learningsFailed(error)));
};

//*Fetch
export const fetchLearnings = (data) => ({
  type: ActionTypes.FETCH_LEARNINGS,
  payload: data,
});

//*Loading
export const learningsLoading = () => ({
  type: ActionTypes.LEARNINGS_LOADING,
});

//*Failed
export const learningsFailed = (errmess) => ({
  type: ActionTypes.LEARNINGS_FAILED,
  payload: errmess,
});
