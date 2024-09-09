import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Edit
export const editPropertyPhotos = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    axios
      .post("/property_photographs", data, config)
      .then((photos) => {
        console.log("put photos data", photos);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Uploded The Photo!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.get("property_id"),
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(propertyPhotosFailed(error)));
  };
};
export const editPropertyPhotos2 = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      // "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    axios
      .put(`/property_photographs/${data.id}`, data, config)
      .then((photos) => {
        console.log("put photos data", photos);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Uploded The Photo!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data?.property_id,
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(propertyPhotosFailed(error)));
  };
};

export const editPropertyPhotos3 = (data, token)=> (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });
  return fetch(baseUrl + `property_photographs/${data.id}`, {
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
  .then((photos) => {
        console.log("put photos data", photos);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Uploded The Photo!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data?.property_id,
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(propertyPhotosFailed(error)));
  };

//* Edit
export const deletePropertyPhotos = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };

  return (dispatch) => {
    axios
      .delete(`/property_photographs/${data.id}`, config)
      .then((photos) => {
        console.log("put photos data", photos);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Deleted The Photo!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              id: data.property_id,
              token: token,
            };
            dispatch(getProperty(data2));
          }
        });
      })
      .catch((error) => dispatch(propertyPhotosFailed(error)));
  };
};

//*Loading
export const propertyPhotosLoading = () => ({
  type: ActionTypes.PROPERTY_PHOTOS_LOADING,
});

//*Failed
export const propertyPhotosFailed = (errmess) => ({
  type: ActionTypes.PROPERTY_PHOTOS_FAILED,
  payload: errmess,
});

//!get property
export const getProperty = (data) => (dispatch) => {
  dispatch(propertyPhotosLoading());
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
      dispatch(propertyPhotosLodaingFalse());
    })
    .catch((error) => dispatch(propertyPhotosFailed(error)));
};

//!Loding false
export const propertyPhotosLodaingFalse = () => ({
  type: ActionTypes.PROPERTY_PHOTOS_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});
