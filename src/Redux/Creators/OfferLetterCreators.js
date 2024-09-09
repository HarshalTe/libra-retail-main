
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//*Get OfferLetters list
export const getOfferLettersList = (data) => (dispatch) => {
  dispatch(offerlettersLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "offer-letters", {
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
    .then((offerLetters) => {
        console.log("offerLetters", offerLetters);
        console.log("object1112",offerLetters)
          dispatch(fetchOfferLetters(offerLetters));
    })
    .catch((error) => dispatch(offerlettersFailed(error)));
};

export const offerlettersEditData = (data,token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
  };
  return (dispatch) => {
    axios
      .post(`offer-letters/${token.id}`, data, config)
      .then((bank) => {
        console.log("Letter Updated", bank);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Offer Letter!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 1000000,
            };
            dispatch(getOfferLettersList(data2));
          }
        });
      })
      .catch((error) => dispatch(offerlettersFailed(error)));
  };
  };  

  export const offerlettersPostData = (data,token) => {
    // dispatch(offerlettersLoading(true));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    return  (dispatch) => {
      axios
      .post(`/offer-letters`, data, config)
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
      .then((offerLetters) => {
        console.log("post offerLetters data", offerLetters);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Offer Letter!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getOfferLettersList(data2));
          }
        });
      })
      .catch((error) => dispatch(offerlettersFailed(error)));
  };
  }
  export const DeleteOfferLetters = (data,token) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `offer-letters/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((offerLetters) => {
        console.log("dalete offerLetters data", offerLetters);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New Offer Letter!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getOfferLettersList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(offerlettersFailed(error)));
    }


export const fetchOfferLetters = (offerLetters) => ({
    type: ActionTypes.FETCH_OFFERLETTERS,
    payload: offerLetters,
  });
  
  //*Loading
  export const offerlettersLoading = () => ({
    type: ActionTypes.OFFERLETTERS_LOADING,
  });
  
  //*Failed
  export const offerlettersFailed = (errmess) => ({
    type: ActionTypes.OFFERLETTERS_FAILED,
    payload: errmess,
  });
  