import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { companyDocumentDeleteAll } from "../../../Redux/Creators/CompanyDocumentCreators";



const CreateCompanyDocument = (props) => {
    console.log("delete", props?.index,props);

    const deleteAll = () => {
        // const token = props.login?.login?.token;

        console.log("delete", props?.index,props);
        let token = props.login?.login?.token;
        const deleteIDs =
          props?.index !== null
            ? props?.index
            : [];
        let data = {
          id: deleteIDs,
        };
        console.log("data", data);
        props.companyDocumentDeleteAll(data, token);
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
        companyDocumentDeleteAll: (data, token) =>
        dispatch(companyDocumentDeleteAll(data, token)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateCompanyDocument);
