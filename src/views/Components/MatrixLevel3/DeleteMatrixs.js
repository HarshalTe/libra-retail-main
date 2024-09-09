import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { DeleteMatrix } from "../../../Redux/Creators/UserMatrixCreators";



const DeleteMatrixs = (props) => {
    console.log("delete", props?.index,props);

    const deleteAll = () => {
        // const token = props.login?.login?.token;

        console.log("delete", props?.index,props);
        let token = {
            token: props.login?.login?.token,
            pageno: 1,
            pageSize: 100,
          };
        const deleteIDs =
          props?.index !== null
            ? props?.index
            : [];
        let data = {
          id: deleteIDs,
        };
        console.log("data", data);
        props.DeleteMatrix(data, token);
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
  )
}

const mapStateToProps = (state) => {
    return {
      login: state.login,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        DeleteMatrix: (data, token) =>
        dispatch(DeleteMatrix(data, token)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeleteMatrixs);
