import React from "react";
import { Row, Col } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";
import BrokerTableGoogleApi from "./BrokerTableGoogleApi"
import NearBroker from "./NearBroker"
import NewTable from "./NewTable"

//*
import BrokerTable from "./BrokerTable";

export default function BrokerDetails() {
  return (
    <div>
      <Row>
        <Col md={12}>
          <TextField
            fullWidth
            type="search"
            variant="outlined"
            margin="normal"
            size="medium"
            label="search"
            placeholder="broker search"
            // onChange={(event) => handleChangeSearch(event)}
            // onKeyDown={(event) => handleSearchEnter(event)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="search"
                    // color={searchTerm == "" ? "default" : "success"}
                    // onClick={() => handleSearch()}
                    style={{ padding: "0px" }}
                  >
                    <SearchSharpIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Col>
      </Row>

      <Row className="mt=5">
        <NearBroker/>
        {/* <BrokerTable /> */}
        <NewTable/>
      </Row>
    </div>
  );
}
