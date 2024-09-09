import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link as DomLink, Link } from "react-router-dom";
import Reasign from "./Reasign";
import HistoryWIP from "./HistoryWIP";
import DeleteWip from "./DeleteWip";
import Reschedule from "./Reschedule";


const initialValues = {}
const otherValue = {"position": "absolute",
                     "flex-direction": "column",
                    "margin": "-25px 0 0 0","backgroundColor":"white","border-radius": "7px",
                    "border": "1px solid",
                    "padding": "0 25px"}


const LongMenu = (props) => {
  const [click,setClick]=React.useState(initialValues)
  console.log(click,"lll")

  return (
    <div
    onClick={() => setClick(otherValue)}
    onMouseLeave={() => setClick(initialValues)}
    >
      <div className="d-flex align-items-center "
      
      style={click}>
         <MoreVertIcon style={click.position=='absolute'?{display:"none"}:{margin:"0 -1350px 0 0"}}  />
          <DomLink
            to={`/admin/viewWorkInProgress/${props.data?.id}`}
          >
           <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
        >
          <i className="" aria-hidden="true"></i>View In Case
        </div>
          </DomLink>
            
          <Reasign data={props.data}/>
          <HistoryWIP data={props.data}/>
          {/* <DeleteWip data={props.data}/> */}
          <Reschedule data={props.data}/>
          <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
        >
          <i className="" aria-hidden="true"></i>Hold TAT
        </div>
      </div>
     
    </div>
  );
};

export default LongMenu;
