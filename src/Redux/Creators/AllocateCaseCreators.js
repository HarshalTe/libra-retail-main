import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";

//*Post
export const allocateCaseData = (data) => (dispatch) => {
  console.log("post data", data);
  dispatch(allocateCasesLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "mass-assign", {
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
    .then((massAssign) => {
      console.log("post mass-assign data", massAssign);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Allocated The Cases!",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => dispatch(allocateCasesFailed(error)));
};

//*Loading
export const allocateCasesLoading = () => ({
  type: ActionTypes.ALLOCATE_CASES_LOADING,
});

//*Failed
export const allocateCasesFailed = (errmess) => ({
  type: ActionTypes.ALLOCATE_CASES_FAILED,
  payload: errmess,
});
