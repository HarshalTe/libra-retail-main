import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

//*
import { propertiesDeleteAll } from "../../../../Redux/Creators/PropertiesCreators";

function DeleteWip(props) {
  console.log("delete", props.data);
  const token = props.login?.login?.token;

  const deleteIDs = props.data?.row?.id
    // props.data !== null
    //   ? props?.data?.selected?.map((pincode) => pincode.id)
    //   : [];

  const deleteAll = () => {
    let data = {
      id: deleteIDs,
    };
    console.log("data", data);
    props.propertiesDeleteAll(data, token);
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
           <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
        >
          <i className="" aria-hidden="true"></i>Delete
        </div>
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
    propertiesDeleteAll: (data, token) => dispatch(propertiesDeleteAll(data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWip);
