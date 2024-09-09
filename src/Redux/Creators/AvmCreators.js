import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Queries Page
export const getAvmPage = (data) => (dispatch) => {
  dispatch(amvLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "get-avm", {
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
    .then((avm) => {
      console.log("avm", avm);
      dispatch(fetchAvm(avm));
    })
    .catch((error) => dispatch(avmFailed(error)));
};

//*Post
export const avmPostData = (data) => (dispatch) => {
  dispatch(amvLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "avm", {
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
    .then((avm) => {
      console.log("post avm data", avm);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New AVM!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getAvmPage(data));
        }
      });
    })
    .catch((error) => dispatch(avmFailed(error)));
};

//*Edit
export const avmEditData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `avm/${data.id}`, {
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
    .then((avm) => {
      console.log("AVm Updated", avm);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The AVM!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getAvmPage(data));
        }
      });
    })
    .catch((error) => dispatch(avmFailed(error)));
};

//* Search
export const searchAvmData = (data) => (dispatch) => {
  dispatch(amvLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "avm?search=" + data.search, {
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
    .then((avm) => {
      console.log("avm", avm);
      dispatch(fetchAvm(avm));
    })
    .catch((error) => dispatch(avmFailed(error)));
};

//* Delete
export const deleteAllAvm = (data) => (dispatch) => {
  //*details parameter
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "queriesdeleteall", {
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
    .then((avm) => {
      console.log("success!", avm);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected AVM!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getAvmPage(data));
        }
      });
    })
    .catch((error) => dispatch(avmFailed(error)));
};
export const editPropertiesReOpen = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
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
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully updated the property!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getProperty(data));
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

export const getProperty = (data) => (dispatch) => {
  dispatch(propertiesLoading());
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
    })
    .catch((error) => console.log(error));
};
//*Fetch
export const fetchAvm = (data) => ({
  type: ActionTypes.FETCH_AVM,
  payload: data,
});

//*Loading
export const amvLoading = () => ({
  type: ActionTypes.AVM_LOADING,
});

//*Failed
export const avmFailed = (errmess) => ({
  type: ActionTypes.AVM_FAILED,
  payload: errmess,
});
export const propertiesLoading = () => ({
  type: ActionTypes.PROPERTIES_LOADING,
});

export const propertiesFailed = (errmess) => ({
  type: ActionTypes.PROPERTIES_FAILED,
  payload: errmess,
});

export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});

