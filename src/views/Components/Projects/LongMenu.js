import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCaption from "./AddCaption";
import RemarkUpdate from "./RemarkUpdate";
import NpaProperties from "./NpaProperties";
import InventriesUpload from "./InventriesUpload";
import DocumentUpload from "./DocumentUpload";
import ProjectReport from "./ProjectReport";
import CreateReport from "./CreateReport";
import EditProjects from "./EditProjects";
import DedupeProjects from "./DedupeProjects";

const initialValues = {};
const otherValue = {
  position: "absolute",
  "flex-direction": "column",
  margin: "-25px 0 0 0",
  backgroundColor: "white",
  "border-radius": "7px",
  border: "1px solid",
};

const LongMenu = (props) => {
  const [click, setClick] = React.useState(initialValues);
  console.log(click, "lll");

  return (
    <div
      onClick={() => setClick(otherValue)}
      onMouseLeave={() => setClick(initialValues)}
    >
      <div className="d-flex align-items-center " style={click}>
        <MoreVertIcon
          style={
            click.position == "absolute"
              ? { display: "none" }
              : { margin: "0 -1350px 0 0" }
          }
        />
        <EditProjects
          data={props.data}
          index={props.index}
          data2={props.data2}
        />
        {/* <DedupeProjects
          data={props.data}
          index={props.index}
          data2={props.data2}
        /> */}
        <ProjectReport
          data={props.data}
          index={props.index}
          data2={props.data2}
        />
        <CreateReport
          data={props.data}
          index={props.index}
          data2={props.data2}
        />
        <DocumentUpload
          data={props.data}
          index={props.index}
          data2={props.data2}
        />
        <AddCaption data={props.data} index={props.index} data2={props.data2} />
        <InventriesUpload
          data={props.data}
          index={props.index}
          data2={props.data2}
        />
        <NpaProperties
          data={props.data}
          index={props.index}
          data2={props.data2}
        />
      </div>
    </div>
  );
};

export default LongMenu;
