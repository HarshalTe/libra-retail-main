import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

//*imports
import { postActiveStatus } from "../../../Redux/Creators/UsersCreators";

function ActiveAll(props) {
  console.log("dataaa", props.data);
  const token = props.login?.login?.token;
  const active =
    props.data !== null
      ? props?.data?.selected?.map((user) => ({
          user_id: user.id,
          status: 1,
        }))
      : [];

  const ActiveAll = () => {
    const data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      users: active,
    };
    console.log("dataaaaa", data);
    props.postActiveStatus(data);
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
      <Tooltip title="Active All" placement="top">
        <Button
          variant="contained"
          color="success"
          size="small"
          className="ml-2"
          onClick={() => {
            swalWithBootstrapButtons
              .fire({
                title: "Do You want to Activate Selected?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Activate!",
                cancelButtonText: "No, cancel!",
                reverseButtons: false,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  ActiveAll();
                }
              });
          }}
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Active
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
    postActiveStatus: (data) => dispatch(postActiveStatus(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAll);
