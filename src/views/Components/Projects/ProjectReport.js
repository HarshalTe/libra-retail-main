import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  InputGroup,
  Label,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { editProjectsDataTable } from "../../../Redux/Creators/ProjectsCreators";
import CustomTextField from "../../../components/MuiComponents/CustomTextField";
import DeleteButton from "Helpers/DeleteButton";
import AddButton from "Helpers/AddButton";
import  "./Report.css";
import printJS from "print-js";

function ProjectReport(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const user = {
      id: props.data.id,
      pageno: 1,
      pageSize: 10000,
      token: token,
    };

    

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      id: props.data.id,
      project_name: values.project_name,
      project_boundries: values.project_boundries,
      per_site: values.per_site,
      address: values.address,
      legal_address: values.legal_address,

      //*rera
      rera_no: values.rera_no,
      commencement_date: values.commencement_date,
      end_date: values.end_date,
      revised_end_date: values.revised_end_date,
      building_type: values.building_type,
      amenities: values.amenities,
      surrounding: values.surrounding,
      localities: values.localities,
      neighbourhood: values.neighbourhood,
      road_access: values.road_access,
      road_width: values.road_width,
      road_type: values.road_type,
      approach_road: values.approach_road,
      structure_type: values.structure_type,
      negative_info_project: values.negative_info_project,
      negative_info_locality: values.negative_info_locality,
    };

    console.log("data:", data);

    props.editProjectsDataTable(data,user);
    setSubmitting(true);
    setModal(false);
  };
  const printPdf = () => {
    printJS({
      printable: "htmlToPdf2",
      type: "html",
      scanStyles: true,
      targetStyles: "[*]",
      font_size: "13pt",
      maxWidth: 1080,
      base64: true,
      honorMarginPadding: false,
      style: "@page {  options: footers;  }",
    });
  };

  let rows = props?.data

  const data = rows?.construction_stage;
  let averageProgress
  let averageRecommendation

if (data === null) {
  console.log("Data is null. Cannot calculate average progress.");
} else {
  let totalProgress = 0;
  let totalRecommendation = 0;
  let count = 0;
  let count2 = 0;

  for (let i = 0; i < data.length; i++) {
    const progress = parseInt(data[i].progress);
    if (!isNaN(progress)) {
      totalProgress += progress;
      count++;
    }
  }
  for (let i = 0; i < data.length; i++) {
    const recommendation = parseInt(data[i].recommendation);
    if (!isNaN(recommendation)) {
      totalRecommendation += recommendation;
      count2++;
    }
  }

  averageProgress = count > 0 ? totalProgress / count : 0;
  averageRecommendation = count2 > 0 ? totalRecommendation / count2 : 0;

  console.log("Average progress:", averageProgress);
}

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = currentDate.getFullYear();

