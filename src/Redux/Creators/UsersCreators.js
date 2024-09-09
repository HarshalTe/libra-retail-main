import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//* Get Users List
export const getUsersList = (data) => (dispatch) => {
  dispatch(usersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "users?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then((users) => {
      console.log("users", users);
      dispatch(fetchUsers(users));
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//* Get Users Page
export const getUsersPage = (data) => (dispatch) => {
  dispatch(usersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "users?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((users) => {
      console.log("users", users);
      dispatch(fetchUsers(users));
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//* Search Users
export const searchUsersData = (data) => (dispatch) => {
  console.log("Search User Data", data);
  dispatch(usersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "userSearch", {
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
    .then((users) => {
      console.log("search users data", users);
      dispatch(fetchUsers(users));
    })
    .catch((error) => dispatch(usersFailed(error)));
};

export const fetchUsers = (users) => ({
  type: ActionTypes.FETCH_USERS,
  payload: users,
});

//* Post Active Status
export const postActiveStatus = (data) => (dispatch) => {
  dispatch(usersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "userStatus", {
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
    .then((users) => {
      console.log(users);
      // dispatch(addProduct(product.Product));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Activated All Selected Users!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUsersPage(data));
        }
      });
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//! Post InActive Status
export const postInActiveStatus = (data) => (dispatch) => {
  dispatch(usersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "userStatus", {
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
    .then((users) => {
      console.log(users);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "DeActivated All Selected Users!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUsersPage(data));
        }
      });
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//*User Post Data
export const UserPostData = (data) => (dispatch) => {
  console.log("User Post Data", data);
  dispatch(usersLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "users", {
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
    .then((users) => {
      console.log("post users data", users);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New User!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUsersPage(data));
        }
      });
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//* User Edit Data
export const editUsersData = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  // return fetch(baseUrl + `/users/${data.id}?_method=PUT`, {
  return fetch(baseUrl + `users/${data.id}`, {
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
    .then((users) => {
      console.log("User Updated", users);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The User!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUsersPage(data));
        }
      });
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//* Password Change
export const changeUserPassword = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
    "Access-Control-Allow-Origin": "http://localhost:3000/",
  });

  return fetch(baseUrl + `userPatch/${data.id}`, {
    // crossDomain: true,
    method: "PATCH",
    // mode: "no-cors",
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
    .then((users) => {
      console.log("Password Change", users);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Password has been changed!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getUsersPage(data));
        }
      });
    })
    .catch((error) => dispatch(usersFailed(error)));
};

//!Edit Page Rights
//* User Edit Data
export const editPageRights = (data) => (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `rights/${data.user_id}`, {
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
    .then((rights) => {
      console.log("User Rights Updated", rights);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The User Rights!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          console.log("data log", data);
          dispatch(getUsersPage(data));
        }
      });
    })
    .catch((error) => dispatch(usersFailed(error)));
};

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING,
});

export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess,
});
