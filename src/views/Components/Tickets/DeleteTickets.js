import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

//*
import { deleteTicketsAll } from "../../../Redux/Creators/TicketsCreators";

function DeleteTickets(props) {
  console.log("deleteṣss", props.data);
  const token = props.login?.login?.token;

  // const deleteIDs =
  //   props.data !== null
  //     ? props?.data?.selected?.map((query) => ({
  //         id: query.id,
  //       }))
  //     : [];

  const deleteAll = () => {
    let data = {
      token: token,
      id: props?.data?.id,
    };
    console.log(" ", data);
    props.deleteTicketsAll(data);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton
          onClick={() => {
            swalWithBootstrapButtons
              .fire({
                title: "Do You want to Delete Selected?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete!",
                cancelButtonText: "No, cancel!",
                reverseButtons: false,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  deleteAll();
                }
              });
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTicketsAll: (data) => dispatch(deleteTicketsAll(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTickets);
