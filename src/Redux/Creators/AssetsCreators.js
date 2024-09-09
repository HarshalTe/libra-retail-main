
import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";
//*Get Assets list
export const getAssetsList = (data) => (dispatch) => {
  dispatch(assetsLoading(true));
  console.log("object1112",data)
  const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    });
    
    return fetch(baseUrl + "assets", {
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
    .then((assets) => {
        console.log("assets", assets);
        console.log("object1112",assets)
          dispatch(fetchAssets(assets));
    })
    .catch((error) => dispatch(assetsFailed(error)));
};

export const assetsEditData = (data,token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
  };
  return (dispatch) => {
    dispatch(assetsLoading());
    axios
      .post(`assets/${token.id}`, data, config)
      // .then((response) => response.json())
      .then((bank) => {
        console.log("Assets Updated", bank);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated The Company Assets!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 1000000,
            };
            dispatch(getAssetsList(data2));
          }
        });
      })
      .catch((error) => dispatch(assetsFailed(error)));
    }
  };

  export const assetsPostData = (data,token) => {
    console.log("Assets Post Data", data);
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return (dispatch) => {
      dispatch(assetsLoading());
      axios
        .post("/assets", data, config)
      .then((assets) => {
        console.log("post assets data", assets);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Added The New Company Assets!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getAssetsList(data2));
          }
        });
      })
      .catch((error) => dispatch(assetsFailed(error)));
    }
  };

  export const DeleteAssets = (data,token) => async (dispatch) => {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    });
    console.log("object1112",data)
  
    return fetch(baseUrl + `assets/${data.id}`, {
      method: "delete",
      headers: myheader,
      // body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((assets) => {
        console.log("dalete assets data", assets);
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Delete The New Company Assets!",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (result.isDismissed) {
            let data2 = {
              token: token.token,
              pageno: 1,
              pageSize: 100,
            };
            dispatch(getAssetsList(data2));
          }
        });
      }
      )
      .catch((error) => dispatch(assetsFailed(error)));
    }


export const fetchAssets = (assets) => ({
    type: ActionTypes.FETCH_ASSETS,
    payload: assets,
  });
  
  //*Loading
  export const assetsLoading = () => ({
    type: ActionTypes.ASSETS_LOADING,
  });
  
  //*Failed
  export const assetsFailed = (errmess) => ({
    type: ActionTypes.ASSETS_FAILED,
    payload: errmess,
  });
  