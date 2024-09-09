import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { Divider } from "@mui/material";

import { Typography } from "@mui/material";
import DedupeTable from "./DedupeTable";

function DudupeModal(props) {
  
  const [modal, setModal] = useState(false);
  console.log("dedupe", props.data2.errors,props,Object.keys(props.data2.errors).length,modal);
  const toggle = () =>{
    if (Object.keys(props.data2.errors).length==0 && props.data2.values.project_id != "") {
      setModal(true)
    } else {
      setModal(false)
    }
  } 

  return (
    <div>
      <Tooltip title="Create Case" placement="top">
        <Button
          fullWidth
          variant="outlined"
          color="success"
          size="large"
          className="ml-3"
          type="submit"
          onClick={() => {
            toggle();
          }}
          startIcon={<ContentPasteGoIcon fontSize="inherit" />}
        >
          Initiate Case
        </Button>
      </Tooltip>
{Object.keys(props.data2.errors).length==0 ? (
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Dedupe On Same Project</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <DedupeTable data={props.data} />
        </ModalBody>
      </Modal>
  ) : 
   ("")
  
} 
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
    // postBrokers: (data) => dispatch(postBrokers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DudupeModal);
