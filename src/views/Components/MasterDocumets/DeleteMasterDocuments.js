import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

//*
import { deleteMasterDocumentsAll } from "../../../Redux/Creators/DropdownDetailsCreators";

function DeleteMasterDocuments(props) {
  console.log("delete", props.data);
  const token = props.login?.login?.token;

  const deleteIDs =
    props.data !== null
      ? props?.data?.selected?.map((dropdownDetail) => ({
          id: dropdownDetail.id,
        }))
      : [];

  const deleteAll = () => {
    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000000,
      ids: deleteIDs,
    };
    console.log("datawww", data);
    props.deleteMasterDocumentsAll(data);
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
                // text: "You won't be able to revert this!",
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
    deleteMasterDocumentsAll: (data) =>
      dispatch(deleteMasterDocumentsAll(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteMasterDocuments);
