
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get Leaves list
export const getLeavesList = (data) => (dispatch) => {
  dispatch(leavesLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "leave-managements", {
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
    .then((leaves) => {
        console.log("leaves", leaves);
        console.log("object1112",leaves)
          dispatch(fetchLeaves(leaves));
    })
    .catch((error) => dispatch(leavesFailed(error)));
};

export const leavesEditData = (data,token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + `leave-managements/${data.id}`, {
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
        console.log("Bank Updated", bank);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Leave Management!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getLeavesList(data2));
          }
        });
      })
      .catch((error) => dispatch(leavesFailed(error)));
  };

  export const leavesPostData = (data,token) => (dispatch) => {
    console.log("Leaves Post Data", data);
    dispatch(leavesLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
    //   "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + "leave-managements", {
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
      .then((leaves) => {
        console.log("post leaves data", leaves);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Leave!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
            };
            dispatch(getLeavesList(data2));
          }
        });
      })
      .catch((error) => dispatch(leavesFailed(error)));
  };

  export const DeleteLeave = (data,token) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `leave-managements/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((leaves) => {
        console.log("dalete leaves data", leaves);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New leaves!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getLeavesList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(leavesFailed(error)));
    }


export const fetchLeaves = (leaves) => ({
    type: ActionTypes.FETCH_LEAVES,
    payload: leaves,
  });
  
  //*Loading
  export const leavesLoading = () => ({
    type: ActionTypes.LEAVES_LOADING,
  });
  
  //*Failed
  export const leavesFailed = (errmess) => ({
    type: ActionTypes.LEAVES_FAILED,
    payload: errmess,
  });
  