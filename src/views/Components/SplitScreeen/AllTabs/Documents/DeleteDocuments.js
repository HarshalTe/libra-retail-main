import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

//*
import { deleteDocuments } from "../../../../../Redux/Creators/DocumentsCreators";

function DeleteDocuments(props) {
  console.log("delete", props);

  const deleteAll = () => {
    const token = props.login?.login?.token;
    let data = {
      token: token,
      id: props.data.id,
      property_id: props.data.property_id,
    };
    props.deleteDocuments(data, token);
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
                title: "Do you want to delete this document?",
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
    deleteDocuments: (data, token) => dispatch(deleteDocuments(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDocuments);
