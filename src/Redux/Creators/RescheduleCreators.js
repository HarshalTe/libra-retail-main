import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";


export const rescheduleFailed = (errmess) => ({
    // type: ActionTypes.PROPERTIES_FAILED,
    // payload: errmess,
  });

export const postRescheduleDataa = (data,user) => (dispatch) => {
    console.log("Reschedule Post Data", data);
    // dispatch(rescheduleLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + "case-reschedule", {
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
      .then((reschedule) => {
        console.log("post reschedule data", reschedule);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added the new reschedule!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          console.log("reschedule", reschedule?.success,result);
            // dispatch(getBanksPage(data));
        });
  
        // .then((result) => {
        //   if (result.isDismissed) {
        //     dispatch(getReschedulePage(data));
        //   }
        // });
      })
      .catch((error) => dispatch(rescheduleFailed(error)));
  };

  export const postRescheduleData = (data,user) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    };
    return (dispatch) => {
      // dispatch(pincodesLoading());
      axios
        .post("/case-reschedule", data, config)
        .then((reschedule) => {
          console.log("post reschedule data", reschedule);
          Swal.fire({
            position: "success",
            icon: "success",
            title: "Successfully Added Reschedule!",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.isDismissed) {
              // let data2 = {
              //   token: token,
              //   pageno: 1,
              //   pageSize: 10000,
              // };
              // dispatch(getPincodesPage(data2));
            }
          });
        })
        .catch((error) => dispatch(rescheduleFailed(error)));
    };
  };