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
  ModalFooter,
} from "reactstrap";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

function ViewQueries(props) {
  const token = props.login?.login[0]?.success?.token;

  console.log("object",props?.data?.row)

  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button
           variant="outlined"
           color="info"
           size="small"
           className=""
        onClick={() => {
          setModal(!modal);
        }}
      >
        <a href={`https://lvpl.in/librabackend/storage/app/public/learnings/${props?.data?.row?.file}`} target="_blank" rel="noopener noreferrer">
          <VisibilityIcon fontSize="medium" />
        </a>
      </Button>
    </div>
  );
}

export default ViewQueries;
