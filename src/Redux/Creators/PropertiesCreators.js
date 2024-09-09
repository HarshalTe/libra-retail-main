import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import history from "../../myCreatedHistory";

//*
import { getCompletedPropertiesPage } from "./PropertiesCompletedCreators";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

//* Get Properties Page
export const getPropertiesPage = (data) => (dispatch) => {
  console.log("properties", data);
  dispatch(propertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });
  console.log("properties11", baseUrl + "properties?page=" + data.pageno + "&pageSize=" + data.pageSize)

  return fetch(
    baseUrl + "properties",
    // baseUrl + "properties?page=" + data.pageno + "&pageSize=" + data.pageSize,
    {
      method: "get",
      headers: myheader,
    }
  )
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
      console.log("properties", properties);
      dispatch(fetchProperties(properties));
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};


//* Delete
export const propertiesDeleteAll = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `properties/${data.id}`, {
    method: "delete",
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
    .then((pincodes) => {
      console.log("success!", pincodes);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Properties!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          let data2 = {
            token: token,
            pageno: 1,
            pageSize: 10000,
          };
          dispatch(getPropertiesPage(data2));
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//* Get branch properties Page
export const getBranchPropertiesPage = (data) => (dispatch) => {
  console.log("properties", data);
  dispatch(propertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "properties?page=" +
      data.pageno +
      "&pageSize=" +
      data.pageSize +
      "&branch_id=" +
      data.branch_id,
    {
      method: "get",
      headers: myheader,
    }
  )
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
      console.log("properties", properties);
      dispatch(fetchProperties(properties));
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//*Get Properties List
export const getPropertiesList = (data) => (dispatch) => {
  dispatch(propertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties", {
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
    .then((properties) => {
      console.log("properties", properties);
      dispatch(fetchProperties(properties));
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//*Properties Post Data
export const postPropertiesData = (data) => (dispatch) => {
  console.log("Properties Post Data", data);
  dispatch(propertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "properties", {
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
    .then((properties) => {
      console.log("post properties data", properties);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added the new property!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("properties", properties?.success);
        if (result.isDismissed) {
          swalWithBootstrapButtons
          .fire({
            title: "Do You want to Upload Document?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Upload",
            cancelButtonText: "No, cancel!",
            reverseButtons: false,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // <DocumentsUploadPage/>
              history.push(`/admin/uploadDocuments/${properties?.success?.id}`);
            } else
            {
              history.push(`/admin/viewWorkInProgress/${properties?.success?.id}`);
            }
          });
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//*Properties Edit Data  (formdata wala bana)
export const editPropertiesData = (data, setValue, value) => (dispatch) => {
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
          setValue(value);
          dispatch(getPropertiesPage(data));
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
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
          dispatch(getPropertiesPage(data));
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//* Get Properties Page
export const getSingleProperty = (data) => (dispatch) => {
  dispatch(propertiesLoading(true));
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
      dispatch(fetchSingleProperty(property));
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};

//*Post Builder Details
export const postBuilderDetails = (data) => (dispatch) => {
  console.log("Builder Post Data", data);
  dispatch(propertiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "builder_details", {
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
    .then((builder) => {
      console.log("post builder data", builder);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added the builder details!",
        showConfirmButton: false,
        timer: 1500,
      });
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

//*complete Property
export const completeProperty = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  // return fetch(baseUrl + `/users/${data.id}?_method=PUT`, {
  return fetch(baseUrl + `properties/${data.property_id}`, {
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
        title: "Successfully completed the case!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            pageno: 1,
            pageSize: 10000,
            token: data.token,
          };
          dispatch(getPropertiesPage(data2));
          dispatch(getCompletedPropertiesPage(data2));
          // history.push(`/admin/completedCases`)
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};
export const completePropertyAdmin = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  // return fetch(baseUrl + `/users/${data.id}?_method=PUT`, {
  return fetch(baseUrl + `properties/${data.property_id}`, {
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
        title: "Successfully completed the case!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            pageno: 1,
            pageSize: 10000,
            token: data.token,
          };
          dispatch(getPropertiesPage(data2));
          dispatch(getCompletedPropertiesPage(data2));
          history.push(`/admin/completedCases`)
        }
      });
    })
    .catch((error) => dispatch(propertiesFailed(error)));
};
