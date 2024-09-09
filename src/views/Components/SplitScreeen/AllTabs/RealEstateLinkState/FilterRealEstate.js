import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Table,
  Label,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

//*
import { searchRealEstate } from "../../../../../Redux/Creators/RealEstateStateCreators";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function FilterRealEstate(props) {
  console.log("delete", props.data);
  const token = props.login?.login?.token;

  const [anchorEl, setAnchorEl] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };
  const editClose = () => {
    setEdit(!edit);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const searchAll = (name) => {
    // setFilter(name);
    console.log("FilterValue", filter);
    let data = {
      token: token,
      pageno: props.data.pageno,
      pageSize: props.data.pageSize,
      search: name,
    };
    console.log("data", data);
    props.searchRealEstate(data);
  };

  return (
    <div>
      <Tooltip title="Filter" placement="top">
        <IconButton
          aria-label="more"
          id="long-button"
          className="ml-2"
          size="small"
          aria-controls="long-menu"
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.states.states.map((state) => (
          <MenuItem
            disableRipple
            color="warning"
            onClick={() => {
              handleClose();
              searchAll(state.state);
            }}
          >
            {state.state}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    states: state.states,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchRealEstate: (data) => dispatch(searchRealEstate(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRealEstate);
