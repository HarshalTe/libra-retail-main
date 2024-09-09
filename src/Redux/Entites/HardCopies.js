import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "./../../shared/baseURL";
import Swal from "sweetalert2";

const hardCopieSlice = createSlice({
  name: "hardCopies",
  initialState: {
    hardCopies: [],
    loading: false,
    error: null,
  },
  reducers: {
    hardCopiesLoading: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    hardCopiesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    hardCopiesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.hardCopies = action.payload;
    },
  },
});

export const { hardCopiesLoading, hardCopiesFailed, hardCopiesSuccess } =
  hardCopieSlice.actions;
export default hardCopieSlice.reducer;

//*Get HardCopies list

const url = baseUrl + "dispatch-hard-copies";

export const getHardCopiesList = (data) => async (dispatch) => {
  dispatch(hardCopiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(url, {
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
    .then((hardCopies) => {
      console.log("hardCopies", hardCopies);
      dispatch(hardCopiesSuccess(hardCopies));
    })
    .catch((error) => dispatch(hardCopiesFailed(error)));
};

//* Get HardCopies Page
export const getHardCopiesPage = (data) => async (dispatch) => {
  dispatch(hardCopiesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl +
      "dispatch-hard-copies?page=" +
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
    .then((hardCopies) => {
      console.log("hardCopies", hardCopies);
      dispatch(hardCopiesSuccess(hardCopies));
    })
    .catch((error) => dispatch(hardCopiesFailed(error)));
};

//*Post
export const hardCopiesPostData =
  (data, user, setSubmitting, toggle) => async (dispatch) => {
    console.log("HardCopies Post Data", data);
    dispatch(hardCopiesLoading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });

    return fetch(url, {
      method: "post",
      headers: myheader,
      body: JSON.stringify(user),
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
      .then((hardCopies) => {
        console.log("post hardCopies data", hardCopies);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Bank!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            dispatch(getHardCopiesPage(data));
            if (setSubmitting) {
              setSubmitting(false);
            }
            if (toggle) {
              toggle();
            }
          }
        });
      })
      .catch((error) => dispatch(hardCopiesFailed(error)));
  };

//* Edit
// export const hardCopiesEditData = (data) => async (dispatch) => {
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token,
//   });

//   return fetch(baseUrl + `hardCopies/${data.id}`, {
//     method: "put",
//     headers: myheader,
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then((response) => response.json())
//     .then((bank) => {
//       console.log("Bank Updated", bank);
//       Swal.fire({
//         position: "success",
//         icon: "success",
//         title: "Successfully Updated The Bank!",
//         showConfirmButton: false,
//         timer: 1500,
//       }).then((result) => {
//         if (result.isDismissed) {
//           dispatch(getHardCopiesPage(data));
//         }
//       });
//     })
//     .catch((error) => dispatch(hardCopiesFailed(error)));
// };
//* Edit
export const hardCopiesEditData = (data, user, setSubmitting, toggle) => async (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `dispatch-hard-copies/${user.id}`, {
    method: "put",
    headers: myheader,
    body: JSON.stringify(user),
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
        title: "Successfully Updated The Bank!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getHardCopiesPage(data));
        }
        if (setSubmitting) {
          setSubmitting(false);
        }
        if (toggle) {
          toggle();
        }
      });
    })
    .catch((error) => dispatch(hardCopiesFailed(error)));
  }

  //* Edit
export const DeleteCopies = (data, token) => async (dispatch) => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token.token,
  });

  return fetch(baseUrl + `dispatch-hard-copies/${data.id}`, {
    method: "delete",
    headers: myheader,
    // body: JSON.stringify(user),
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
        title: "Successfully Delete The Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getHardCopiesPage(token));
        }
        // if (setSubmitting) {
        //   setSubmitting(false);
        // }
        // if (toggle) {
        //   toggle();
        // }
      });
    })
    .catch((error) => dispatch(hardCopiesFailed(error)));
  }