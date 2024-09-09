import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Page
export const getCompaniesPage = (data) => (dispatch) => {
  dispatch(companiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "company-details?page=" +
      data.pageno +
      "&pageSize=" +
      data.pageSize,
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
    .then((companyDetails) => {
      console.log("company-details", companyDetails);
      dispatch(fetchCompanies(companyDetails));
    })
    .catch((error) => dispatch(companiesFailed(error)));
};
//* Get List
export const getCompaniesList = (data) => (dispatch) => {
  dispatch(companiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "company-details", {
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
    .then((companyDetails) => {
      console.log("company-details", companyDetails);
      dispatch(fetchCompanies(companyDetails));
    })
    .catch((error) => dispatch(companiesFailed(error)));
};

//*Post
export const companiesPostData = (data, token) => (dispatch) => {
  dispatch(companiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "company-details", {
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
    .then((companyDetails) => {
      console.log("post company-details data", companyDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Company!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: token,
            pageno: 1,
            pageSize: 10000,
          };
          dispatch(getCompaniesPage(data2));
        }
      });
    })
    .catch((error) => dispatch(companiesFailed(error)));
};

//*Edit
export const companiesEditData = (data, token) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + `company-details/${data.id}`, {
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
    .then((companyDetails) => {
      console.log("company-details Updated", companyDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Company!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: token,
            pageno: 1,
            pageSize: 10000,
          };
          dispatch(getCompaniesPage(data2));
        }
      });
    })
    .catch((error) => dispatch(companiesFailed(error)));
};

//* Search
export const searchCompaniesData = (data, token) => (dispatch) => {
  dispatch(companiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "company-details?search=" + data.search, {
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
    .then((companyDetails) => {
      console.log("companyDetails", companyDetails);
      dispatch(fetchCompanies(companyDetails));
    })
    .catch((error) => dispatch(companiesFailed(error)));
};

//* Delete
export const deleteAllCompanies = (data, token) => (dispatch) => {
  //*details parameter
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "companydetailsdeleteall", {
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
    .then((companyDetails) => {
      console.log("success!", companyDetails);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Companies!",
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
          dispatch(getCompaniesPage(data2));
        }
      });
    })
    .catch((error) => dispatch(companiesFailed(error)));
};

//*Fetch
export const fetchCompanies = (data) => ({
  type: ActionTypes.FETCH_COMPANIES,
  payload: data,
});

//*Loading
export const companiesLoading = () => ({
  type: ActionTypes.COMPANIES_LOADING,
});

//*Failed
export const companiesFailed = (errmess) => ({
  type: ActionTypes.COMPANIES_FAILED,
  payload: errmess,
});
