import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";



//*Post
export const BillGraphGet = (data) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "get-bills-count", {
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
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(BillGraphGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Bill Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    // .catch((error) => dispatch(graphData  Failed(error)));
};




export const BillConfigGet = (data) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `get-configs-stats/${data.id}`, {
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
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(BillConfigGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Bill Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const YieldConfigGet = (data) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `get-yield-stats/${data.id}`, {
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
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(YieldGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Bill Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const RentConfigGet = (data) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `get-rent-stats/${data.id}`, {
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
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(RentGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Bill Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const ProjectRateGet = (data) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `project-rates`, {
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
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(ProjectRateGetData(graphData));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Bill Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    // .catch((error) => dispatch(graphData  Failed(error)));
};

export const BillConfigGetData = (data) => ({
    type: ActionTypes.BILL_CONFIG_GET,
    payload: data,
  });
export const YieldGetData = (data) => ({
    type: ActionTypes.YIELD_GET,
    payload: data,
  });
export const RentGetData = (data) => ({
    type: ActionTypes.RENT_GET,
    payload: data,
  });
  export const BillGraphGetData = (data) => ({
    type: ActionTypes.BILL_GRAPH_GET,
    payload: data,
  });
  export const ProjectRateGetData = (data) => ({
    type: ActionTypes.PROJECT_RATE,
    payload: data,
  });
  