const formattedDate = `${day}-${month}-${year}`;

  return (
    <div>
        <div
         style={{
          // "font-family": "Roboto, Helvetica, Arial, sans-serif",
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
          // "margin": "-15px 0 -6px 0",          
          // "padding": "0 48px"
        }}
          onClick={() => toggle()}
        >
           <i className="" aria-hidden="true"></i>Project Report
        </div>
      {/* <Tooltip title="Create Report" placement="top">
        <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1 ml-4"
          onClick={() => toggle()}
        >
          Project Report
        </Button>
      </Tooltip> */}
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Project Report</strong>
          </Typography>
          <Button
            color="success"
            onClick={printPdf}
            className="print-button w-20  m-3"
            // disabled={!print}
          >
            <i className="fa fa-save mr-2" />
            Print Report
          </Button>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              visited_by: "",
              detail: [
                {
                  date: "",
                  state_of_construction: "",
                  status: "",
                },
              ],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({})}
          >
            {(formProps) => (
              <Form>
                <div id="htmlToPdf2" >

                


                <div style={{"textAlign":"center","fontWeight":"bolder","font-size":"36px"}}>{props.data.project_name}</div>
                <div className="ctainer">
                  <div className="item">Visit Date</div>
                  <div className="item"></div>
                </div>
                <div className="ctainer">
                  <div className="item">File Reference no.</div>
                  <div className="item">{props?.data?.ref_no}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Project Name</div>
                  <div className="item">{props?.data?.project_name}</div>
                </div>
                <div className="ctainer1">
                  <div style={{"background-color": "#8ca934b0"}} className="item2">
                BUILDER INFORMATION
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Name of the Builder / Developer</div>
                  <div className="item">{props?.data?.builder_name}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Address of Builder / Developer</div>
                  <div className="item">{props?.data?.builder_address}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Person met on site</div>
                  <div className="item">{props?.data?.builder_contact}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Architect</div>
                  <div className="item"></div>
                </div>
                <div className="ctainer">
                  <div className="item">Brief about builder</div>
                  <div className="item">{props?.data?.previous_project}</div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                PROJECT DETAILS
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Name of the project</div>
                  <div className="item"></div>
                </div>
                <div className="ctainer">
                  <div className="item">Address of the project (as per plan)</div>
                  <div className="item">{props?.data?.address}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Name of the project (as per site)</div>
                  <div className="item">{props?.data?.project_name}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Nearby Landmark</div>
                  <div className="item">{props?.data?.nearby_landmark}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Class of locality</div>
                  <div className="item">{rows?.locality_class}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Proximity to Civil Amenities</div>
                  <div className="item">
                    <div className="ctainer2">
                  <div className="item">{rows?.civil_amenities != null ? rows?.civil_amenities[0]?.bus_station : ""}</div>
                  <div className="item">{rows?.civil_amenities != null ? rows?.civil_amenities[0]?.train_station : ""}</div>
                  {/* <div className="item"></div> */}

                    </div>
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Boundaries</div>
                  <div className="item">
                <div className="ctainer4">
                  <div className="item">North</div>
                  <div className="item">South</div>
                  <div className="item">East</div>
                  <div className="item">West</div>
                  </div>
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">At site</div>
                  <div className="item">
                  {rows?.at_site?.map((row,i)=>(
                  <div className="ctainer4" key={i}>
                  <div className="item">{row?.north}</div>
                  <div className="item">{row?.south}</div>
                  <div className="item">{row?.east}</div>
                  <div className="item">{row?.west}</div>
                  </div>
                  ))}
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Latitude</div>
                  <div className="item">{rows?.longitude}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Longitude</div>
                  <div className="item">{rows?.latitidue}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Plot area permissible</div>
                  <div className="item">{rows?.permissible_plot_area}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Permissible FSI</div>
                  <div className="item">{rows?.permissible_FSI}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Consumed FSI</div>
                  <div className="item">{rows?.consumed_FSI}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Proposed Build up area</div>
                  <div className="item"></div>
                </div>
                <div className="ctainer">
                  <div className="item">Number of wings approved</div>
                  <div className="item">{rows?.wings_NO}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Flat approved as per plan</div>
                  <div className="item">{rows?.approved_flar}</div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                DOCUMENTS DETAILS
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Buildind permission / Commencement certificate</div>
                  <div className="item"></div>
                </div>
                <div className="ctainer">
                  <div className="item">App. Plan Copies & level of approvals</div>
                  <div className="item">{rows?.apporvel_levels}</div>
                </div>
                <div className="ctainer">
                  <div className="item">MAHARERA No.</div>
                  <div className="item">{rows?.rera_no}</div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                LAND / BUILDING DETAILS
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Approved land use</div>
                  <div className="item">{rows?.approved_land_use}</div>
                </div>
                <div className="ctainer">
                  <div className="item">No. of Shops/Offices/Showrooms</div>
                  <div className="item">{rows?.shop_nos}</div>
                </div>
                <div className="ctainer">
                  <div className="item">No. of Flats/Sale area.& Carpet area of Flat</div>
                  <div className="item">{rows?.flat_carpet_area}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Flat no.</div>
                  <div className="item">{props?.data?.flat_no}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Type of Construction</div>
                  <div className="item">{rows?.construction_type}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Over-all Quality of Construction</div>
                  <div className="item">{rows?.construction_quality}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Amenities within flat</div>
                  <div className="item">

                  <div className="ctainer">
                  <div className="item">Flooring</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.floring : ""}</div>
                  <div className="item">Door</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.doors : ""}</div>
                  <div className="item">Window</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.windows : ""}</div>
                  <div className="item">Kitchen Platform</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.kitchen : ""}</div>
                  <div className="item">Concealed Plumbing</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.plumbing : ""}</div>
                  <div className="item">Concealed Electrification</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.electrification : ""}</div>
                  <div className="item">Other</div>
                  <div className="item">{rows?.amenitites_flat != null ? rows?.amenitites_flat[0]?.other : ""}</div>

                </div>
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Amenities with in project</div>
                  <div className="item">{rows?.project_amenities}</div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                VIOLATION OBSERVED IF ANY
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Risk associated (if any)</div>
                  <div className="item">{rows?.associated_risk}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Is the property is any negative list/ unauthorised layout as per authorities (if any)</div>
                  <div className="item">{rows?.unauthorized_layout}</div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                RATE AND VALUE
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Rate in the Vicinity for similer properties</div>
                  <div className="item">{rows?.vicinity_rate}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Rate of flat as quoted by builder</div>
                  <div className="item">{rows?.flat_rate}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Recommended rate of flats</div>
                  <div className="item">{rows?.recommended_rate}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Floor Rise</div>
                  <div className="item">{props?.data?.no_of_floor}</div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                COMPLETION STATUS
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Stage of Construction</div>
                  <div className="item"></div>
                  {/* <div className="item">{rows?.construction_stage}</div> */}
                </div>
                <div className="ctainer">
                  <div className="item">% of Completion</div>
                  <div className="item">
                  <div className="ctainer4">
                  <div className="item"></div>
                  <div className="item">Progess</div>
                  <div className="item">Recommendation</div>
                  <div className="item">Remark</div>
                  </div>
                  {rows?.construction_stage?.map((row,i)=>{
                    return(
                  <div className="ctainer4" key={i}>
                  <div className="item">{row?.wings}</div>
                  <div className="item">{row?.progress}%</div>
                  <div className="item">{row?.recommendation}%</div>
                  <div className="item">{row?.remark}</div>
                  </div>
                    )
                  })}
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Stage of Construction</div>
                  <div className="item">
                  <div className="ctainer4">
                  <div className="item"></div>
                  <div className="item">{averageProgress}%</div>
                  <div className="item">{averageRecommendation}%</div>
                  <div className="item"></div>
                  </div>
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Date of Commencement(as per RERA)</div>
                  <div className="item">{props?.data?.commencement_date}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Proposed date of Completion (as per RERA)</div>
                  <div className="item">{rows?.rera_date}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Proposed date of Completion (as per Developer)</div>
                  <div className="item">{rows?.developer_date}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Proposed date of Completion (as per our opinion)</div>
                  <div className="item">{rows?.opinion_date}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Annexure/Remark if any</div>
                  <div className="item">{rows?.remarks}</div>
                </div>
                <div className="ctainer1">
                  <div className="">&nbsp;
                  </div>
                </div>
                <div className="ctainer1">
                  <div className="item2">
                  Declaration
                  </div>
                </div>
                <div className="ctainer1">
                  <div className="item3">
                    1.
                  </div>
                </div>
                <div className="ctainer1">
                  <div className="item3">
                  2.
                  </div>
                </div>
                <div className="ctainer1">
                  <div className="item3">
                  3.
                  </div>
                </div>
                <div className="ctainer">
                  <div className="item">Place</div>
                  <div className="item">MUMBAI</div>
                </div>
                <div className="ctainer">
                  <div className="item">Date</div>
                  <div className="item">{formattedDate}</div>
                </div>
                <div className="ctainer">
                  <div className="item">Name Of The Valuer</div>
                  <div className="item">LIBRA VALUERS</div>
                </div>
                <Divider/>
                <div className="ctainer1">
                  <div className="item2">
                  Photographs
                  </div>
                </div>
        <div className="blockquote">
          {rows?.photos?.map((src,i)=>{
            // console.log("objectrow",rows?.image_uploads,src)
            return(
              <div key={i} style={{"border":"2px solid", "width": "fit-content","margin": "50px"}}>
          <img src={`https://lvpl.in/librabackend/storage/app/public/ProjectPhotographs/${src}`} alt="" height={380} width={380} />
          <div style={{"font-size": "19px","font-weight": "700","textAlign":"center"}}>{rows?.captions[i]}</div>

          </div>
            )

          })}
        </div>

        <div className="ctainer1">
                  <div className="item2">
                  Project Latitude / Longitude & Location Map
                  </div>
                </div>

        <div className="test-b test-r test-l w-100">
                     
                        <div className="w-70 mr-auto ml-auto">
                        <iframe 
  src={`https://maps.google.com/maps?q=${rows?.latitidue},${rows?.longitude}&t=k&z=15&output=embed`}
  height="296" 
  width="100%" 
  frameborder="0" 
  scrolling="no"
  >
</iframe>
                        {/* <iframe src={`https://maps.google.com/maps?q=${props?.property?.property?.latitude},${props?.property?.property?.longitude}&hl=es;&output=embed`} style={{"height": "296px","width": "100%"}}></iframe> */}

                          {/* <img src={Map} alt="map" className="w-100" /> */}
                        </div>
                        <p className="p-1 mt-4 text-center">
                          Longitude, Latitude: {props?.property?.property?.longitude} , {props?.property?.property?.latitude}
                        </p>
                      </div>
                </div>


                <Divider />
                <Row className="pt-4 pd-4">
                  <Col md={6}>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>

                  <Col md={6}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      onClick={() => toggle()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
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
    editProjectsDataTable: (data,user) => dispatch(editProjectsDataTable(data,user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectReport);
