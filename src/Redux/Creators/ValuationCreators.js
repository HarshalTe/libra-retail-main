import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//*Edit Table
export const editValuationAdditionalData = (data, setValue, value, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `valuation-additional/${data.valuation_id}`, {
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
    .then((valuation) => {
      console.log("valuation Updated", valuation);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Valuation!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            id: data.property_id,
            token: token,
          };
          dispatch(getProperty(data2, setValue, value));
        }
      });
    })
    .catch((error) => dispatch(valuationFailed(error)));
};

//* Edit
export const editValuationData =
  (data, setValue, value, token) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });

    return fetch(baseUrl + `valuation/${data.valuation_id}`, {
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
      .then((valuation) => {
        console.log("valuation Updated", valuation);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Valuation!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2, setValue, value));
          }
        });
      })
      .catch((error) => dispatch(valuationFailed(error)));
  };

  export const editValuationFormData = (data, setValue, value, token) => {
    console.log("Values In Upload file:", data, token);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.token}`,
        },
      };
      return (dispatch) =>{
        axios
      .post(`/valuation/${token.id}?_method=put`, data, config)
        .then((bank) => {
          console.log("Bank Updated", bank);
          Swal.fire({
            position: "success",
            icon: "success",
            title: "Successfully Updated The Valuation!",
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            if (result.isDismissed) {
              let data2 = {
                id: token.property_id,
                token: token.token,
              };
              dispatch(getProperty(data2, setValue, value));
            }
          });
        })
        .catch((error) => dispatch(valuationFailed(error)));
      }
    }

//*Loading
export const valuationLoading = () => ({
  type: ActionTypes.VALUATION_LOADING,
});

//*Failed
export const valuationFailed = (errmess) => ({
  type: ActionTypes.VALUATION_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  console.log("data",data)
  dispatch(valuationLoading());
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties/" + data.id, {
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
    .then((property) => {
      console.log("property", property);
      dispatch(fetchProperty(property));
      dispatch(valuationLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(valuationFailed(error)));
};

//!Loding false
export const valuationLoadingFalse = () => ({
  type: ActionTypes.VALUATION_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
