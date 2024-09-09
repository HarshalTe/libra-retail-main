import * as ActionTypes from "../Types/ActionTypes";
import axios from "../../shared/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import customToast from "Helpers/customToast";

//Login
export const postLogin = (data,setSubmitting) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  axios
    .post("/login", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      toast.success(`${res.data.user.name}, Welcome!`);
    })
    .catch((error) => {
      dispatch(loginFailed(error));
      setSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "An error occurred during login.",
      });
      if (setSubmitting) {
        setSubmitting(false);
      }
    });
};

//* post Employee login
export const postEmployeeLogin = (data) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  axios
    .post("/employeelogin", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      toast.success(`${res.data.Employee.name}, Welcome!`);
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

//* post Branch login
export const postBrachLogin = (data) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  axios
    .post("/branchlogin", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      // toast.success(`${res.data.Employee.name}, Welcome!`);
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = (errmess) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess,
});

export const addLogin = (login) => ({
  type: ActionTypes.ADD_LOGIN,
  payload: login,
});

//Remove
export const removeLogin = () => ({
  type: ActionTypes.REMOVE_LOGIN,
  payload: [],
});
