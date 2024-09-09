import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

//*
import { deletePropertyPhotos } from "../../../../../Redux/Creators/PropertyPhotographsCreators";

function DeletePhotos(props) {
  console.log("delete", props.data);
  const token = props.login?.login?.token;

  const deleteAll = () => {
    let data = {
      id: props?.id,
      property_id: props?.property?.property?.id,
    };

    props.deletePropertyPhotos(data, token);
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
        <Button
          onClick={() => {
            swalWithBootstrapButtons
              .fire({
                title: "Do You want to Delete this Photo?",
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
          size="small"
          className="mr-5"
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </Tooltip>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePropertyPhotos: (data, token) =>
      dispatch(deletePropertyPhotos(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePhotos);
