import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";
import axios from "../../shared/axios";
//* Get Tickets Page
export const getTicketsPage = (data) => (dispatch) => {
  dispatch(ticketsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(
    baseUrl + "tickets",
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
    .then((tickets) => {
      console.log("tickets", tickets);
      dispatch(fetchTickets(tickets));
    })
    .catch((error) => dispatch(ticketsFailed(error)));
};

//*Post
export const ticketsPostData = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return(dispatch)=>{
    dispatch(ticketsLoading(true));
    axios
    .post("/tickets",data,config)
    .then((tickets) => {
      console.log("post tickets data", tickets);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Added The New Query!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          let data={
            token:token
          }
          dispatch(getTicketsPage(data));
        }
      });
    })
    .catch((error) => dispatch(ticketsFailed(error)));
  };
}

//*Edit
export const ticketsEditData = (data, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.token,
    },
  };
  return(dispatch)=>{
    dispatch(ticketsLoading(true));
    axios
    .post(`/tickets/${token?.id}`,data,config)
    .then((bank) => {
      console.log("Query Updated", bank);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated The Tickets!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
          dispatch(getTicketsPage(token));
        }
      });
    })
    .catch((error) => dispatch(ticketsFailed(error)));
};
}

//* Search
export const searchTicketsData = (data) => (dispatch) => {
  dispatch(ticketsLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + "tickets?search=" + data.search, {
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
    .then((tickets) => {
      console.log("tickets", tickets);
      dispatch(fetchTickets(tickets));
    })
    .catch((error) => dispatch(ticketsFailed(error)));
};

//* Delete
export const deleteTicketsAll = (data) => (dispatch) => {
  //*details parameter
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token,
  });

  return fetch(baseUrl + `tickets/${data.id}`, {
    method: "delete",
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
    .then((tickets) => {
      console.log("success!", tickets);
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Deleted Selected Tickets!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        console.log("result", result);
        if (result.isDismissed) {
          dispatch(getTicketsPage(data));
        }
      });
    })
    .catch((error) => dispatch(ticketsFailed(error)));
};

//*Fetch
export const fetchTickets = (data) => ({
  type: ActionTypes.FETCH_TICKETS,
  payload: data,
});

//*Loading
export const ticketsLoading = () => ({
  type: ActionTypes.TICKETS_LOADING,
});

//*Failed
export const ticketsFailed = (errmess) => ({
  type: ActionTypes.TICKETS_FAILED,
  payload: errmess,
});
