import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import blob from "blob";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { postUnderConstructProjects } from "../../../Redux/Creators/UnderConstructionProjectsCreators";

function DownloadCSV(props) {
  const token = props.login?.login?.token;

  function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
    var CSV = "";
    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ",";
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //this trick will generate a temp "a" tag
    var link = document.createElement("a");
    link.id = "lnkDwnldLnk";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);

    var csv = CSV;
    var blob = new Blob([csv], { type: "text/csv" });
    var csvUrl = window.webkitURL.createObjectURL(blob);
    var filename = (ReportTitle || "UserExport") + ".csv";

    link.download = filename;
    link.href = URL.createObjectURL(blob);

    link.click();

    document.body.removeChild(link);
  }

  return (
    <div>
      <Tooltip title="download" placement="top">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className="mr-2"
          onClick={() =>
            JSONToCSVConvertor(
              props.underConstructProjects.underConstructProjects.data,
              "underconstructionprojects",
              true
            )
          }
          startIcon={<CloudDownloadIcon fontSize="inherit" />}
        >
          CSV
        </Button>
      </Tooltip>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    underConstructProjects: state.underConstructProjects,
  };
};

export default connect(mapStateToProps, null)(DownloadCSV);
