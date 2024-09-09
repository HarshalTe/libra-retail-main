
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get Readyreckners list
export const getReadyrecknersList = (data) => (dispatch) => {
  dispatch(readyrecknersLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "ready-reckners", {
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
    .then((readyreckners) => {
        console.log("readyreckners", readyreckners);
        console.log("object1112",readyreckners)
          dispatch(fetchReadyreckners(readyreckners));
    })
    .catch((error) => dispatch(readyrecknersFailed(error)));
};

export const readyrecknersEditData = (data,user) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + `ready-reckners/${data.id}`, {
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
      .then((remark) => {
        console.log("Remark Updated", remark);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Ready Reckoners!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getReadyrecknersList(data2));
          }
        });
      })
      .catch((error) => dispatch(readyrecknersFailed(error)));
  };

  export const readyrecknersPostData = (data,user) => (dispatch) => {
    console.log("Readyreckners Post Data", data);
    dispatch(readyrecknersLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + "ready-reckners", {
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
      .then((readyreckners) => {
        console.log("post readyreckners data", readyreckners);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Ready Reckoners!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getReadyrecknersList(data2));
          }
        });
      })
      .catch((error) => dispatch(readyrecknersFailed(error)));
  };

  export const DeleteReadyreckners = (data) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `ready-reckners/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((readyreckners) => {
        console.log("dalete readyreckners data", readyreckners);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New readyreckners!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: data.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getReadyrecknersList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(readyrecknersFailed(error)));
    }


export const fetchReadyreckners = (readyreckners) => ({
    type: ActionTypes.FETCH_READYRECKNERS,
    payload: readyreckners,
  });
  
  //*Loading
  export const readyrecknersLoading = () => ({
    type: ActionTypes.READYRECKNERS_LOADING,
  });
  
  //*Failed
  export const readyrecknersFailed = (errmess) => ({
    type: ActionTypes.READYRECKNERS_FAILED,
    payload: errmess,
  });
  