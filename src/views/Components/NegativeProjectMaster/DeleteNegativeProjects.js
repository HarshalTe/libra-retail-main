import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

//*
import { deleteNegativeProjectsAll } from "../../../Redux/Creators/NegativeProjectsCreators";

function DeleteNegativeProjects(props) {
  console.log("delete", props.data);
  const token = props.login?.login?.token;

  const deleteIDs =
    props.data !== null
      ? props?.data?.selected?.map((bank) => ({
          id: bank.id,
        }))
      : [];

  const deleteAll = () => {
    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      negativeProjects: deleteIDs,
    };
    console.log("data", data);
    props.deleteNegativeProjectsAll(data);
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
    deleteNegativeProjectsAll: (data) =>
      dispatch(deleteNegativeProjectsAll(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteNegativeProjects);
