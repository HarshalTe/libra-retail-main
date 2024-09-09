import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import history from "../../myCreatedHistory";


export const getProperty = (data, setValue, value,token) => (dispatch) => {
    dispatch(propertiesLoading());
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
        dispatch(specificationsLoadingFalse());
        // setValue(value);
      })
      .catch((error) => dispatch(specificationsFailed(error)));
  };

export const editProgressData = (data, setValue, value,token) => (dispatch) => {
    console.log("object",data, setValue, value,token)
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    // return fetch(baseUrl + `/users/${data.id}?_method=PUT`, {
    return fetch(baseUrl + `properties/${data.id}`, {
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
      .then((properties) => {
        console.log("Properties Updated", properties);
        dispatch(getProperty(data, setValue, value,token));
      })
      .catch((error) => dispatch(propertiesFailed(error)));
  };


  
export const fetchProperties = (data) => ({
    type: ActionTypes.FETCH_PROPERTIES,
    payload: data,
  });
  
  export const propertiesLoading = () => ({
    type: ActionTypes.PROPERTIES_LOADING,
  });
  
  export const propertiesFailed = (errmess) => ({
    type: ActionTypes.PROPERTIES_FAILED,
    payload: errmess,
  });
  
  export const fetchSingleProperty = (data) => ({
    type: ActionTypes.FETCH_SINGLE_PROPERTY,
    payload: data,
  });

  export const specificationsLoadingFalse = () => ({
    type: ActionTypes.SPECIFICATIONS_LOADING_FALSE,
  });
  
  //!fetchProperty
  export const fetchProperty = (data) => ({
    type: ActionTypes.FETCH_PROPERTY,
    payload: data,
  });
  //*Loading
export const specificationsLoading = () => ({
    type: ActionTypes.SPECIFICATIONS_LOADING,
  });
  
  //*Failed
  export const specificationsFailed = (errmess) => ({
    type: ActionTypes.SPECIFICATIONS_FAILED,
    payload: errmess,
  });
  