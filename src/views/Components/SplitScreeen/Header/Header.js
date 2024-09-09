import React from "react";
import { connect } from "react-redux";
import { Tooltip } from "@mui/material";
import { Divider } from "@material-ui/core";
import { getPincodesPage } from "../../../../Redux/Creators/PincodeCreators";

function Header(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000);
  React.useEffect(() => {
    fetchData(page, rowsPerPage);
  }, []);

  const fetchData = (page, rowsPerPage) => {
    const token = props.login?.login?.token;

    console.log("page", page);
    let pageno = page + 1;
    console.log("pageno", pageno);
    let data = {
      pageno: pageno,
      pageSize: rowsPerPage,
      token: token,
    };
    props.getPincodesPage(data);
  };
  const rows = props.pincodes?.pincodes?.data?.isLoading
  ? []
  : props.pincodes?.pincodes?.data?.length > 0
  ? props.pincodes?.pincodes?.data
  : [];
  console.log(rows.find(item => item.pincode === props?.property?.property?.pincode)?.instructions,"hhhhhh",props?.property?.property)
  // console.log(props,"QQ")
  return (
    <div>
      <div style={{ clear: "both" }}>
      <h3 style={{ "text-align": "start",float: "right", width: "30%", color: "white" }}>
        Reopen : {props?.property?.property?.is_reopened==0 ? "Not Reopen":props?.property?.property?.is_reopened}
        </h3>
        <h3 style={{  "text-align": "start", float: "right", width: "20%", color: "white" }}>
          TAT : {props?.property?.property?.tat}
        </h3>
        <h3 style={{ "text-align": "start", float: "right", width: "25%", color: "white" }}>
          Fees : 
          <span>
            <Tooltip
              style={{
                fontSize: "15px",
              }}
              title={<h3 style={{ color: "white" }}>{`1000`}</h3>}
              // title={<h3 style={{ color: "white" }}>{`Age of Property 45`}</h3>}
              placement="top"
            >
              <a
                style={{ fontSize: "12px", color: "white", cursor: "pointer" }}
              >
                View more
              </a>
            </Tooltip>
          </span>
        </h3>
         <h3 style={{ "text-align": "start",float: "right", width: "25%", color: "white" }}>
          Priority : {props?.property?.property?.priority}
        </h3>
        <h3 style={{ float: "left", width: "100%", color: "white" }}>
          Project Name: {props?.property?.property?.project?.project_name}
        </h3>
        <h3 style={{ float: "left", width: "100%", color: "white" }}>
          Customer Name: {props?.property?.property?.customer_name}
        </h3>
        
        <h3 style={{ color: "white" }}>
          Address: {props?.property?.property?.legal_address}
        </h3>
      </div>

      <div style={{ clear: "both", paddingTop: "5px" }}>
        <h3 style={{ float: "left", width: "30%", color: "white" }}>
          Branch: {props?.property?.property?.branch?.branch_name}
          <span>
            <Tooltip
              style={{ fontSize: "15px" }}
              title={
                <h3 style={{ color: "white" }}>
                  {`Bank: ${props?.property?.property?.branch?.bank_name}` +
                    "\n" +
                    `Vertical: ${props?.property?.property?.bank_vertical?.name}`}
                </h3>
              }
              placement="top"
            >
              <a
                style={{
                  fontSize: "12px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                View more
              </a>
            </Tooltip>
          </span>
        </h3>

        <h3 style={{ float: "left", width: "50%", color: "white" }}>
          Site Eng Name: Rakesh
          <span>
            <Tooltip
              style={{ fontSize: "15px" }}
              title={<h3 style={{ color: "white" }}>{`Mobile No.: 828282`}</h3>}
              placement="top"
            >
              <a
                style={{ fontSize: "12px", color: "white", cursor: "pointer" }}
              >
                View more
              </a>
            </Tooltip>
          </span>
        </h3>

        <h3 style={{ float: "left", width: "20%", color: "white" }}>
          Approver :
          <span>
            <Tooltip
              style={{ fontSize: "15px" }}
              title={
                <h3
                  style={{ color: "white" }}
                >{`Tejas Dave Maker Name: UDIT Checker Name : Rakesh`}</h3>
              }
              placement="top"
            >
              <a
                style={{ fontSize: "12px", color: "white", cursor: "pointer" }}
              >
                View more
              </a>
            </Tooltip>
          </span>
        </h3>
        {/* <h3 style={{ float: "left", width: "20%", color: "white" }}>
          TAT : 10 hrs
        </h3> */}
      </div>

      <div style={{ clear: "both", paddingTop: "5px" }}>
        <h3 style={{ float: "left", width: "33%", color: "white" }}>
          Type of Case : {props?.property?.property?.type}
        </h3>
        <h3 style={{ float: "left", width: "33%", color: "white" }}>
          Type of Property : {props?.property?.property?.property_type}
        </h3>
        
        <h3 style={{ float: "left", width: "30%", color: "white" }}>
        <span>
            <Tooltip
              style={{
                fontSize: "15px",
              }}
              title={<h3 style={{ color: "white" }}>{`Age of Property: 45 Area Cosniderd: 575  No of Stories: 11`}</h3>}
              // title={<h3 style={{ color: "white" }}>{`Age of Property 45`}</h3>}
              placement="top"
            >
              <a
                style={{ fontSize: "17px", color: "white", cursor: "pointer" }}
              >
                {/* View more */}
        Property Detials :{props?.property?.property?.compliance?.property_age}
              </a>
            </Tooltip>
          </span>
        </h3>

        
      </div>

      <div style={{ clear: "both", paddingTop: "5px" }}>
       
        <h3 style={{ float: "left", width: "33%", color: "white" }}>
          Configuration : {props?.property?.property?.configuration}
        </h3>
        {/* <h3 style={{ float: "left", width: "25%", color: "white" }}>
          Priority : {props?.property?.property?.priority}
        </h3> */}

        <h3 style={{ float: "left", width: "33%", color: "white" }}>
        Authority: {props?.property?.property?.authority}
        </h3>
        <h3 style={{ float: "left", width: "33%", color: "white" }}>
          Bank Policy:
          <span>
            <Tooltip
              style={{
                fontSize: "15px",
              }}
              title={<h3 style={{ color: "white" }}>{`${props?.property?.property?.branch?.remark}`}</h3>}
              placement="top"
            >
            <a style={{ fontSize: "12px", color: "white", cursor: "pointer" }}>
              View more
            </a>
            </Tooltip>
          </span>
        </h3>
      </div>

      {/* <hr color="white" /> */}

      <div style={{ clear: "both" }}>
        <h3
          style={{
            float: "left",
            width: "100%",
            color: "white",
            paddingTop: "5px",
          }}
        >
          Special Instruction for Admin:
          <span>
            <Tooltip
              style={{ fontSize: "15px" }}
              title={
                <h3
                  style={{ color: "white" }}
                >{`${props?.property?.property?.remark2}`}</h3>
              }
              placement="top"
            >
              <a
                style={{ fontSize: "12px", color: "white", cursor: "pointer" }}
              >
                View more
              </a>
            </Tooltip>
          </span>
        </h3>

        <h3
          style={{
            float: "left",
            width: "100%",
            color: "white",
            paddingTop: "5px",
          }}
        >
          Project / Building Remarks: 
          <span>
            <Tooltip
              style={{ fontSize: "15px" }}
              title={
                <h3
                  style={{ color: "white" }}
                >{`${props?.property?.property?.remark}`}</h3>
              }
              placement="top"
            >
              <a
                style={{ fontSize: "12px", color: "white", cursor: "pointer" }}
              >
                View more
              </a>
            </Tooltip>
          </span>
        </h3>

        <h3
          style={{
            float: "left",
            width: "100%",
            color: "white",
            paddingTop: "5px",
          }}
        >
          Pincode Intelligence:   
          {rows.find(item => item.pincode === props?.property?.property?.pincode)?.instructions}
          <span>
            <Tooltip
              style={{ fontSize: "15px" }}
              title={
                <h3
                  style={{ color: "white" }}
                >{`${rows.find(item => item.pincode === props?.property?.property?.pincode)?.instructions}`}</h3>
              }
              placement="top"
            >
              <a
                style={{ fontSize: "12px", color: "white", cursor: "pointer" }}
              >
                  View more
              </a>
            </Tooltip>
            <a style={{ fontSize: "12px", color: "white", cursor: "pointer" }} href={`https://lvpl.in/librabackend/storage/app/public/PincodeFiles/${rows.find(item => item.pincode === props?.property?.property?.pincode)?.file_upload}`} target="_blank" rel="noopener noreferrer"> : View File</a>
          </span>
        </h3>
      </div>
      <Divider />
        {props?.property?.property.project?.is_npa == 1?
      <div style={{ clear: "both" }}>
        <h3
          style={{
            float: "left",
            width: "100%",
            paddingTop: "5px",
            color:"red",
            background:"white",
            position:"absolute",

          }}
        >
          The Project Of this Property Is NPA
        </h3>
      </div>
          :""}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    propertyid: state.properties.propertyid,
    property: state.property,
    pincodes: state.pincodes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPincodesPage: (data) => dispatch(getPincodesPage(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
