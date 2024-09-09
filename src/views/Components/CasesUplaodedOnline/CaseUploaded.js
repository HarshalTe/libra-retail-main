import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
//*
import { pincodeDeleteAll } from "../../../Redux/Creators/PincodeCreators";
import { editCompletedPropertiesData } from "../../../Redux/Creators/PropertiesCompletedCreators";

function CaseUploaded(props) {
  console.log("delete", props.data);
  const token = props.login?.login?.token;

  const deleteIDs =
    props.data !== null
      ? props?.data?.selected?.map((pincode) => pincode.id)
      : [];
      const deleteAll = () => {
    let data = {
        id:props.data.id,
        token:token,
        is_online_file_uploads: "1",
    };
    console.log("data", data);
    props.editCompletedPropertiesData(data, token);
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
                title: "Case has been Uploaded?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes !",
                cancelButtonText: "No !",
                reverseButtons: false,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  deleteAll();
                }
              });
          }}
        >
          <Button
        variant="contained"
        color="primary"
        size="large"
        // onClick={() => {
        //   toggle();
        // }}
      >
        Case Upload
      </Button>
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
    pincodeDeleteAll: (data, token) => dispatch(pincodeDeleteAll(data, token)),
    editCompletedPropertiesData: (data) => dispatch(editCompletedPropertiesData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseUploaded);
