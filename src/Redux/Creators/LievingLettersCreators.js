
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get RelievingLetters list
export const getRelievingLettersList = (data) => (dispatch) => {
  dispatch(relievinglettersLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "relieving-letters", {
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
    .then((relievingLetters) => {
        console.log("relievingLetters", relievingLetters);
        console.log("object1112",relievingLetters)
          dispatch(fetchRelievingLetters(relievingLetters));
    })
    .catch((error) => dispatch(relievinglettersFailed(error)));
};

export const relievinglettersEditData = (data,token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + `relieving-letters/${data.id}`, {
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
        console.log("Letter Updated", bank);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Letter!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getRelievingLettersList(data2));
          }
        });
      })
      .catch((error) => dispatch(relievinglettersFailed(error)));
  };

  export const relievinglettersPostData = (data,token) => (dispatch) => {
    console.log("RelievingLetters Post Data", data);
    dispatch(relievinglettersLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + "relieving-letters", {
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
      .then((relievingLetters) => {
        console.log("post relievingLetters data", relievingLetters);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Letter!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getRelievingLettersList(data2));
          }
        });
      })
      .catch((error) => dispatch(relievinglettersFailed(error)));
  };

  export const DeleteRelievingLetters = (data,token) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `relieving-letters/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((relievingLetters) => {
        console.log("dalete relievingLetters data", relievingLetters);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New relievingLetters!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 100000,
            };
            dispatch(getRelievingLettersList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(relievinglettersFailed(error)));
    }


export const fetchRelievingLetters = (relievingLetters) => ({
    type: ActionTypes.FETCH_RELIEVINGLETTERS,
    payload: relievingLetters,
  });
  
  //*Loading
  export const relievinglettersLoading = () => ({
    type: ActionTypes.RELIEVINGLETTERS_LOADING,
  });
  
  //*Failed
  export const relievinglettersFailed = (errmess) => ({
    type: ActionTypes.RELIEVINGLETTERS_FAILED,
    payload: errmess,
  });
  