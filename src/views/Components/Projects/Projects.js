import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import IconButton from "@mui/material/IconButton";

//*Compoenets
import Project2Table from "./Project2Table";

//*Actions
import { searchProjects } from "../../../Redux/Creators/ProjectsCreators";
import { getPincodesPage } from "../../../Redux/Creators/PincodeCreators";
import { getDropdownsList } from "../../../Redux/Creators/DropdownCreators";
import { getReadyrecknersList } from "../../../Redux/Creators/ReadyRecknersCreators";
import { getBanksPage } from "Redux/Creators/BanksCreators";



function Projects(props) {
  const token = props.login?.login?.token;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);

  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const loadMapplsSDK = () => {
  //     return new Promise((resolve, reject) => {
  //       const script = document.createElement('script');
  //       script.src = 'https://apis.mapmyindia.com/advancedmaps/v1/<eff37ce3b1e2a0e3a46b9706a31b4b6b>/map_load?v=1.5';
  //       script.async = true;
  //       script.onload = () => resolve();
  //       script.onerror = () => reject(new Error('Failed to load Mappls SDK'));
  //       document.body.appendChild(script);
  //     });
  //   };

  //   loadMapplsSDK()
  //     .then(() => {
  //       window.mappls.initialize({ key: "<eff37ce3b1e2a0e3a46b9706a31b4b6b>" });
  //       setSdkLoaded(true);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       console.error(err);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sdkLoaded) {
      setError('Mappls SDK not loaded yet. Please try again in a moment.');
      return;
    }
    
    setError(null);
    setResult(null);

    window.mappls.geocode({
      address: address,
      callback: function(data) {
        if (data && data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0];
          setResult({ lat, lng });
        } else {
          setError('No results found');
        }
      }
    });
  };


  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    const data = {
      token: token,
      search: searchTerm,
    };
    props.searchProjects(data);
  };

  const handleSearchEnter = (event) => {
    const data = {
      token: token,
      search: searchTerm,
    };
    if (event.key == "Enter") {
      props.searchProjects(data);
    }
    return;
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      pageno: 1,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getDropdownsList(data);
    props.getReadyrecknersList(data);
    props.getPincodesPage(data);
    props.getBanksPage(data);
  };

    // React.useEffect(() => {
    //   if (window.MapmyIndia) {
    //     const map = new window.MapmyIndia.Map('mapContainer', {
    //       center: [28.6139, 77.2090], // Example coordinates
    //       zoom: 10,
    //     });
    //   }
    // }, []);

  return (
    <div className="container-fluid">
{/* <div id="mapContainer" style={{ height: '500px', width: '100%' }}></div>; */}
{/* <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <button type="submit" disabled={!sdkLoaded}>Get Coordinates</button>
      </form>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {result && (
        <p>Latitude: {result.lat}, Longitude: {result.lng}</p>
      )}
    </div> */}
      <br />
      <Card className="p-1 px-2">
        <CardHeader className="shadow-sm border-dark p-0 pb-1 bg-gradient-yellow">
          <Row>
            <Col md={6}>
            <strong className="d-flex flex-column justify-content-center text-center align-items-center h-100">Projects</strong>
            </Col>

            <Col md={6}>
              <TextField
                fullWidth
                type="search"
                variant="outlined"
                margin="normal"
                size="small"
                label="search"
                onChange={(event) => handleChangeSearch(event)}
                onKeyDown={(event) => handleSearchEnter(event)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="search"
                        color={searchTerm == "" ? "default" : "success"}
                        onClick={() => handleSearch()}
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
        </CardHeader>
        <CardBody>
          <div>
            {/* <ProjectsTable /> */}
            <Project2Table />
          </div>
        </CardBody>
      </Card>
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
    searchProjects: (data) => dispatch(searchProjects(data)),
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),
    getReadyrecknersList: (data) => dispatch(getReadyrecknersList(data)),
    getBanksPage: (data) => dispatch(getBanksPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
