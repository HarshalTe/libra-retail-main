import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";

import { postInActiveStatus } from "../../../Redux/Creators/UsersCreators";

function InactiveAll(props) {
  const token = props.login?.login?.token;
  console.log("dataaa", props.data);

  const inactive =
    props.data !== null
      ? props?.data?.selected?.map((user) => ({
          user_id: user.id,
          status: 0,
        }))
      : [];

  const InActiveAll = () => {
    const data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      users: inactive,
    };
    console.log("dataaaaa", data);
    props.postInActiveStatus(data);
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
      <Tooltip title="InActive All" placement="top">
        <Button
          variant="contained"
          color="error"
          size="small"
          className="ml-2"
          onClick={() => {
            swalWithBootstrapButtons
              .fire({
                title: "Do You want to InActivate Selected?",
                // text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, InActivate!",
                cancelButtonText: "No, cancel!",
                reverseButtons: false,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  InActiveAll();
                }
              });
          }}
          startIcon={<RemoveIcon fontSize="inherit" />}
        >
          InActive
        </Button>
      </Tooltip>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postInActiveStatus: (data) => dispatch(postInActiveStatus(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InactiveAll);
