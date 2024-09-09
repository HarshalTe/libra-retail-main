
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Get Tasks list
export const getTasksList = (data) => (dispatch) => {
  dispatch(tasksLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "tasks", {
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
    .then((tasks) => {
        console.log("tasks", tasks);
        console.log("object1112",tasks)
          dispatch(fetchTasks(tasks));
    })
    .catch((error) => dispatch(tasksFailed(error)));
};

export const tasksEditData = (data,user) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + `tasks/${data.id}`, {
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
      .then((bank) => {
        console.log("Bank Updated", bank);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Task!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getTasksList(data2));
          }
        });
      })
      .catch((error) => dispatch(tasksFailed(error)));
  };

  export const tasksPostData = (data,user) => (dispatch) => {
    console.log("Tasks Post Data", data);
    dispatch(tasksLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + "tasks", {
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
      .then((tasks) => {
        console.log("post tasks data", tasks);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Task!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getTasksList(data2));
          }
        });
      })
      .catch((error) => dispatch(tasksFailed(error)));
  };

  export const DeleteTasks = (data) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `tasks/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((tasks) => {
        console.log("dalete tasks data", tasks);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New tasks!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: data.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getTasksList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(tasksFailed(error)));
    }


export const fetchTasks = (tasks) => ({
    type: ActionTypes.FETCH_TASKS,
    payload: tasks,
  });
  
  //*Loading
  export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING,
  });
  
  //*Failed
  export const tasksFailed = (errmess) => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errmess,
  });
  