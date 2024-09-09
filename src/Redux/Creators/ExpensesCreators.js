
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//*Get Expenses list
export const getExpensesList = (data) => (dispatch) => {
  dispatch(expensesLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "expenses", {
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
    .then((expenses) => {
        console.log("expenses", expenses);
        console.log("object1112",expenses)
          dispatch(fetchExpenses(expenses));
    })
    .catch((error) => dispatch(expensesFailed(error)));
};

export const expensesEditData = (data,user) => {

  console.log("Values In Upload file:", data, user);


    const myheader = new Headers({
      // Accept: "application/json",
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + user.token,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };
    return (dispatch) =>{
      axios
    .post(`/expenses/${user.id}?_method=put`, data, config)
      // .then((response) => {
      //   if (response.ok) {
      //     return response;
      //   }
      //   let error = new Error(
      //     "Error:" + response.status + "Error Text: " + response.statusText
      //   );
  
      //   error.response = response;
      //   throw error;
      // })
      // .then((response) => response.json())
      .then((bank) => {
        console.log("Bank Updated", bank);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Expanses!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100000,
            };
            dispatch(getExpensesList(data2));
          }
        });
      })
      .catch((error) => dispatch(expensesFailed(error)));
    }
  };

  export const expensesPostData = (data,token) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return (dispatch) => {
      dispatch(expensesLoading(true));
      // dispatch(pincodesLoading());
      axios
        .post("/expenses", data, config)
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
              let data2 = {
                token: token,
              };
              dispatch(getExpensesList(data2));
            }
          });
        })
        .catch((error) => dispatch(expensesFailed(error)));
    };
  };

  export const expensesPostData2 = (data,token) => (dispatch) => {
    console.log("Expenses Post Data", data);
    dispatch(expensesLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    //   "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + "expenses", {
      method: "post",
      headers: myheader,
      body: data,
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
      .then((expenses) => {
        console.log("post expenses data", expenses);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Bank!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
            };
            dispatch(getExpensesList(data2));
          }
        });
      })
      .catch((error) => dispatch(expensesFailed(error)));
  };

  export const DeleteExpenses = (id,token) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    // console.log("object1112",data)
  
    return fetch(baseUrl + `expenses/${id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((expenses) => {
        console.log("dalete expenses data", expenses);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New expenses!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getExpensesList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(expensesFailed(error)));
    }


export const fetchExpenses = (expenses) => ({
    type: ActionTypes.FETCH_EXPENSES,
    payload: expenses,
  });
  
  //*Loading
  export const expensesLoading = () => ({
    type: ActionTypes.EXPENSES_LOADING,
  });
  
  //*Failed
  export const expensesFailed = (errmess) => ({
    type: ActionTypes.EXPENSES_FAILED,
    payload: errmess,
  });
  