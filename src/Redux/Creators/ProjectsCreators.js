import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";

//* Get Projects Page
export const getProjects = (data) => (dispatch) => {
  dispatch(projectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "projects?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then((projects) => {
      console.log("projects", projects);
      dispatch(fetchProjects(projects));
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//* Get Project list
export const getProjectsList = (data) => (dispatch) => {
  dispatch(projectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "projects", {
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
    .then((projects) => {
      console.log("projects", projects);
      dispatch(fetchProjects(projects));
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//*Post
export const postProjects = (data,users) => (dispatch) => {
  // const project_details = data.project_details;

  // if (project_details.length === 0) {
  //   Swal.fire({
  //     position: "error",
  //     icon: "error",
  //     title: "Add project details!",
  //     showConfirmButton: true,
  //   });
  //   return;
  // }

  dispatch(projectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + users.token,
  });

  return fetch(baseUrl + "projects", {
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
    .then((projects) => {
      console.log("post projects data", projects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Project!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getProjects(users));
        }
      });
    })
    .catch((error) => {
      console.log("Error:", error);
      console.log("Error response:", error.response);

      // extract error messages from response and display them
      if (error.response && error.response.status === 422) {
        error.response.json().then((errorData) => {
          const errorMessage = Object.values(errorData.errors).flat().join("<br>");
          console.log("errorMessage",errorMessage)
          Swal.fire({
            position: "error",
            icon: "error",
            title: "Error Occured!",
            html: errorMessage,
            showConfirmButton: true,
          });
        });
      } else {
        Swal.fire({
          position: "error",
          icon: "error",
          title: "Error Occured!",
          text: "An unexpected error occured. Please try again later.",
          showConfirmButton: true,
        });
      }
    });
    // .catch((error) => dispatch(projectsFailed(error)));
};
export const postProjects2 = (data, users) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${users.token}`,
    },
  };
  return (dispatch) => {
    axios
      .post(`/projects`, data, config)
      .then((projects) => {
        console.log("post projects data", projects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Project!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getProjects(users));
          }
        });
      })
      .catch((error) => {
        console.log("Error:", error);
        console.log("Error response:", error.response);
  
        // extract error messages from response and display them
        if (error.response && error.response.status === 422) {
          error.response.json().then((errorData) => {
            const errorMessage = Object.values(errorData.errors).flat().join("<br>");
            console.log("errorMessage",errorMessage)
            Swal.fire({
              position: "error",
              icon: "error",
              title: "Error Occured!",
              html: errorMessage,
              showConfirmButton: true,
            });
          });
        } else {
          Swal.fire({
            position: "error",
            icon: "error",
            title: "Error Occured!",
            text: "An unexpected error occured. Please try again later.",
            showConfirmButton: true,
          });
        }
      });
  };
};

//!Edit For Projects table
export const editProjectsDataTable = (data, user) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`, // Use "user.token" instead of "users.token"
    },
  };
  return (dispatch) => {
    axios
      .put(`/projects/${user.id}`, data, config) // Fix the URL by adding a slash before the user id
      .then((response) => {
        if (response.status === 200) { // Check the response status code for success
          return response.data; // Return response data
        } else {
          throw new Error(
            "Error:" + response.status + " Error Text: " + response.statusText
          );
        }
      })
      .then((projects) => {
        console.log("Projects Updated", projects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Project!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: user.pageno,
              pageSize: user.pageSize,
            };
            dispatch(getProjects(data2));
          }
        });
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging
        dispatch(projectsFailed(error.message));
      });
  };
};
//!Edit For Projects table
export const editProjectsDataTablePost = (data, user) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`, // Use "user.token" instead of "users.token"
    },
  };
  return (dispatch) => {
    axios
      .post(`/projects/${user.id}`, data, config) // Fix the URL by adding a slash before the user id
      .then((response) => {
        if (response.status === 200) { // Check the response status code for success
          return response.data; // Return response data
        } else {
          throw new Error(
            "Error:" + response.status + " Error Text: " + response.statusText
          );
        }
      })
      .then((projects) => {
        console.log("Projects Updated", projects);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Project!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: user.pageno,
              pageSize: user.pageSize,
            };
            dispatch(getProjects(data2));
          }
        });
      })
      .catch((error) => {
        console.error(error); // Log the error for debugging
        dispatch(projectsFailed(error.message));
      });
  };
};
//!Edit For Projects table
export const editProjectsDataTablePhotos = (data,user) => (dispatch) => {
  axios
        .post(baseUrl + `projects/${user.id}?_method=PUT`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token, 
          },
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
    .then((projects) => {
      console.log("projects Updated", projects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Project!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data2 = {
            token: user.token,
            pageno: 1,
            pageSize: 10000000,
          };
          dispatch(getProjects(data2));
        }
      });
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//* Edit for splitpages
export const editProjectsData = (data, setValue, value,token) => (dispatch) => {

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token.token,
  });
console.log("data, setValue, value,token",data, setValue, value,token)
  return fetch(baseUrl + `projects/${data.id}`, {
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
    .then((projects) => {
      console.log("projects Updated", projects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Project!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          const data2 = {
            id: token.property_id,
            token: token.token,
          };
          dispatch(getProperty(data2, setValue, value));
        }
      });
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

export const getProperty = (data, setValue, value) => (dispatch) => {
  dispatch(projectsLoading());
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
      dispatch(projectsLoadingFalse());
      setValue(value);
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//* Search
export const searchProjects = (data) => (dispatch) => {
  dispatch(projectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "projects?search=" + data.search, {
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
    .then((projects) => {
      console.log("projects", projects);
      dispatch(fetchProjects(projects));
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//* Delete
export const projectsDeleteAll = (data) => (dispatch) => {
  console.log("projects Delete", data);
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "project-deleteall", {
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
    .then((projects) => {
      console.log("success!", projects);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Projects!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getProjects(data));
        }
      });
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//*Get2
export const getProject2 = (data) => (dispatch) => {
  dispatch(projectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.get("token"),
  });

  return fetch(
    baseUrl +
      "projects?page=" +
      data.get("pageno") +
      "&pageSize=" +
      data.get("pageSize"),
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
    .then((projects) => {
      console.log("projects", projects);
      dispatch(fetchProjects(projects));
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//* Get Projects Page
export const getProjectsID = (data) => (dispatch) => {
  dispatch(projectsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `projects${data.project_id}`, {
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
    .then((projects) => {
      console.log("projects", projects);
      dispatch(fetchProjectsID(projects));
    })
    .catch((error) => dispatch(projectsFailed(error)));
};

//*Fetch
export const fetchProjects = (data) => ({
  type: ActionTypes.FETCH_PROJECTS,
  payload: data,
});

//*Fetch
export const fetchProjectsID = (data) => ({
  type: ActionTypes.FETCH_PROJECTS_ID,
  payload: data,
});

//*Loading
export const projectsLoading = () => ({
  type: ActionTypes.PROJECTS_LOADING,
});

//*Failed
export const projectsFailed = (errmess) => ({
  type: ActionTypes.PROJECTS_FAILED,
  payload: errmess,
});

//!Loding false
export const projectsLoadingFalse = () => ({
  type: ActionTypes.PROJECTS_LOADING_FALSE,
});

//!fetchProperty
export const fetchProperty = (data) => ({
  type: ActionTypes.FETCH_PROPERTY,
  payload: data,
});


//special remark

//*Get Special_remarks list
export const getSpecial_remarksList = (data) => (dispatch) => {
  dispatch(special_remarksLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "special_remarks", {
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
    .then((special_remarks) => {
        console.log("special_remarks", special_remarks);
        console.log("object1112",special_remarks)
          dispatch(fetchSpecial_remarks(special_remarks));
    })
    .catch((error) => dispatch(special_remarksFailed(error)));
};

export const special_remarksEditData = (data,user) => (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + `special_remarks/${data.id}`, {
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
      .then((remark) => {
        console.log("Remark Updated", remark);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Remark!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getSpecial_remarksList(data2));
          }
        });
      })
      .catch((error) => dispatch(special_remarksFailed(error)));
  };

  export const special_remarksPostData = (data,user) => (dispatch) => {
    console.log("Special_remarks Post Data", data);
    dispatch(special_remarksLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    });
  
    return fetch(baseUrl + "special_remarks", {
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
      .then((special_remarks) => {
        console.log("post special_remarks data", special_remarks);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Remark!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: user.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getProjects(data2));
            dispatch(getSpecial_remarksList(data2));
          }
        });
      })
      .catch((error) => dispatch(special_remarksFailed(error)));
  };

  export const DeleteSpecial_remarks = (data) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `special_remarks/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((special_remarks) => {
        console.log("dalete special_remarks data", special_remarks);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New special_remarks!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: data.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getSpecial_remarksList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(special_remarksFailed(error)));
    }


export const fetchSpecial_remarks = (special_remarks) => ({
    type: ActionTypes.FETCH_SPECIAL_REMARKS,
    payload: special_remarks,
  });
  
  //*Loading
  export const special_remarksLoading = () => ({
    type: ActionTypes.SPECIAL_REMARKS_LOADING,
  });
  
  //*Failed
  export const special_remarksFailed = (errmess) => ({
    type: ActionTypes.SPECIAL_REMARKS_FAILED,
    payload: errmess,
  });