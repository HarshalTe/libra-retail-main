import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editStageCalculator = (data, setValue, value, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch) => {
    axios
      .put(`/stage_calculators/${data.id}`, data, config)
      .then((stage_calculators) => {
        console.log("put stage_calculators data", stage_calculators);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Stage Calculators!",
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
      .catch((error) => dispatch(stageCalculatorFailed(error)));
  };
};

//*Loading
export const stageCalculatorLoading = () => ({
  type: ActionTypes.STAGE_CALCULATOR_LOADING,
});

//*Failed
export const stageCalculatorFailed = (errmess) => ({
  type: ActionTypes.STAGE_CALCULATOR_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(stageCalculatorLoading());
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
      dispatch(stageCalculatorLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(stageCalculatorFailed(error)));
};

//!Loding false
export const stageCalculatorLoadingFalse = () => ({
  type: ActionTypes.STAGE_CALCULATOR_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
