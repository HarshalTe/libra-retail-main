import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DownloadIcon from "@mui/icons-material/Download";

//*download
import axios from "axios";
import fileDownload from "js-file-download";

function DownloadMultiple(props) {
  const downloadData =
    props.data !== null ? props?.data?.selected?.map((data) => data.file) : [];

  console.log("downloadfiles:", downloadData);

  function download_files(data) {
    function download_next(i) {
      console.log("files", data);
      if (i >= data.length) {
        return;
      }

      axios
        .get(
          `https://lvpl.in/librabackend/storage/app/public/NegativeProjectPage/${data[i]}`,
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          fileDownload(res.data, data[i]);
        });
      setTimeout(function () {
        download_next(i + 1);
      }, 1000);
    }
    // Initiate the first download.
    download_next(0);
  }

  return (
    <div>
      <Tooltip title="Download">
        <IconButton onClick={() => download_files(downloadData)}>
          <DownloadForOfflineIcon color="success" />
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
    // negativeProjectsPostData: (data) =>
    //   dispatch(negativeProjectsPostData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadMultiple);
