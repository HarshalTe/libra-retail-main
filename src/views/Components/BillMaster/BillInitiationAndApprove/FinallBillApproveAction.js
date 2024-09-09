import React from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { Button } from "@material-ui/core";

//*
import { finalBillsApproveAll } from "../../../../Redux/Creators/FinalBillsCreators";

function FinalBillApproveAction(props) {
  console.log("bills22", props.data, props);
  const token = props.login?.login?.token;

  const billsIDs =
    props.data !== null ? props?.data?.map((bank) => bank.id) : [];

  console.log("IDS:", billsIDs);

  const approveAll = () => {
    let data = {
      bills: billsIDs,
      is_approved: 1,
    };
    console.log("data", data);
    props.finalBillsApproveAll(data,token);
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
      <Tooltip title="Approve All">
        <Button
        style={{"backgroundColor":"#2dce89","color":"white"}}
          variant="contained"
          color="#2dce89"
          size="small"
          onClick={() => {
            swalWithBootstrapButtons
              .fire({
                title: "Do You want to Approve Selected?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, Approve!",
                cancelButtonText: "No, cancel!",
                reverseButtons: false,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  approveAll();
                }
              });
          }}
        >
          {/* <DeleteIcon color="error" /> */}
          Approve
        </Button>
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
    finalBillsApproveAll: (data,token) => dispatch(finalBillsApproveAll(data,token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalBillApproveAction);
