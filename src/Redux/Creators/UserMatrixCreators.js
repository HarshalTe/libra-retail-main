
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get Matrix list
export const getMatrixsList = (data) => (dispatch) => {
  dispatch(matrixLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "matrix", {
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
    .then((matrix) => {
        console.log("matrix", matrix);
        console.log("object1112",matrix)
          dispatch(fetchMatrix(matrix));
    })
    .catch((error) => dispatch(matrixFailed(error)));
};

export const matrixsEditData = (data,token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + `matrix/${data.id}`, {
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
          title: "Successfully Updated The Internal System Approval Matrix!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getMatrixsList(data2));
          }
        });
      })
      .catch((error) => dispatch(matrixFailed(error)));
  };

  export const matrixsPostData = (data,token) => (dispatch) => {
    console.log("Matrix Post Data", data);
    dispatch(matrixLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
    //   "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + "matrix", {
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
      .then((matrix) => {
        console.log("post matrix data", matrix);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Internal System Approval Matrix!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
            };
            dispatch(getMatrixsList(data2));
          }
        });
      })
      .catch((error) => dispatch(matrixFailed(error)));
  };

  export const DeleteMatrix = (data,token) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `matrix/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((matrix) => {
        console.log("dalete matrix data", matrix);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The Internal System Approval Matrix!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getMatrixsList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(matrixFailed(error)));
    }


export const fetchMatrix = (matrix) => ({
    type: ActionTypes.FETCH_MATRIXS,
    payload: matrix,
  });
  
  //*Loading
  export const matrixLoading = () => ({
    type: ActionTypes.MATRIXS_LOADING,
  });
  
  //*Failed
  export const matrixFailed = (errmess) => ({
    type: ActionTypes.MATRIXS_FAILED,
    payload: errmess,
  });
  