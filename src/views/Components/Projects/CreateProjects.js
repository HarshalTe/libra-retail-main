import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Label,
} from "reactstrap";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
} from "@mui/material";
import JoditEditor from "jodit-react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

//*Actions
import { postProjects2 } from "../../../Redux/Creators/ProjectsCreators";
import HeatMapRadius from "./HeatMapRadius";
import TableCompatable from "./TableCompatable";
import "./Report.css";

const styles = {
  container: {
    border: "1px solid #ccc",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    marginBottom: "10px",
  },
  dropdownField: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "5px",
    marginBottom: "5px",
  },
  optionsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "10px",
    maxHeight: "200px",
    overflowY: "auto",
    border: "1px solid #ccc",
    padding: "10px",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "5px",
  },
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function CreateProjects(props) {
  const token = props.login?.login?.token;

  const [modal, setModal] = useState(false);
  const [content, setContent] = React.useState("");
  const [expanded, setExpanded] = React.useState("panel1");

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);
  const [selectedAuthorities2, setSelectedAuthorities2] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChange3 = (authority) => {
    setSelectedAuthorities((prev) =>
      prev.includes(authority)
        ? prev.filter((a) => a !== authority)
        : [...prev, authority]
    );
  };
  const handleChange4 = (authority) => {
    setSelectedAuthorities2((prev) =>
      prev.includes(authority)
        ? prev.filter((a) => a !== authority)
        : [...prev, authority]
    );
  };

  const [files, setFiles] = useState({});

  const handleFileChange = (event) => {
    const { name, files: selectedFiles } = event.target;
    const file = selectedFiles[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [name]: {
          file,
          fileURL: URL.createObjectURL(file),
        },
      }));
    }
  };

  const openImageInNewTab = (fileURL) => {
    if (fileURL) {
      window.open(fileURL, "_blank");
    }
  };

  const getCoordinates = (addressPostal) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        addressPostal
      )}&key=AIzaSyC2rc_SiT0rFPip8WdQ5f8YeBPIAaVAG8Q`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCoordinates({ lat: location.lat, lng: location.lng });
        } else {
          alert("No results found");
        }
      });
  };

  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    let users = {
      token: token,
      pageno: 1,
      pageSize: 100000,
    };

    const data = new FormData();
    data.append("project_name", values.project_name);
    data.append("project_boundries", JSON.stringify(values.project_boundries));
    // data.append("project_boundries", values.project_boundries);
    data.append("per_site", values.per_site);
    data.append("address", values.address);
    data.append("legal_address", values.legal_address);
    data.append("rera_no", values.rera_no);
    data.append("commencement_date", values.commencement_date);
    data.append("end_date", values.end_date);
    data.append("revised_end_date", values.revised_end_date);
    data.append("building_type", values.building_type);
    // data.append("amenities", values.amenities);
    data.append("amenities", JSON.stringify(selectedAuthorities2));
    data.append("project_amenities", selectedAuthorities2);
    data.append("surrounding", values.surrounding);
    data.append("localities", values.localities);
    data.append("neighbourhood", values.neighbourhood);
    data.append("road_access", values.road_access);
    data.append("road_width", values.road_width);
    data.append("road_type", values.road_type);
    data.append("approach_road", values.approach_road);
    data.append("structure_type", values.structure_type);
    data.append("negative_info_project", values.negative_info_project);
    data.append("negative_info_locality", values.negative_info_locality);
    data.append("approving_authority", JSON.stringify(selectedAuthorities));
    data.append("corp_limit", values.corp_limit);
    data.append("municipal_limit", values.municipal_limit);
    data.append("tpvd", values.tpvd);
    data.append("commercial_property", values.commercial_property);
    data.append("building_age", values.building_age);
    data.append("residual_age", values.residual_age);
    data.append("gf", values.gf);
    data.append("project_details", JSON.stringify(values.project_details));
    data.append("builder_name", values.builder_name);
    data.append("builder_address", values.builder_address);
    data.append("builder_contact", values.builder_contact);
    data.append("previous_project", values.previous_project);
    data.append("permit_details", values.permit_details);
    data.append("negative_info", values.negative_info);
    data.append("tp_no", values.tp_no);
    data.append("survey_no", values.survey_no);
    data.append("fp_no", values.fp_no);
    data.append("cts_no", values.cts_no);
    data.append("sp_no", values.sp_no);
    data.append("op_no", values.op_no);
    data.append("plot_no", values.plot_no);
    data.append("block_no", values.block_no);
    data.append("flat_no", values.flat_no);
    data.append("khasra_no", values.khasra_no);
    data.append("negative_info_remark", values.negative_info_remark);
    data.append("pincode", values.pincode?.pincode);
    data.append("location", values.location);
    data.append("area", values.area);
    data.append(
      "project_tower_details",
      JSON.stringify(values.project_tower_details)
    );
    data.append("special_remarks", JSON.stringify(values.special_remarks));
    data.append(
      "project_flat_details",
      JSON.stringify(values.project_flat_details)
    );
    // data.append("special_remarks", JSON.stringify(values.special_remarks));
    data.append("visit_date", values.visit_date);
    data.append("sourced_by", values.sourced_by);
    data.append("phone_num", values.phone_num);
    data.append("person_meet", values.person_meet);
    data.append("architect", values.architect);
    data.append("locality_class", values.locality_class);
    data.append("civil_amenities", JSON.stringify(values.civil_amenities));
    data.append("at_site", JSON.stringify(values.at_site));
    // data.append("pb_north", values.at_site[0]?.north_site);
    // data.append("pb_west", values.at_site[0]?.west_site);
    // data.append("pb_east", values.at_site[0]?.east_site);
    // data.append("pb_south", values.at_site[0]?.south_site);
    data.append("longitude", values.longitude);
    data.append("latitidue", values.latitidue);
    data.append("permissible_FSI", values.permissible_FSI);
    data.append("permissible_plot_area", values.permissible_plot_area);
    data.append("consumed_FSI", values.consumed_FSI);
    data.append("wings_NO", values.wings_NO);
    data.append("approved_flar", values.approved_flar);
    data.append("carpet_area", values.carpet_area);
    data.append("apporvel_levels", values.apporvel_levels);
    data.append("approved_land_use", values.approved_land_use);
    data.append("shop_nos", values.shop_nos);
    data.append("flat_carpet_area", values.flat_carpet_area);
    data.append("construction_type", values.construction_type);
    data.append("construction_quality", values.construction_quality);
    data.append("amenitites_flat", JSON.stringify(values.amenitites_flat));
    data.append("unauthorized_layout", values.unauthorized_layout);
    data.append("associated_risk", values.associated_risk);
    data.append("vicinity_rate", values.vicinity_rate);
    data.append("flat_rate", values.flat_rate);
    data.append("recommended_rate", values.recommended_rate);
    // data.append(
    //   "construction_stage",
    //   JSON.stringify(values.construction_stage)
    // );
    data.append("construction_stage", values.construction_stage);
    data.append("percent_completion", values.percent_completion);
    data.append("rera_date", values.rera_date);
    data.append("opinion_date", values.opinion_date);
    data.append("developer_date", values.developer_date);
    data.append("remarks", values.remarks);
    data.append("declaration", JSON.stringify(content));
    data.append("is_underconstruction", values.is_underconstruction);
    data.append("is_npa", values.is_npa);
    data.append("is_negative", values.is_negative);
    data.append("cc_date", values.cc_date);
    data.append("commercial_net_yield", values.commercial_net_yield);
    data.append("commercial_gross_yield", values.commercial_gross_yield);
    data.append("residential_net_yield", values.residential_net_yield);
    data.append(
      "residential_gross_yieldcommercial_net_yield",
      values.residential_gross_yieldcommercial_net_yield
    );
    data.append("ready_reckner_id", values.ready_reckner_id);
    data.append("npa_remarks", values.npa_remarks);
    data.append("npa_file_upload", values.npa_file_upload);
    data.append("negative_file_upload", values.negative_file_upload);
    data.append(
      "stage_recommendation_completion",
      values.stage_recommendation_completion
    );
    data.append("no_towers", values.no_towers);
    data.append("report_remark", values.report_remark);
    data.append("sociaty_name", values.sociaty_name);
    data.append("taluka", values.taluka);
    data.append("state", values.state);
    data.append("country", values.country);
    data.append("district", values.districtname);
    data.append("city", values.city);
    data.append("village", values.village);
    data.append("percentage", values.percentage);
    data.append("rera_bank", values.rera_bank);
    data.append("client_bank", values.client_bank);
    // new fields
    data.append("developer_track_record", JSON.stringify(values.developer_track_record));
data.append("details_of_builders", JSON.stringify(values.details_of_builders));
data.append("rera_bank", JSON.stringify(values.rera_bank));
// data.append("document_details", values.document_details);
data.append("street_name", values.street_name);
data.append("project_approved_by_bank", values.project_approved_by_bank);
data.append("project_finance_by", values.project_finance_by);
data.append("view_of_project", values.view_of_project);
data.append("ward_no", values.ward_no);
data.append("sector_no", values.sector_no);
data.append("gut_no", values.gut_no);
data.append("contact_person_name", values.contact_person_name);
data.append("contact_person_mobile_number", values.contact_person_mobile_number);
data.append("project_zoning", values.project_zoning);
data.append("project_zoning_remarks", values.project_zoning_remarks);
data.append("project_zoning_file_upload", values.project_zoning_file_upload);
data.append("is_project_boundries_matching", values.is_project_boundries_matching);
data.append("nearest_bus_station", values.nearest_bus_station);
data.append("nearest_railway_station", values.nearest_railway_station);
data.append("nearest_hospital", values.nearest_hospital);
data.append("nearest_airport", values.nearest_airport);
data.append("name_of_engg", values.name_of_engg);
data.append("no_of_floors_approved", JSON.stringify(values.no_of_floors_approved));
data.append("no_of_apartments_approved", JSON.stringify(values.no_of_apartments_approved));
data.append("project_base_rate", JSON.stringify(values.project_base_rate));
data.append("comparable", JSON.stringify(values.comparable));
data.append("project_broker", JSON.stringify(values.project_broker));

    

    props.postProjects2(data, users);
    setSubmitting(true);
    setModal(false);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [personName, setPersonName] = React.useState([]);
  const [personName2, setPersonName2] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [childData, setChildData] = React.useState([]);

  let rows = [];

  const rows2 = rows?.length > 1 ? rows : [];

  const handleChildData = (data) => {
    setChildData(data);
  };
  const rowsProject = props?.avm?.avm?.isLoading
    ? []
    : props?.projects?.projects?.data?.length > 0
    ? props?.projects?.projects?.data?.filter(
        (row) => row.is_underconstruction === 1
      )
    : [];

  const arrayOfIdsToFilter = props?.unstructured?.unstructured?.comparable_ids;

  const filteredObjects = rowsProject?.filter((obj) =>
    arrayOfIdsToFilter?.includes(obj?.id)
  );

  return (
    <div>
      <Tooltip title="Add Projects" placement="top">
        <Button
          variant="outlined"
          style={{ width: "max-content" }}
          color="success"
          size="small"
          className="ml-3"
          onClick={() => toggle()}
          fullWidth
          startIcon={<AddIcon fontSize="inherit" />}
        >
          Create New Projects
        </Button>
      </Tooltip>
      <Modal
        className="modal-xl"
        size="large"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Add Projects</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              project_name: "",
              project_boundries: [], //add karwa
              per_site: "",
              address: "",
              legal_address: "", //add karwa
              //*rera
              rera_no: "",
              commencement_date: moment().format("YYYY-MM-DD"),
              end_date: moment().format("YYYY-MM-DD"),
              revised_end_date: moment().format("YYYY-MM-DD"),
              building_type: "", //add karwa
              amenities: [],
              surrounding: "",
              localities: "",
              neighbourhood: "", //add karwa
              road_access: "",
              road_width: "",
              road_type: "",
              approach_road: "",
              structure_type: "",
              negative_info_project: "",
              negative_info_locality: "",

              //*Documents
              approving_authority: [],
              corp_limit: "",
              municipal_limit: "",
              tpvd: "",
              commercial_property: "",
              building_age: "",
              residual_age: "",
              gf: "",

              //*
              project_details: [],
              doc_name: "",
              date: moment().format("YYYY-MM-DD"),
              ref_no: "",
              floors_no: "",
              remarks: "",
              //*
              tower_details: [],
              flat_details: [],
              // doc_name: "",
              // date: moment().format("YYYY-MM-DD"),
              // ref_no: "",
              // floors_no: "",
              // remarks: "",
              //*

              //*Builder
              builder_name: "",
              builder_address: "",
              builder_contact: "",
              previous_project: "",
              permit_details: "",
              negative_info: "",
              //* new
              tp_no: "",
              survey_no: "",
              fp_no: "",
              cts_no: "",
              sp_no: "",
              op_no: "",
              plot_no: "",
              block_no: "",
              flat_no: "",
              khasra_no: "",
              negative_info_remark: "",
              pincode: "",
              location: "",
              area: "",
              project_tower_details: [],
              project_flat_details: [],
              special_remarks: [],
              // date: "",
              visit_date: moment().format("YYYY-MM-DD"),
              completion_date: moment().format("YYYY-MM-DD"),
              sourced_by: "",
              phone_num: "",
              person_meet: "",
              architect: "",
              locality_class: "",
              civil_amenities: [],
              at_site: [],
              longitude: "",
              latitidue: "",
              permissible_FSI: "",
              permissible_plot_area: "",
              consumed_FSI: "",
              wings_NO: "",
              approved_flar: "",
              carpet_area: "",
              apporvel_levels: "",
              approved_land_use: "",
              shop_nos: "",
              flat_carpet_area: "",
              construction_type: "",
              construction_quality: "",
              amenitites_flat: [],
              project_amenities: [],
              unauthorized_layout: "",
              associated_risk: "",
              vicinity_rate: "",
              flat_rate: "",
              recommended_rate: "",
              construction_stage: [],
              percent_completion: "",
              rera_date: moment().format("YYYY-MM-DD"),
              opinion_date: moment().format("YYYY-MM-DD"),
              developer_date: moment().format("YYYY-MM-DD"),
              cc_date: moment().format("YYYY-MM-DD"),
              current_date: moment().format("YYYY-MM-DD"),
              review_date: moment().format("YYYY-MM-DD"),
              // remarks: "",
              declaration: [],
              is_underconstruction: "0",
              is_npa: "0",
              is_negative: "0",
              commercial_net_yield: "",
              commercial_gross_yield: "",
              residential_net_yield: "",
              residential_gross_yieldcommercial_net_yield: "",
              ready_reckner_id: "",
              npa_remarks: "",
              npa_file_upload: "",
              negative_file_upload: "",
              b_north: "",
              b_south: "",
              b_east: "",
              b_west: "",
              pb_north: "",
              pb_west: "",
              pb_east: "",
              pb_south: "",
              report_remark: "",
              no_towers: "",
              //ready reackner
              village_name: "",
              area_type: "",
              local_body_type: "",
              local_body_name: "",
              landmark: "",
              zone: "",
              subzone: "",
              land: "",
              residential: "",
              office: "",
              shop: "",
              industrial: "",
              cs_no: "",
              tps_no: "",
              sociaty_name: "",
              taluka: "",
              state: "",
              country: "India",
              district: "",
              city: "",
              village: "",
              percentage: "",
              client_bank: "",
              // rera_bank: "",

              developer_track_record: [],
              details_of_builders: [],
              rera_bank: [],
              document_details: [],
              // new field added
              street_name: "",
              project_approved_by_bank: "",
              project_finance_by: "",
              view_of_project: "",
              ward_no: "",
              sector_no: "",
              gut_no: "",
              contact_person_name: "",
              contact_person_mobile_number: "",
              project_zoning: "",
              project_zoning_remarks: "",
              project_zoning_file_upload: "",
              is_project_boundries_matching: "",
              nearest_bus_station: "",
              nearest_railway_station: "",
              nearest_hospital: "",
              nearest_airport: "",
              name_of_engg: "",
              no_of_floors_approved: [],
              no_of_apartments_approved: [],
              project_base_rate: [],
              comparable: [],
              project_broker: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              project_name: Yup.string().required("Project Name is required"),
              address: Yup.string().required("Project Address is required"),
              ready_reckner_id: Yup.string().required(
                "Ready Reckoner Master Address is required"
              ),
            })}
          >
            {(formProps) => {
              const handleViewFile = () => {
                if (formProps.values.negative_file_upload) {
                  window.open(formProps.values.negative_file_upload, "_blank");
                }
              };

              const pincodeProps = {
                options: props.pincodes?.isLoading
                  ? []
                  : props.pincodes?.pincodes?.data?.map((pincode) => pincode),
              };
              return (
                <Form>
                  <Row>
                    <Col md="12" className="mt-4">
                      <Accordion
                        expanded={expanded === "contact_person"}
                        onChange={handleExpand("contact_person")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>
                            Contact Person Details For Project
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              {/* <Col md={4} className="pb-4">
                                  <TextField
                                    fullWidth
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    label="Visit Date"
                                    id="visit_date"
                                    name="visit_date"
                                    value={formProps.values.visit_date}
                                    onChange={formProps.handleChange}
                                  />
                                </Col>
                                <Col md={4} className="pb-4">
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label="Sourced By"
                                    id="sourced_by"
                                    name="sourced_by"
                                    value={formProps.values.sourced_by}
                                    onChange={formProps.handleChange}
                                  />
                                </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Person to Meet"
                                  id="person_meet"
                                  name="person_meet"
                                  value={formProps.values.person_meet}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Phone Number"
                                  id="phone_num"
                                  name="phone_num"
                                  value={formProps.values.phone_num}
                                  onChange={formProps.handleChange}
                                />
                              </Col> */}
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="contact_person_name"
                                  name="contact_person_name"
                                  label="Name of Contact Person"
                                  variant="outlined"
                                  value={formProps.values.contact_person_name}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="contact_person_mobile_number"
                                  name="contact_person_mobile_number"
                                  label="Mobile Number"
                                  type="number"
                                  variant="outlined"
                                  value={
                                    formProps.values
                                      .contact_person_mobile_number
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                    <Col md="12" className="mt-4">
                      <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleExpand("panel3")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Project Detail</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              <Col md={12} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="project_name"
                                  name="project_name"
                                  label="Project Name"
                                  value={formProps.values.project_name}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.project_name &&
                                    Boolean(formProps.errors.project_name)
                                  }
                                  helperText={
                                    formProps.touched.project_name &&
                                    formProps.errors.project_name
                                  }
                                />
                              </Col>
                              <Col md={12} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="sociaty_name"
                                  name="sociaty_name"
                                  label="Society Name"
                                  value={formProps.values.sociaty_name}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.sociaty_name &&
                                    Boolean(formProps.errors.sociaty_name)
                                  }
                                  helperText={
                                    formProps.touched.sociaty_name &&
                                    formProps.errors.sociaty_name
                                  }
                                />
                              </Col>
                              <Col md={12} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Legal address"
                                  id="legal_address"
                                  name="legal_address"
                                  value={formProps.values.legal_address}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={12} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Postal Address"
                                  id="address"
                                  name="address"
                                  value={formProps.values.address}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.address &&
                                    Boolean(formProps.errors.address)
                                  }
                                  helperText={
                                    formProps.touched.address &&
                                    formProps.errors.address
                                  }
                                />
                              </Col>
                              <Col md={3} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Latitude"
                                  id="latitidue"
                                  name="latitidue"
                                  value={coordinates.lat}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={3} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Longitude"
                                  id="longitude"
                                  name="longitude"
                                  value={coordinates.lng}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={2} className="pb-4">
                                <Button
                                  color="error"
                                  size="small"
                                  variant="contained"
                                  onClick={() =>
                                    getCoordinates(formProps.values.address)
                                  }
                                  // disabled={!formProps.values.address} // Disable if address is null or an empty string
                                  disabled
                                >
                                  Get Coordinates
                                </Button>
                              </Col>

                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  id="area-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) => field?.name === "Area"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "area",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.area &&
                                          formProps.errors.area
                                      )}
                                      fullWidth
                                      helperText={
                                        formProps.touched.area &&
                                        formProps.errors.area
                                      }
                                      label="Area"
                                      name="area"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="street_name"
                                  name="street_name"
                                  label="Street Name"
                                  variant="outlined"
                                  value={formProps.values.street_name}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Village"
                                  id="village"
                                  name="village"
                                  value={formProps.values.village}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  id="taluka-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) => field?.name === "Taluka"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "taluka",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.taluka &&
                                          formProps.errors.taluka
                                      )}
                                      fullWidth
                                      helperText={
                                        formProps.touched.taluka &&
                                        formProps.errors.taluka
                                      }
                                      label="Taluka"
                                      name="taluka"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Near Landmark"
                                  id="location"
                                  name="location"
                                  value={formProps.values.location}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <>
                                  <Autocomplete
                                    id="contact-autocomplete"
                                    options={pincodeProps.options}
                                    getOptionLabel={(pincode) =>
                                      `${pincode?.pincode}, ${pincode?.city}, ${pincode?.districtname}, ${pincode?.state}`
                                    }
                                    onChange={(e, value) => {
                                      formProps.setFieldValue(
                                        "city",
                                        value.city || ""
                                      );
                                      formProps.setFieldValue(
                                        "district",
                                        value.districtname || ""
                                      );
                                      formProps.setFieldValue(
                                        "state",
                                        value.state || ""
                                      );
                                      formProps.setFieldValue(
                                        "pincode",
                                        value.pincode || ""
                                      );
                                    }}
                                    onOpen={formProps.handleBlur}
                                    includeInputInList
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={Boolean(
                                          formProps.touched.pincode &&
                                            formProps.errors.pincode
                                        )}
                                        fullWidth
                                        helperText={
                                          formProps.touched.pincode &&
                                          formProps.errors.pincode
                                        }
                                        label="Pincode"
                                        name="pincode"
                                        variant="outlined"
                                      />
                                    )}
                                  />
                                </>
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="city"
                                  name="city"
                                  label="City "
                                  variant="outlined"
                                  value={formProps.values.city}
                                  onChange={formProps.handleChange}
                                ></TextField>
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="district"
                                  name="district"
                                  label="District "
                                  variant="outlined"
                                  value={formProps.values.district}
                                  onChange={formProps.handleChange}
                                ></TextField>
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="state"
                                  size="small"
                                  name="state"
                                  label="State "
                                  variant="outlined"
                                  value={formProps.values.state}
                                  onChange={formProps.handleChange}
                                ></TextField>
                              </Col>
                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  id="country-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) => field?.name === "Country"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "country",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.country &&
                                          formProps.errors.country
                                      )}
                                      fullWidth
                                      helperText={
                                        formProps.touched.country &&
                                        formProps.errors.country
                                      }
                                      label="Country "
                                      name="country"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="road_name"
                                  name="road_name"
                                  label="Road Name"
                                  variant="outlined"
                                  value={formProps.values.road_name}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="gut_no"
                                  name="gut_no"
                                  label="Gut No"
                                  variant="outlined"
                                  value={formProps.values.gut_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="tp_no"
                                  name="tp_no"
                                  label="TP No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.tp_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.tp_no &&
                                    Boolean(formProps.errors.tp_no)
                                  }
                                  helperText={
                                    formProps.touched.tp_no &&
                                    formProps.errors.tp_no
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="survey_no"
                                  name="survey_no"
                                  label="Survey No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.survey_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.survey_no &&
                                    Boolean(formProps.errors.survey_no)
                                  }
                                  helperText={
                                    formProps.touched.survey_no &&
                                    formProps.errors.survey_no
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="fp_no"
                                  name="fp_no"
                                  label="FP No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.fp_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="sp_no"
                                  name="sp_no"
                                  label="SP No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.sp_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="op_no"
                                  name="op_no"
                                  label="OP No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.op_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="plot_no"
                                  name="plot_no"
                                  label="Plot No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.plot_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="block_no"
                                  name="block_no"
                                  label="Block No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.block_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="khasra_no"
                                  name="khasra_no"
                                  label="Khasra No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.khasra_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="sector_no"
                                  name="sector_no"
                                  label="Sector No"
                                  variant="outlined"
                                  value={formProps.values.sector_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="ward_no"
                                  name="ward_no"
                                  label="Ward No"
                                  variant="outlined"
                                  value={formProps.values.ward_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  select
                                  id="is_negative"
                                  size="small"
                                  name="is_negative"
                                  label="Is Project Negative"
                                  variant="outlined"
                                  value={formProps.values.is_negative}
                                  onChange={formProps.handleChange}
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value={1}>Yes</MenuItem>
                                  <MenuItem value={0}>No</MenuItem>
                                </TextField>
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  hidden={
                                    formProps.values.is_negative == 1
                                      ? false
                                      : true
                                  }
                                  size="small"
                                  id="negative_remark"
                                  name="negative_remark"
                                  label="Project Negative Remark"
                                  value={formProps.values.negative_remark}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.negative_remark &&
                                    Boolean(formProps.errors.negative_remark)
                                  }
                                  helperText={
                                    formProps.touched.negative_remark &&
                                    formProps.errors.negative_remark
                                  }
                                />
                              </Col>
                              <Col md={2} className="pb-4">
                                <input
                                  type="file"
                                  name="negative_file_upload"
                                  onChange={handleFileChange}
                                />
                                {/* <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="file"
                                  hidden={
                                    formProps.values.is_negative == 1
                                      ? false
                                      : true
                                  }
                                  size="small"
                                  id="negative_file_upload"
                                  name="negative_file_upload"
                                  value={formProps.values.negative_file_upload}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.negative_file_upload &&
                                    Boolean(
                                      formProps.errors.negative_file_upload
                                    )
                                  }
                                  helperText={
                                    formProps.touched.negative_file_upload &&
                                    formProps.errors.negative_file_upload
                                  }
                                /> */}
                              </Col>
                              <Col md={2} className="pb-4">
                                {files.negative_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={files.negative_file_upload.fileURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View File
                                  </Button>
                                )}
                                {/* {formProps.values.negative_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    // href={URL.createObjectURL(formProps.values.negative_file_upload)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    disabled={
                                      formProps.values.is_negative !== 1
                                    }
                                  >
                                    View File
                                  </Button>
                                )} */}
                              </Col>
                              {/* <Col md={8}></Col> */}
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  select
                                  id="is_npa"
                                  size="small"
                                  name="is_npa"
                                  label="Is Project NPA"
                                  variant="outlined"
                                  value={formProps.values.is_npa}
                                  onChange={formProps.handleChange}
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value={1}>Yes</MenuItem>
                                  <MenuItem value={0}>No</MenuItem>
                                </TextField>
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  hidden={
                                    formProps.values.is_npa == 1 ? false : true
                                  }
                                  size="small"
                                  id="npa_remarks"
                                  name="npa_remarks"
                                  label="Project NPA Remark"
                                  value={formProps.values.npa_remarks}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.npa_remarks &&
                                    Boolean(formProps.errors.npa_remarks)
                                  }
                                  helperText={
                                    formProps.touched.npa_remarks &&
                                    formProps.errors.npa_remarks
                                  }
                                />
                              </Col>
                              <Col md={2} className="pb-4">
                                {/* <TextField
                                  fullWidth
                                  hidden={
                                    formProps.values.is_npa == 1 ? false : true
                                  }
                                  name="npa_file_upload"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "npa_file_upload",
                                      e.currentTarget.files[0]
                                    );
                                  }}
                                  type="file"
                                  error={
                                    formProps.touched.npa_file_upload &&
                                    Boolean(formProps.errors.npa_file_upload)
                                  }
                                  helperText={
                                    formProps.touched.npa_file_upload &&
                                    formProps.errors.npa_file_upload
                                  }
                                /> */}
                                <input
                                  type="file"
                                  name="npa_file_upload"
                                  onChange={handleFileChange}
                                />
                              </Col>
                              <Col md={2} className="pb-4">
                                {files.npa_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={files.npa_file_upload.fileURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View File
                                  </Button>
                                )}
                                {/* {formProps.values.npa_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    // href={URL.createObjectURL(formProps.values.npa_file_upload)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    disabled={
                                      formProps.values.npa_file_upload !== 1
                                    }
                                  >
                                    View File
                                  </Button>
                                )} */}
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="project_zoning"
                                  size="small"
                                  name="project_zoning"
                                  label="Zoning of the Project"
                                  variant="outlined"
                                  value={formProps.values.project_zoning}
                                  onChange={formProps.handleChange}
                                ></TextField>
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  id="project_zoning_remarks"
                                  name="project_zoning_remarks"
                                  label="Remark"
                                  value={
                                    formProps.values.project_zoning_remarks
                                  }
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.project_zoning_remarks &&
                                    Boolean(
                                      formProps.errors.project_zoning_remarks
                                    )
                                  }
                                  helperText={
                                    formProps.touched.project_zoning_remarks &&
                                    formProps.errors.project_zoning_remarks
                                  }
                                />
                              </Col>
                              <Col md={2} className="pb-4">
                                {/* <TextField
                                  fullWidth
                                  hidden={
                                    formProps.values.project_zoning == 1 ? false : true
                                  }
                                  name="project_zoning_file_upload"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "project_zoning_file_upload",
                                      e.currentTarget.files[0]
                                    );
                                  }}
                                  type="file"
                                  error={
                                    formProps.touched
                                      .project_zoning_file_upload &&
                                    Boolean(
                                      formProps.errors
                                        .project_zoning_file_upload
                                    )
                                  }
                                  helperText={
                                    formProps.touched
                                      .project_zoning_file_upload &&
                                    formProps.errors.project_zoning_file_upload
                                  }
                                /> */}
                                <input
                                  type="file"
                                  name="project_zoning_file_upload"
                                  onChange={handleFileChange}
                                />
                              </Col>
                              <Col md={2} className="pb-4">
                                {files.project_zoning_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={
                                      files.project_zoning_file_upload.fileURL
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View File
                                  </Button>
                                )}
                                {/* {formProps.values
                                  .project_zoning_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    // href={URL.createObjectURL(formProps.values.npa_file_upload)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    disabled={
                                      formProps.values
                                        .project_zoning_file_upload !== 1
                                    }
                                  >
                                    View File
                                  </Button>
                                )} */}
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  select
                                  id="is_underconstruction"
                                  size="small"
                                  name="is_underconstruction"
                                  label="Is Project Under Construction"
                                  variant="outlined"
                                  value={formProps.values.is_underconstruction}
                                  onChange={formProps.handleChange}
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value={1}>Yes</MenuItem>
                                  <MenuItem value={0}>No</MenuItem>
                                </TextField>
                              </Col>

                              <Col md={8} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="-ve Information of Locality"
                                  id="negative_info_locality"
                                  name="negative_info_locality"
                                  value={
                                    formProps.values.negative_info_locality
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              {/* <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Age of building"
                                  id="building_age"
                                  name="building_age"
                                  value={formProps.values.building_age}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  // hidden
                                  variant="outlined"
                                  size="small"
                                  label="Residual age of property"
                                  id="residual_age"
                                  name="residual_age"
                                  value={formProps.values.residual_age}
                                  onChange={formProps.handleChange}
                                />
                              </Col> */}
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Permissible Plot Area"
                                  id="permissible_plot_area"
                                  name="permissible_plot_area"
                                  value={formProps.values.permissible_plot_area}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Permissible FSI"
                                  id="permissible_FSI"
                                  name="permissible_FSI"
                                  value={formProps.values.permissible_FSI}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Consumed FSI"
                                  id="consumed_FSI"
                                  name="consumed_FSI"
                                  value={formProps.values.consumed_FSI}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Number of Tower"
                                  id="no_towers"
                                  name="no_towers"
                                  value={formProps.values.no_towers}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Number of Wings"
                                  id="wings_NO"
                                  name="wings_NO"
                                  value={formProps.values.wings_NO}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Approved FAR"
                                  id="approved_flar"
                                  name="approved_flar"
                                  value={formProps.values.approved_flar}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Carpet Area"
                                  id="carpet_area"
                                  name="carpet_area"
                                  value={formProps.values.carpet_area}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Approval Levels"
                                  id="approval_levels"
                                  name="approval_levels"
                                  value={formProps.values.approval_levels}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              {/* Continue adding the remaining fields using the same pattern */}
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Approved Land Use"
                                  id="approved_land_use"
                                  name="approved_land_use"
                                  value={formProps.values.approved_land_use}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Shop Numbers"
                      id="shop_nos"
                      name="shop_nos"
                      value={formProps.values.shop_nos}
                      onChange={formProps.handleChange}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Flat Carpet Area"
                      id="flat_carpet_area"
                      name="flat_carpet_area"
                      value={formProps.values.flat_carpet_area}
                      onChange={formProps.handleChange}
                    />
                  </Col> */}

                              <Col md={4} className="pb-4 ">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Construction Type"
                                  id="construction_type"
                                  name="construction_type"
                                  value={formProps.values.construction_type}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Construction Quality"
                                  id="construction_quality"
                                  name="construction_quality"
                                  value={formProps.values.construction_quality}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="view_of_project"
                                  name="view_of_project"
                                  label="View of Project"
                                  variant="outlined"
                                  value={formProps.values.view_of_project}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="project_finance_by"
                                  name="project_finance_by"
                                  label="Project Finance By"
                                  variant="outlined"
                                  value={formProps.values.project_finance_by}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={12}>
                                <FieldArray
                                  name="no_of_floors_approved"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={4}>
                                          <Label>No. Of Floor Approved</Label>
                                        </Col>
                                        <Col md={6}></Col>

                                        <Col md={2}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              arrayHelpers.push({
                                                id: formProps?.values
                                                  ?.no_of_floors_approved
                                                  .length,
                                                no_of_tower:
                                                  formProps.values.no_of_tower,
                                                as_per_plan:
                                                  formProps.values.as_per_plan,
                                                as_per_rera:
                                                  formProps.values.as_per_rera,
                                                as_per_site:
                                                  formProps.values.as_per_site,
                                              });
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>No of Tower</th>
                                            <th>As per Plan</th>
                                            <th>As Per Rera</th>
                                            <th>As per Site</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.no_of_floors_approved?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="No of Tower"
                                                      variant="outlined"
                                                      name={`no_of_floors_approved.${index}.no_of_tower`}
                                                      value={area.no_of_tower}
                                                      id="no_of_tower"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="As per Plan"
                                                      variant="outlined"
                                                      name={`no_of_floors_approved.${index}.as_per_plan`}
                                                      value={area.as_per_plan}
                                                      id="as_per_plan"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="As per Site"
                                                      variant="outlined"
                                                      name={`no_of_floors_approved.${index}.as_per_rera`}
                                                      value={area.as_per_rera}
                                                      id="as_per_rera"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="As per Site"
                                                      variant="outlined"
                                                      name={`no_of_floors_approved.${index}.as_per_site`}
                                                      value={area.as_per_site}
                                                      id="as_per_site"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                              <Col md={12}>
                                <FieldArray
                                  name="no_of_apartments_approved"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={4}>
                                          <Label>
                                            Total No. Of Apartments Approved
                                          </Label>
                                        </Col>
                                        <Col md={6}></Col>

                                        <Col md={2}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              arrayHelpers.push({
                                                id: formProps?.values
                                                  ?.no_of_apartments_approved
                                                  .length,
                                                no_of_tower:
                                                  formProps.values.no_of_tower,
                                                as_per_plan:
                                                  formProps.values.as_per_plan,
                                                as_per_rera:
                                                  formProps.values.as_per_rera,
                                                as_per_site:
                                                  formProps.values.as_per_site,
                                              });
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>No of Tower</th>
                                            <th>As per Plan</th>
                                            <th>As Per Rera</th>
                                            <th>As per Site</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.no_of_apartments_approved?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="No of Tower"
                                                      variant="outlined"
                                                      name={`no_of_apartments_approved.${index}.no_of_tower`}
                                                      value={area.no_of_tower}
                                                      id="no_of_tower"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="As per Plan"
                                                      variant="outlined"
                                                      name={`no_of_apartments_approved.${index}.as_per_plan`}
                                                      value={area.as_per_plan}
                                                      id="as_per_plan"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="As per Site"
                                                      variant="outlined"
                                                      name={`no_of_apartments_approved.${index}.as_per_rera`}
                                                      value={area.as_per_rera}
                                                      id="as_per_rera"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="As per Site"
                                                      variant="outlined"
                                                      name={`no_of_apartments_approved.${index}.as_per_site`}
                                                      value={area.as_per_site}
                                                      id="as_per_site"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>

                              {/* <Col md={8} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Is the property is any negative list/ unauthorised layout as per authorities (if any)"
                                  id="unauthorized_layout"
                                  name="unauthorized_layout"
                                  value={formProps.values.unauthorized_layout}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Associated Risk"
                                  id="associated_risk"
                                  name="associated_risk"
                                  value={formProps.values.associated_risk}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="client-bank-autocomplete"
                                  options={props.banks?.banks?.data || []}
                                  getOptionLabel={(bank) =>
                                    bank.bank_name || ""
                                  }
                                  value={
                                    props?.banks?.banks?.data?.find(
                                      (bank) =>
                                        bank.bank_name ===
                                        formProps.values.client_bank
                                    ) || null
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "client_bank",
                                      value?.bank_name || ""
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.client_bank &&
                                          formProps.errors.client_bank
                                      )}
                                      helperText={
                                        formProps.touched.client_bank &&
                                        formProps.errors.client_bank
                                      }
                                      label="Client Bank"
                                      name="client_bank"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col> */}
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    <Col md={12} className="mt-4">
                      <Accordion
                        expanded={expanded === "builder_details"}
                        onChange={handleExpand("builder_details")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>
                            Builder | Architect | Rera Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Builder Details</Label>
                            <Row>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Developer / Builder name"
                                  id="builder_name"
                                  name="builder_name"
                                  value={formProps.values.builder_name}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={8} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Developer / Builder address"
                                  id="builder_address"
                                  name="builder_address"
                                  value={formProps.values.builder_address}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="developer / Builder contact"
                                  id="builder_contact"
                                  name="builder_contact"
                                  value={formProps.values.builder_contact}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={8} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="permit_details"
                                  name="permit_details"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) =>
                                        field?.name ===
                                        "Category of Developer / Builders"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(event, value) => {
                                    formProps.handleChange({
                                      target: {
                                        name: "permit_details",
                                        value: value ? value.name : "",
                                      },
                                    });
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Category of Developer / Builders"
                                      variant="outlined"
                                      size="small"
                                      error={
                                        formProps.touched.permit_details &&
                                        Boolean(formProps.errors.permit_details)
                                      }
                                      helperText={
                                        formProps.touched.permit_details &&
                                        formProps.errors.permit_details
                                      }
                                    />
                                  )}
                                />
                              </Col>
                              {/* <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  select
                                  variant="outlined"
                                  size="small"
                                  label="Negative Information about Builder"
                                  id="negative_info"
                                  name="negative_info"
                                  value={formProps.values.negative_info}
                                  onChange={formProps.handleChange}
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value={1}>Yes</MenuItem>
                                  <MenuItem value={0}>No</MenuItem>
                                </TextField>
                              </Col> */}
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  id="negative_info_remark"
                                  name="negative_info_remark"
                                  label="Negative Information of Builder"
                                  value={formProps.values.negative_info_remark}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.negative_info_remark &&
                                    Boolean(
                                      formProps.errors.negative_info_remark
                                    )
                                  }
                                  helperText={
                                    formProps.touched.negative_info_remark &&
                                    formProps.errors.negative_info_remark
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                {/* <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="file"
                                  size="small"
                                  id="negative_info_file_upload"
                                  name="negative_info_file_upload"
                                  value={
                                    formProps.values.negative_info_file_upload
                                  }
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched
                                      .negative_info_file_upload &&
                                    Boolean(
                                      formProps.errors.negative_info_file_upload
                                    )
                                  }
                                  helperText={
                                    formProps.touched
                                      .negative_info_file_upload &&
                                    formProps.errors.negative_info_file_upload
                                  }
                                /> */}
                                <input
                                  type="file"
                                  name="negative_info_file_upload"
                                  onChange={handleFileChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                {files.negative_info_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    href={
                                      files.negative_info_file_upload.fileURL
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View File
                                  </Button>
                                )}
                                {/* {formProps.values.negative_info_file_upload && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    component="a"
                                    // href={URL.createObjectURL(formProps.values.negative_info_file_upload)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View File
                                  </Button>
                                )} */}
                              </Col>
                              {/* <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Previous projects"
                                  id="previous_project"
                                  name="previous_project"
                                  value={formProps.values.previous_project}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Architect"
                                  id="architect"
                                  name="architect"
                                  value={formProps.values.architect}
                                  onChange={formProps.handleChange}
                                />
                              </Col> */}
                              {/* <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  hidden={
                                    formProps.values.negative_info == 1
                                      ? false
                                      : true
                                  }
                                  size="small"
                                  id="negative_info_remark"
                                  name="negative_info_remark"
                                  label="Negative Info Project Remark about Builder"
                                  value={formProps.values.negative_info_remark}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.negative_info_remark &&
                                    Boolean(
                                      formProps.errors.negative_info_remark
                                    )
                                  }
                                  helperText={
                                    formProps.touched.negative_info_remark &&
                                    formProps.errors.negative_info_remark
                                  }
                                />
                              </Col> */}
                              <Col md={12}>
                                <FieldArray
                                  name="details_of_builders"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={4}>
                                          <Label>
                                            Details of Previous Project of
                                            Builder
                                          </Label>
                                        </Col>
                                        <Col md={6}></Col>
                                        <Col md={2}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              if (
                                                formProps?.values
                                                  ?.details_of_builders
                                                  .length == 0
                                              ) {
                                                arrayHelpers.push({
                                                  id: formProps?.values
                                                    ?.details_of_builders
                                                    .length,
                                                  project_name:
                                                    formProps.values
                                                      .project_name,
                                                  area_developer:
                                                    formProps.values
                                                      .area_developer,
                                                  location:
                                                    formProps.values.location,
                                                  current_stage:
                                                    formProps.values
                                                      .current_stage,
                                                });
                                              }
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Project Name</th>
                                            <th>Area Developer</th>
                                            <th>Location</th>
                                            <th>Current Stage</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.details_of_builders?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Project Name"
                                                      variant="outlined"
                                                      name={`details_of_builders.${index}.project_name`}
                                                      value={area.project_name}
                                                      id="project_name"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Area Developer"
                                                      variant="outlined"
                                                      name={`details_of_builders.${index}.area_developer`}
                                                      value={
                                                        area.area_developer
                                                      }
                                                      id="area_developer"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Location"
                                                      variant="outlined"
                                                      name={`details_of_builders.${index}.location`}
                                                      value={area.location}
                                                      id="location"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Current Stage"
                                                      variant="outlined"
                                                      name={`details_of_builders.${index}.current_stage`}
                                                      value={area.current_stage}
                                                      id="current_stage"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                              <Col md={12}>
                                <FieldArray
                                  name="developer_track_record"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={4}>
                                          <Label>Developer Track Record</Label>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Fields</th>
                                            <th>Entry</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Litigations</td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Litigations"
                                                variant="outlined"
                                                name={`developer_track_record.0.litigations`}
                                                value={
                                                  formProps.values
                                                    .developer_track_record[0]
                                                    ?.litigations || ""
                                                }
                                                id="litigations_0"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Project Delays</td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Project Delays"
                                                variant="outlined"
                                                name={`developer_track_record.0.project_delays`}
                                                value={
                                                  formProps.values
                                                    .developer_track_record[0]
                                                    ?.project_delays || ""
                                                }
                                                id="project_delays_0"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Developer Background</td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Developer Background"
                                                variant="outlined"
                                                name={`developer_track_record.0.developer_background`}
                                                value={
                                                  formProps.values
                                                    .developer_track_record[0]
                                                    ?.developer_background || ""
                                                }
                                                id="developer_background_0"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Brokers Feedback</td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Brokers Feedback"
                                                variant="outlined"
                                                name={`developer_track_record.0.brokers_feedbacks`}
                                                value={
                                                  formProps.values
                                                    .developer_track_record[0]
                                                    ?.brokers_feedbacks || ""
                                                }
                                                id="brokers_feedbacks_0"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>Customers Feedback</td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Customers Feedback"
                                                variant="outlined"
                                                name={`developer_track_record.0.customers_feedback`}
                                                value={
                                                  formProps.values
                                                    .developer_track_record[0]
                                                    ?.customers_feedback || ""
                                                }
                                                id="customers_feedback_0"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Architect Name"
                                  id="architect_name"
                                  name="architect_name"
                                  value={formProps.values.architect_name}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={8} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Architect Office Address"
                                  id="architect_office_address"
                                  name="architect_office_address"
                                  value={
                                    formProps.values.architect_office_address
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Architect Contact No"
                                  type="number"
                                  id="architect_contact_no"
                                  name="architect_contact_no"
                                  value={formProps.values.architect_contact_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={8} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Architect License Number"
                                  id="architect_license_no"
                                  name="architect_license_no"
                                  value={formProps.values.architect_license_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="rera_no"
                                  name="rera_no"
                                  label="RERA No"
                                  value={formProps.values.rera_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.rera_no &&
                                    Boolean(formProps.errors.rera_no)
                                  }
                                  helperText={
                                    formProps.touched.rera_no &&
                                    formProps.errors.rera_no
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="RERA Project Name"
                                  id="rera_project_name"
                                  name="rera_project_name"
                                  value={formProps.values.rera_project_name}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="RERA Certificate No"
                                  id="rera_certificate_no"
                                  name="rera_certificate_no"
                                  value={formProps.values.rera_certificate_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="date"
                                  size="small"
                                  label="Rera Commencement date"
                                  id="commencement_date"
                                  name="commencement_date"
                                  value={formProps.values.commencement_date}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.commencement_date &&
                                    Boolean(formProps.errors.commencement_date)
                                  }
                                  helperText={
                                    formProps.touched.commencement_date &&
                                    formProps.errors.commencement_date
                                  }
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="date"
                                  size="small"
                                  label="RERA End date"
                                  id="end_date"
                                  name="end_date"
                                  value={formProps.values.end_date}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.end_date &&
                                    Boolean(formProps.errors.end_date)
                                  }
                                  helperText={
                                    formProps.touched.end_date &&
                                    formProps.errors.end_date
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="date"
                                  size="small"
                                  label="Revised end date"
                                  id="revised_end_date"
                                  name="revised_end_date"
                                  value={formProps.values.revised_end_date}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.revised_end_date &&
                                    Boolean(formProps.errors.revised_end_date)
                                  }
                                  helperText={
                                    formProps.touched.revised_end_date &&
                                    formProps.errors.revised_end_date
                                  }
                                />
                              </Col>

                              <Col md={12}>
                                <FieldArray
                                  name="rera_bank"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={4}>
                                          <Label>
                                            Details of RERA designated saperate
                                            Bank Account
                                          </Label>
                                        </Col>
                                        <Col md={6}></Col>
                                        <Col md={2}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() =>
                                              arrayHelpers.push({
                                                bank_name: "",
                                                bank_branch: "",
                                                ifsc_code: "",
                                                account_no: "",
                                              })
                                            }
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Bank Name</th>
                                            <th>Bank Branch</th>
                                            <th>IFSC Code</th>
                                            <th>Account No</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps.values.rera_bank.map(
                                            (bank, index) => (
                                              <tr key={index}>
                                                <td>
                                                  <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Bank Name"
                                                    variant="outlined"
                                                    name={`rera_bank.${index}.bank_name`}
                                                    value={bank.bank_name}
                                                    onChange={
                                                      formProps.handleChange
                                                    }
                                                  />
                                                </td>
                                                <td>
                                                  <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Bank Branch"
                                                    variant="outlined"
                                                    name={`rera_bank.${index}.bank_branch`}
                                                    value={bank.bank_branch}
                                                    onChange={
                                                      formProps.handleChange
                                                    }
                                                  />
                                                </td>
                                                <td>
                                                  <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="IFSC Code"
                                                    variant="outlined"
                                                    name={`rera_bank.${index}.ifsc_code`}
                                                    value={bank.ifsc_code}
                                                    onChange={
                                                      formProps.handleChange
                                                    }
                                                  />
                                                </td>
                                                <td>
                                                  <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Account No"
                                                    variant="outlined"
                                                    name={`rera_bank.${index}.account_no`}
                                                    value={bank.account_no}
                                                    onChange={
                                                      formProps.handleChange
                                                    }
                                                  />
                                                </td>
                                                <td>
                                                  <Button
                                                    color="error"
                                                    size="large"
                                                    variant="contained"
                                                    onClick={() =>
                                                      arrayHelpers.remove(index)
                                                    }
                                                  >
                                                    <DeleteIcon fontSize="inherit" />
                                                  </Button>
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    {/* <Col md="12" className="mt-4">
                      <Accordion
                        expanded={expanded === "Rera_Details"}
                        onChange={handleExpand("Rera_Details")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Rera Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="rera_no"
                                  name="rera_no"
                                  label="Rera No"
                                  
                                  value={formProps.values.rera_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.rera_no &&
                                    Boolean(formProps.errors.rera_no)
                                  }
                                  helperText={
                                    formProps.touched.rera_no &&
                                    formProps.errors.rera_no
                                  }
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  type="date"
                                  variant="outlined"
                                  size="small"
                                  label="Rera Certificate Date"
                                  id="rera_date"
                                  name="rera_date"
                                  value={formProps.values.rera_date}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="date"
                                  size="small"
                                  label="Rera Commencement date"
                                  id="commencement_date"
                                  name="commencement_date"
                                  value={formProps.values.commencement_date}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.commencement_date &&
                                    Boolean(formProps.errors.commencement_date)
                                  }
                                  helperText={
                                    formProps.touched.commencement_date &&
                                    formProps.errors.commencement_date
                                  }
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="date"
                                  size="small"
                                  label="Rera End date"
                                  id="end_date"
                                  name="end_date"
                                  value={formProps.values.end_date}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.end_date &&
                                    Boolean(formProps.errors.end_date)
                                  }
                                  helperText={
                                    formProps.touched.end_date &&
                                    formProps.errors.end_date
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  type="date"
                                  size="small"
                                  label="Revised end date"
                                  id="revised_end_date"
                                  name="revised_end_date"
                                  value={formProps.values.revised_end_date}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.revised_end_date &&
                                    Boolean(formProps.errors.revised_end_date)
                                  }
                                  helperText={
                                    formProps.touched.revised_end_date &&
                                    formProps.errors.revised_end_date
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="rera-bank-autocomplete"
                                  options={props.banks?.banks?.data || []}
                                  getOptionLabel={(bank) =>
                                    bank.bank_name || ""
                                  }
                                  value={
                                    props.banks?.banks?.data?.find(
                                      (bank) =>
                                        bank.bank_name ===
                                        formProps.values.rera_bank
                                    ) || null
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "rera_bank",
                                      value?.bank_name || ""
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.rera_bank &&
                                          formProps.errors.rera_bank
                                      )}
                                      helperText={
                                        formProps.touched.rera_bank &&
                                        formProps.errors.rera_bank
                                      }
                                      label="Rera Bank"
                                      name="rera_bank"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col> */}
                    <Col md={12} className="mt-4">
                      <Accordion
                        expanded={expanded === "Boundries"}
                        onChange={handleExpand("Boundries")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Boundaries Details</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Typography>
                            <Col md={12}>
                              <FieldArray
                                name="project_boundries"
                                render={() => (
                                  <div>
                                    <Row>
                                      <Col md={4}>
                                        <Label>Project Boundaries</Label>
                                      </Col>
                                    </Row>
                                    <Table size="sm" className="mt-3">
                                      <thead>
                                        <tr>
                                          <th>Direction</th>
                                          <th>As per RERA Document</th>
                                          <th>As per Site</th>
                                          <th>As per Plan</th>
                                          <th>As per Ownership Document</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {["north", "south", "west", "east"].map(
                                          (direction, index) => (
                                            <tr key={index}>
                                              <td>
                                                <Label>
                                                  {direction
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    direction.slice(1)}
                                                </Label>
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="As per RERA Document"
                                                  variant="outlined"
                                                  name={`project_boundries.${index}.as_per_rera_document`}
                                                  value={
                                                    formProps.values
                                                      .project_boundries[index]
                                                      ?.as_per_rera_document ||
                                                    ""
                                                  }
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="As per Site"
                                                  variant="outlined"
                                                  name={`project_boundries.${index}.as_per_site`}
                                                  value={
                                                    formProps.values
                                                      .project_boundries[index]
                                                      ?.as_per_site || ""
                                                  }
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="As per Plan"
                                                  variant="outlined"
                                                  name={`project_boundries.${index}.as_per_plan`}
                                                  value={
                                                    formProps.values
                                                      .project_boundries[index]
                                                      ?.as_per_plan || ""
                                                  }
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="As per Ownership Document"
                                                  variant="outlined"
                                                  name={`project_boundries.${index}.as_per_ownership_document`}
                                                  value={
                                                    formProps.values
                                                      .project_boundries[index]
                                                      ?.as_per_ownership_document ||
                                                    ""
                                                  }
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                )}
                              />
                            </Col>
                            <Col md={12}>
                              <Autocomplete
                                fullWidth
                                id="is_project_boundries_matching-autocomplete"
                                options={
                                  props?.dropdowns?.dropdowns?.filter(
                                    (field) =>
                                      field?.name ===
                                      "Is Project Boundries Matching"
                                  )[0]?.drop_down_details || []
                                }
                                getOptionLabel={(option) => option?.name || ""}
                                onChange={(e, value) => {
                                  formProps.setFieldValue(
                                    "is_project_boundries_matching",
                                    value?.name || ""
                                  );
                                }}
                                onOpen={formProps.handleBlur}
                                includeInputInList
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      formProps.touched
                                        .is_project_boundries_matching &&
                                        formProps.errors
                                          .is_project_boundries_matching
                                    )}
                                    helperText={
                                      formProps.touched
                                        .is_project_boundries_matching &&
                                      formProps.errors
                                        .is_project_boundries_matching
                                    }
                                    label="Is Project Boundries Matching"
                                    name="is_project_boundries_matching"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Col>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    <Col md="12" className="mt-4">
                      <Accordion
                        expanded={expanded === "Approving_authority"}
                        onChange={handleExpand("Approving_authority")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Approving Authority</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {/* <Label>Rera Details</Label> */}
                            <Row>
                              <Col md={12}>
                                <Grid item md={12}>
                                  <div>
                                    <h3 style={styles.header}>
                                      Approving Authority
                                    </h3>
                                    <div style={styles.dropdownField}>
                                      <TextField
                                        value={selectedAuthorities.join(", ")}
                                        placeholder="Approving Authority"
                                        variant="outlined"
                                        fullWidth
                                        readOnly
                                        onClick={toggleDropdown}
                                      />
                                      {isOpen && (
                                        <div style={styles.optionsContainer}>
                                          {props?.dropdowns?.dropdowns
                                            ?.filter(
                                              (field) =>
                                                field?.name ===
                                                "approving_authority"
                                            )[0]
                                            ?.drop_down_details?.map(
                                              (authority) => (
                                                <FormControlLabel
                                                  key={authority?.name}
                                                  control={
                                                    <Checkbox
                                                      checked={selectedAuthorities?.includes(
                                                        authority?.name
                                                      )}
                                                      onChange={() =>
                                                        handleChange3(
                                                          authority?.name
                                                        )
                                                      }
                                                    />
                                                  }
                                                  label={authority?.name}
                                                />
                                              )
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Grid>
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                    <Col md="12" className="mt-4">
                      <Accordion
                        expanded={expanded === "Amenities"}
                        onChange={handleExpand("Amenities")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Project Amenities</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              <Col md={12}>
                                <Grid item md={12}>
                                  <div>
                                    <h3 style={styles.header}>
                                      Project Amenities
                                    </h3>
                                    <div style={styles.dropdownField}>
                                      <TextField
                                        value={selectedAuthorities2.join(", ")}
                                        placeholder="Project Amenities"
                                        variant="outlined"
                                        fullWidth
                                        readOnly
                                        onClick={toggleDropdown}
                                      />
                                      {isOpen && (
                                        <div style={styles.optionsContainer}>
                                          {props?.dropdowns?.dropdowns
                                            ?.filter(
                                              (field) =>
                                                field?.name == "amenities"
                                            )[0]
                                            ?.drop_down_details?.map(
                                              (authority) => (
                                                <FormControlLabel
                                                  key={authority?.name}
                                                  control={
                                                    <Checkbox
                                                      checked={selectedAuthorities2?.includes(
                                                        authority?.name
                                                      )}
                                                      onChange={() =>
                                                        handleChange4(
                                                          authority?.name
                                                        )
                                                      }
                                                    />
                                                  }
                                                  label={authority?.name}
                                                />
                                              )
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Grid>
                              </Col>
                              {/* <Col md={6}>
                                <div>
                                  <FormControl sx={{ m: 1, width: 1053 }}>
                                    <InputLabel id="demo-multiple-checkbox-label">
                                      Project Amenities
                                    </InputLabel>
                                    <Select
                                      labelId="demo-multiple-checkbox-label"
                                      id="demo-multiple-checkbox"
                                      multiple
                                      value={personName}
                                      onChange={handleChange}
                                      input={<OutlinedInput label="Tag" />}
                                      renderValue={(selected) =>
                                        selected.join(", ")
                                      }
                                      MenuProps={MenuProps}
                                    >
                                      {props?.dropdowns?.dropdowns
                                        ?.filter(
                                          (field) => field?.name == "amenities"
                                        )[0]
                                        ?.drop_down_details?.map((field) => (
                                          <MenuItem
                                            key={field?.name}
                                            value={field?.name}
                                          >
                                            <Checkbox
                                              checked={
                                                personName.indexOf(
                                                  field?.name
                                                ) > -1
                                              }
                                            />
                                            <ListItemText
                                              primary={field?.name}
                                            />
                                          </MenuItem>
                                        ))}
                                    </Select>
                                  </FormControl>
                                </div>
                              </Col> */}
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4} className="pb-4">
                      <TextField
                        hidden
                        fullWidth
                        size="small"
                        variant="outlined"
                        id="corp_limit"
                        name="corp_limit"
                        label="Corporation limit"
                        value={formProps.values.corp_limit}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        hidden
                        variant="outlined"
                        size="small"
                        label="Municipal limit"
                        id="municipal_limit"
                        name="municipal_limit"
                        value={formProps.values.municipal_limit}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        hidden
                        variant="outlined"
                        size="small"
                        label="TPVD"
                        id="tpvd"
                        name="tpvd"
                        value={formProps.values.tpvd}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Commercial property"
                      id="commercial_property"
                      name="commercial_property"
                      value={formProps.values.commercial_property}
                      onChange={formProps.handleChange}
                    />
                  </Col> */}

                    {/* <Col md={4} className="pb-4"></Col> */}

                    {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      hidden
                      id="commercial_net_yield"
                      name="commercial_net_yield"
                      label="Commercial Net Yield"
                      variant="outlined"
                      size="small"
                      value={formProps.values.commercial_net_yield}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      hidden
                      id="commercial_gross_yield"
                      name="commercial_gross_yield"
                      label="Commercial Gross Yield"
                      variant="outlined"
                      size="small"
                      value={formProps.values.commercial_gross_yield}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      hidden
                      id="residential_net_yield"
                      name="residential_net_yield"
                      label="Residential Net Yield"
                      variant="outlined"
                      size="small"
                      value={formProps.values.residential_net_yield}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      hidden
                      id="residential_gross_yieldcommercial_net_yield"
                      name="residential_gross_yieldcommercial_net_yield"
                      label="Residential Gross Yield"
                      variant="outlined"
                      size="small"
                      value={
                        formProps.values
                          .residential_gross_yieldcommercial_net_yield
                      }
                      onChange={formProps.handleChange}
                    />
                  </Col> */}
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "ready_reckner"}
                        onChange={handleExpand("ready_reckner")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Ready Reckoner Detail</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              <Col md={12} className="pb-4">
                                <Autocomplete
                                  size="small"
                                  id="ready_reckner_id"
                                  options={props.readyReckners?.readyReckners}
                                  getOptionLabel={(field) =>
                                    `${field?.village_name},${field?.area_type},${field?.local_body_type},${field?.local_body_name},${field?.landmark},${field?.zone},${field?.subzone},${field?.land},${field?.residential},${field?.office},${field?.shop},${field?.industrial},${field?.cs_no},${field?.tps_no}`
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "ready_reckner_id",
                                      value?.id || ""
                                    );
                                    formProps.setFieldValue(
                                      "village_name",
                                      value?.village_name || ""
                                    );
                                    formProps.setFieldValue(
                                      "area_type",
                                      value?.area_type || ""
                                    );
                                    formProps.setFieldValue(
                                      "local_body_type",
                                      value?.local_body_type || ""
                                    );
                                    formProps.setFieldValue(
                                      "local_body_name",
                                      value?.local_body_name || ""
                                    );
                                    formProps.setFieldValue(
                                      "landmark",
                                      value?.landmark || ""
                                    );
                                    formProps.setFieldValue(
                                      "zone",
                                      value?.zone || ""
                                    );
                                    formProps.setFieldValue(
                                      "subzone",
                                      value?.subzone || ""
                                    );
                                    formProps.setFieldValue(
                                      "land",
                                      value?.land || ""
                                    );
                                    formProps.setFieldValue(
                                      "residential",
                                      value?.residential || ""
                                    );
                                    formProps.setFieldValue(
                                      "office",
                                      value?.office || ""
                                    );
                                    formProps.setFieldValue(
                                      "shop",
                                      value?.shop || ""
                                    );
                                    formProps.setFieldValue(
                                      "industrial",
                                      value?.industrial || ""
                                    );
                                    formProps.setFieldValue(
                                      "cs_no",
                                      value?.cs_no || ""
                                    );
                                    formProps.setFieldValue(
                                      "tps_no",
                                      value?.tps_no || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.ready_reckner_id &&
                                          formProps.errors.ready_reckner_id
                                      )}
                                      fullWidth
                                      helperText={
                                        formProps.touched.ready_reckner_id &&
                                        formProps.errors.ready_reckner_id
                                      }
                                      label="Ready Reckoner Master"
                                      name="ready_reckner_id"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="village_name"
                                  name="village_name"
                                  label="Village Name"
                                  value={formProps.values.village_name}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.village_name &&
                                    Boolean(formProps.errors.village_name)
                                  }
                                  helperText={
                                    formProps.touched.village_name &&
                                    formProps.errors.village_name
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="area_type"
                                  name="area_type"
                                  label="Area Type"
                                  value={formProps.values.area_type}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.area_type &&
                                    Boolean(formProps.errors.area_type)
                                  }
                                  helperText={
                                    formProps.touched.area_type &&
                                    formProps.errors.area_type
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="local_body_type"
                                  name="local_body_type"
                                  label="Local Body Type"
                                  value={formProps.values.local_body_type}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.local_body_type &&
                                    Boolean(formProps.errors.local_body_type)
                                  }
                                  helperText={
                                    formProps.touched.local_body_type &&
                                    formProps.errors.local_body_type
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="local_body_name"
                                  name="local_body_name"
                                  label="Local Body Name"
                                  value={formProps.values.local_body_name}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.local_body_name &&
                                    Boolean(formProps.errors.local_body_name)
                                  }
                                  helperText={
                                    formProps.touched.local_body_name &&
                                    formProps.errors.local_body_name
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="landmark"
                                  name="landmark"
                                  label="Landmark"
                                  value={formProps.values.landmark}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.landmark &&
                                    Boolean(formProps.errors.landmark)
                                  }
                                  helperText={
                                    formProps.touched.landmark &&
                                    formProps.errors.landmark
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="zone"
                                  name="zone"
                                  label="Zone"
                                  value={formProps.values.zone}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.zone &&
                                    Boolean(formProps.errors.zone)
                                  }
                                  helperText={
                                    formProps.touched.zone &&
                                    formProps.errors.zone
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="subzone"
                                  name="subzone"
                                  label="Subzone"
                                  value={formProps.values.subzone}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.subzone &&
                                    Boolean(formProps.errors.subzone)
                                  }
                                  helperText={
                                    formProps.touched.subzone &&
                                    formProps.errors.subzone
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="land"
                                  name="land"
                                  label="Land"
                                  value={formProps.values.land}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.land &&
                                    Boolean(formProps.errors.land)
                                  }
                                  helperText={
                                    formProps.touched.land &&
                                    formProps.errors.land
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="residential"
                                  name="residential"
                                  label="Residential Rate"
                                  value={formProps.values.residential}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.residential &&
                                    Boolean(formProps.errors.residential)
                                  }
                                  helperText={
                                    formProps.touched.residential &&
                                    formProps.errors.residential
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="office"
                                  name="office"
                                  label="Office Rate"
                                  value={formProps.values.office}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.office &&
                                    Boolean(formProps.errors.office)
                                  }
                                  helperText={
                                    formProps.touched.office &&
                                    formProps.errors.office
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="shop"
                                  name="shop"
                                  label="Shop Rate"
                                  value={formProps.values.shop}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.shop &&
                                    Boolean(formProps.errors.shop)
                                  }
                                  helperText={
                                    formProps.touched.shop &&
                                    formProps.errors.shop
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="industrial"
                                  name="industrial"
                                  label="Industrial Rate"
                                  value={formProps.values.industrial}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.industrial &&
                                    Boolean(formProps.errors.industrial)
                                  }
                                  helperText={
                                    formProps.touched.industrial &&
                                    formProps.errors.industrial
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="cs_no"
                                  name="cs_no"
                                  label="CS No"
                                  value={formProps.values.cs_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.cs_no &&
                                    Boolean(formProps.errors.cs_no)
                                  }
                                  helperText={
                                    formProps.touched.cs_no &&
                                    formProps.errors.cs_no
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  variant="outlined"
                                  id="tps_no"
                                  name="tps_no"
                                  label="TPS No"
                                  value={formProps.values.tps_no}
                                  onChange={formProps.handleChange}
                                  error={
                                    formProps.touched.tps_no &&
                                    Boolean(formProps.errors.tps_no)
                                  }
                                  helperText={
                                    formProps.touched.tps_no &&
                                    formProps.errors.tps_no
                                  }
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  id="cts_no"
                                  name="cts_no"
                                  label="CTS No"
                                  variant="outlined"
                                  size="small"
                                  value={formProps.values.cts_no}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "project_tower_details"}
                        onChange={handleExpand("project_tower_details")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>
                            Project Tower | Construction Stage Details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              <Col md={12}>
                                <FieldArray
                                  name="project_tower_details"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row className="mb-3">
                                        <Col md={10}>
                                          <Label>Project Tower Details</Label>
                                        </Col>
                                        <Col md={2} className="mb-2">
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() =>
                                              arrayHelpers.push({
                                                current_date:
                                                  moment().format("YYYY-MM-DD"),
                                                stage_of_construction: "",
                                                tower_name: "",
                                                wings: "",
                                                no_of_flats: "",
                                                no_of_lift: "",
                                                cc_date: "",
                                                completion_date: "",
                                                progress_percentage: "",
                                                recommendation_percentage: "",
                                                stage_review_date: "",
                                              })
                                            }
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      {formProps.values.project_tower_details.map(
                                        (detail, index) => (
                                          <Row key={index} className="mb-3">
                                            <Col md={4} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                type="date"
                                                label="Current Date"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.current_date`}
                                                value={detail.current_date}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                              />
                                            </Col>
                                            <Col md={8} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Stage of Construction"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.stage_of_construction`}
                                                value={
                                                  detail.stage_of_construction
                                                }
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={3} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Tower Name"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.tower_name`}
                                                value={detail.tower_name}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={3} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Wings"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.wings`}
                                                value={detail.wings}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={2} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="No of Flats"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.no_of_flats`}
                                                value={detail.no_of_flats}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={2} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="No of Lift"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.no_of_lift`}
                                                value={detail.no_of_lift}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={2} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                type="date"
                                                label="CC Date"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.cc_date`}
                                                value={detail.cc_date}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                              />
                                            </Col>
                                            <Col md={3} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                type="date"
                                                label="Completion Date"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.completion_date`}
                                                value={detail.completion_date}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                              />
                                            </Col>
                                            <Col md={3} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Progress%"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.progress_percentage`}
                                                value={
                                                  detail.progress_percentage
                                                }
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={2} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Recommendation%"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.recommendation_percentage`}
                                                value={
                                                  detail.recommendation_percentage
                                                }
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </Col>
                                            <Col md={2} className="mb-2">
                                              <TextField
                                                fullWidth
                                                size="small"
                                                type="date"
                                                label="Stage Review Date"
                                                variant="outlined"
                                                name={`project_tower_details.${index}.stage_review_date`}
                                                value={detail.stage_review_date}
                                                onChange={
                                                  formProps.handleChange
                                                }
                                                InputLabelProps={{
                                                  shrink: true,
                                                }}
                                              />
                                            </Col>
                                            <Col
                                              md={2}
                                              className="d-flex align-items-end mb-2"
                                            >
                                              <Button
                                                color="error"
                                                size="large"
                                                variant="contained"
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }
                                              >
                                                <DeleteIcon fontSize="inherit" />
                                              </Button>
                                            </Col>
                                          </Row>
                                        )
                                      )}
                                    </div>
                                  )}
                                />
                              </Col>

                              {/* <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="structure-type-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) =>
                                        field?.name === "Type of Structure"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  // value={formProps.values.structure_type}
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "structure_type",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.structure_type &&
                                          formProps.errors.structure_type
                                      )}
                                      helperText={
                                        formProps.touched.structure_type &&
                                        formProps.errors.structure_type
                                      }
                                      label="Type of structure"
                                      name="structure_type"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col> */}
                            </Row>
                            <Row className="mb-3">
                              <Col md={12}>
                                <Label>Overall Project</Label>
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="actual_stage"
                                  name="actual_stage"
                                  label="Actual Stage %"
                                  variant="outlined"
                                  value={formProps.values.actual_stage}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="recommendation_stage"
                                  name="recommendation_stage"
                                  label="Recommendation Stage %"
                                  variant="outlined"
                                  value={formProps.values.recommendation_stage}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "project_flat_details"}
                        onChange={handleExpand("project_flat_details")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>
                            Unit / Tower wise configuration details
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Col md={12}>
                              <FieldArray
                                name="project_flat_details"
                                render={(arrayHelpers) => (
                                  <div>
                                    <Row className="mb-3">
                                      <Col md={10}>
                                        <Label>Project Flat Details</Label>
                                      </Col>
                                      <Col md={2} className="mb-2">
                                        <Button
                                          color="success"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.push({
                                              tower_name: "",
                                              wings: "",
                                              configuration: "",
                                              rera_carpet: "",
                                              actual_carpet: "",
                                              saleable_area: "",
                                              parking_area: "",
                                              floor_rise: "",
                                              base_rate: "",
                                              value: "",
                                              type_of_structure: "",
                                              remark: "",
                                              current_date:
                                                moment().format("YYYY-MM-DD"),
                                              vicinity_rate_range: "",
                                              flat_rate_range: "",
                                              recommended_rate: "",
                                              total_no_of_unit_in_tower: "",
                                              sold_unit_in_tower: "",
                                              unsold_unit_in_tower: "",
                                            })
                                          }
                                          size="large"
                                        >
                                          <AddIcon fontSize="inherit" />
                                        </Button>
                                      </Col>
                                    </Row>
                                    {formProps.values.project_flat_details.map(
                                      (detail, index) => (
                                        <Row key={index} className="mb-3">
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Tower Name"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.tower_name`}
                                              value={detail.tower_name}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Wings"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.wings`}
                                              value={detail.wings}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Configuration"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.configuration`}
                                              value={detail.configuration}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="RERA Carpet"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.rera_carpet`}
                                              value={detail.rera_carpet}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Actual Carpet"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.actual_carpet`}
                                              value={detail.actual_carpet}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Saleable Area"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.saleable_area`}
                                              value={detail.saleable_area}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Parking Area"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.parking_area`}
                                              value={detail.parking_area}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Floor Rise"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.floor_rise`}
                                              value={detail.floor_rise}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Base Rate"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.base_rate`}
                                              value={detail.base_rate}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Value"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.value`}
                                              value={
                                                detail.rera_carpet *
                                                detail.base_rate
                                              }
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Type of Structure"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.type_of_structure`}
                                              value={detail.type_of_structure}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Remark"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.remark`}
                                              value={detail.remark}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              type="date"
                                              label="Current Date"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.current_date`}
                                              value={detail.current_date}
                                              onChange={formProps.handleChange}
                                              InputLabelProps={{ shrink: true }}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Vicinity Rate Range"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.vicinity_rate_range`}
                                              value={detail.vicinity_rate_range}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Flat Rate Range"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.flat_rate_range`}
                                              value={detail.flat_rate_range}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Recommended Rate"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.recommended_rate`}
                                              value={detail.recommended_rate}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Total No of Unit in Tower"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.total_no_of_unit_in_tower`}
                                              value={
                                                detail.total_no_of_unit_in_tower
                                              }
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Sold Unit in Tower"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.sold_unit_in_tower`}
                                              value={detail.sold_unit_in_tower}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3} className="mb-2">
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Unsold Unit in Tower"
                                              variant="outlined"
                                              name={`project_flat_details.${index}.unsold_unit_in_tower`}
                                              value={
                                                detail.unsold_unit_in_tower
                                              }
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col
                                            md={2}
                                            className="d-flex align-items-end"
                                          >
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="contained"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <DeleteIcon fontSize="inherit" />
                                            </Button>
                                          </Col>
                                        </Row>
                                      )
                                    )}
                                  </div>
                                )}
                              />
                            </Col>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "project_base_rate"}
                        onChange={handleExpand("project_base_rate")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Base Rate of the Project</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Col md={12}>
                              <FieldArray
                                name="project_base_rate"
                                render={() => (
                                  <div>
                                    <Row>
                                      <Col md={4}>
                                        <Label>Base Rate of the Project</Label>
                                      </Col>
                                    </Row>
                                    <Table size="sm" className="mt-3">
                                      <thead>
                                        <tr>
                                          <th>Property type</th>
                                          <th>configuration</th>
                                          <th>recommended rate on carpet</th>
                                          <th>maximum deviation</th>
                                          <th>range in vicinity</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {[
                                          "commercial shop",
                                          "residential flat",
                                          "commercial office",
                                        ].map((project_type, index) => (
                                          <tr key={index}>
                                            <td>
                                              <Label>
                                                {project_type
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  project_type.slice(1)}
                                              </Label>
                                            </td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                // label="Configuration"
                                                variant="outlined"
                                                name={`project_base_rate.${index}.configuration`}
                                                value={
                                                  formProps.values
                                                    .project_base_rate[index]
                                                    ?.configuration || ""
                                                }
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                // label="Recommended Rate on Carpet"
                                                variant="outlined"
                                                type="number"
                                                name={`project_base_rate.${index}.recommended_rate_on_carpet`}
                                                value={
                                                  formProps.values
                                                    .project_base_rate[index]
                                                    ?.recommended_rate_on_carpet ||
                                                  ""
                                                }
                                                onChange={(e) => {
                                                  formProps.handleChange(e);
                                                  const recommendedRate =
                                                    parseFloat(e.target.value);
                                                  const deviation = parseFloat(
                                                    formProps.values
                                                      .project_base_rate[index]
                                                      ?.maximum_deviation || 0
                                                  );
                                                  if (
                                                    !isNaN(recommendedRate) &&
                                                    !isNaN(deviation)
                                                  ) {
                                                    const minRange =
                                                      recommendedRate *
                                                      (1 - deviation / 100);
                                                    const maxRange =
                                                      recommendedRate *
                                                      (1 + deviation / 100);
                                                    formProps.setFieldValue(
                                                      `project_base_rate.${index}.range_in_vicinity`,
                                                      `${minRange.toFixed(
                                                        2
                                                      )} to ${maxRange.toFixed(
                                                        2
                                                      )}`
                                                    );
                                                  }
                                                }}
                                              />
                                            </td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                // label="Maximum Deviation"
                                                type="number"
                                                variant="outlined"
                                                name={`project_base_rate.${index}.maximum_deviation`}
                                                value={
                                                  formProps.values
                                                    .project_base_rate[index]
                                                    ?.maximum_deviation || ""
                                                }
                                                onChange={(e) => {
                                                  formProps.handleChange(e);
                                                  const deviation = parseFloat(
                                                    e.target.value
                                                  );
                                                  const recommendedRate =
                                                    parseFloat(
                                                      formProps.values
                                                        .project_base_rate[
                                                        index
                                                      ]
                                                        ?.recommended_rate_on_carpet ||
                                                        0
                                                    );
                                                  if (
                                                    !isNaN(recommendedRate) &&
                                                    !isNaN(deviation)
                                                  ) {
                                                    const minRange =
                                                      recommendedRate *
                                                      (1 - deviation / 100);
                                                    const maxRange =
                                                      recommendedRate *
                                                      (1 + deviation / 100);
                                                    formProps.setFieldValue(
                                                      `project_base_rate.${index}.range_in_vicinity`,
                                                      `${minRange.toFixed(
                                                        2
                                                      )} to ${maxRange.toFixed(
                                                        2
                                                      )}`
                                                    );
                                                  }
                                                }}
                                              />
                                            </td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                // label="Range in Vicinity"
                                                variant="outlined"
                                                name={`project_base_rate.${index}.range_in_vicinity`}
                                                value={
                                                  formProps.values
                                                    .project_base_rate[index]
                                                    ?.range_in_vicinity || ""
                                                }
                                                onChange={
                                                  formProps.handleChange
                                                }
                                                disabled
                                              />
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </div>
                                )}
                              />
                            </Col>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "comparable"}
                        onChange={handleExpand("comparable")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Project Comparable</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Col md={12}>
                              <TableCompatable
                                sendDataToParent={handleChildData}
                              />
                              <Row>
                                <Col md={8} style={{}}>
                                  Comparable for Subject Property
                                </Col>
                              </Row>
                              <div className="m-3">
                                <div id="htmlToPdf2" className={"f-14"}>
                                  <div className=" 1-page test text-center pdf-h-w">
                                    <div className="test d-flex">
                                      <div className="w-20 p-1 test-r m-0">
                                        Name of The building
                                      </div>
                                      <div className="w-20 p-1 test-r m-0">
                                        Configuration
                                      </div>
                                      <div className="w-20 p-1 test-r m-0">
                                        Carpet Area
                                      </div>
                                      <div className="w-20 p-1 test-r m-0">
                                        Rate/Sqft
                                      </div>
                                      <div className="w-20 p-1 test-r m-0">
                                        Value
                                      </div>
                                      <div className="w-20 p-1 test-r m-0">
                                        Status
                                      </div>
                                      <div className="w-20 p-1 test-r m-0">
                                        Distance KM
                                      </div>
                                    </div>

                                    {filteredObjects.map((row) => (
                                      <div className="test d-flex">
                                        <div className="w-20 p-1 test-r m-0 d-flex justify-content-center align-items-center">
                                          {row?.project_name}
                                        </div>
                                        <div className="w-20 test-r m-0">
                                          {row?.project_flat_details?.map(
                                            (row) => (
                                              <div className="w-100 p-1 test-b m-0">
                                                {row.config}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="w-20 test-r m-0">
                                          {row?.project_flat_details?.map(
                                            (row) => (
                                              <div className="w-100 p-1 test-b m-0">
                                                {row.area_carpet}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="w-20 test-r m-0">
                                          {row?.project_flat_details?.map(
                                            (row) => (
                                              <div className="w-100 p-1 test-b m-0">
                                                {row.base_rate}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="w-20 test-r m-0">
                                          {row?.project_flat_details?.map(
                                            (row) => (
                                              <div className="w-100 p-1 test-b m-0">
                                                {row.value}
                                              </div>
                                            )
                                          )}
                                        </div>
                                        <div className="w-20 test-r m-0"></div>
                                        <div className="w-20 test-r m-0"></div>
                                      </div>
                                    ))}

                                    <div className="test d-flex h-18vw">
                                      <div className="w-100 h-60 p-1 test-r m-0">
                                        <HeatMapRadius data={rows2} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "project_broker"}
                        onChange={handleExpand("project_broker")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>
                            Broker rate Inquiry for the project
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Col md={12}>
                              <FieldArray
                                name="project_broker"
                                render={(arrayHelpers) => (
                                  <div>
                                    <Row className="mb-3">
                                      <Col md={11}>
                                        <Label>Project Broker Details</Label>
                                      </Col>
                                      <Col md={1} className="mb-2">
                                        <Button
                                          color="success"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.push({
                                              broker_name: "",
                                              contact_no: "",
                                              broker_address: "",
                                              inquary_details: "",
                                            })
                                          }
                                          size="large"
                                        >
                                          <AddIcon fontSize="inherit" />
                                        </Button>
                                      </Col>
                                    </Row>
                                    {formProps.values.project_broker.map(
                                      (broker, index) => (
                                        <Row key={index} className="mb-3">
                                          <Col md={4}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Broker Name"
                                              variant="outlined"
                                              name={`project_broker.${index}.broker_name`}
                                              value={broker.broker_name}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={4}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Contact No"
                                              type="number"
                                              variant="outlined"
                                              name={`project_broker.${index}.contact_no`}
                                              value={broker.contact_no}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Broker Address"
                                              variant="outlined"
                                              name={`project_broker.${index}.broker_address`}
                                              value={broker.broker_address}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Inquiry Details"
                                              variant="outlined"
                                              name={`project_broker.${index}.inquary_details`}
                                              value={broker.inquary_details}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col
                                            md={1}
                                            className="d-flex align-items-end"
                                          >
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="contained"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <DeleteIcon fontSize="inherit" />
                                            </Button>
                                          </Col>
                                        </Row>
                                      )
                                    )}
                                  </div>
                                )}
                              />
                            </Col>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "project_details"}
                        onChange={handleExpand("project_details")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Project Document Detail</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Col md={12}>
                              <FieldArray
                                name="document_details"
                                render={(arrayHelpers) => (
                                  <div>
                                    <Row className="mb-3">
                                      <Col md={10}>
                                        <Label>Document Details</Label>
                                      </Col>
                                      <Col md={2} className="mb-2">
                                        <Button
                                          color="success"
                                          variant="contained"
                                          onClick={() =>
                                            arrayHelpers.push({
                                              document_name: "",
                                              approving_authority: "",
                                              date: "",
                                              reference_no: "",
                                              outward_no: "",
                                              remark: "",
                                              file_upload: null,
                                            })
                                          }
                                          size="large"
                                        >
                                          <AddIcon fontSize="inherit" />
                                        </Button>
                                      </Col>
                                    </Row>
                                    {formProps.values.document_details.map(
                                      (document, index) => (
                                        <Row key={index} className="mb-3">
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Document Name"
                                              variant="outlined"
                                              name={`document_details.${index}.document_name`}
                                              value={document.document_name}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Approving Authority"
                                              variant="outlined"
                                              name={`document_details.${index}.approving_authority`}
                                              value={
                                                document.approving_authority
                                              }
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              type="date"
                                              label="Date"
                                              variant="outlined"
                                              name={`document_details.${index}.date`}
                                              value={document.date}
                                              onChange={formProps.handleChange}
                                              InputLabelProps={{ shrink: true }}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Reference No"
                                              variant="outlined"
                                              name={`document_details.${index}.reference_no`}
                                              value={document.reference_no}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Outward No"
                                              variant="outlined"
                                              name={`document_details.${index}.outward_no`}
                                              value={document.outward_no}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              label="Remark"
                                              variant="outlined"
                                              name={`document_details.${index}.remark`}
                                              value={document.remark}
                                              onChange={formProps.handleChange}
                                            />
                                          </Col>
                                          <Col md={3}>
                                            <TextField
                                              fullWidth
                                              size="small"
                                              type="file"
                                              label="File Upload"
                                              variant="outlined"
                                              name={`document_details.${index}.file_upload`}
                                              onChange={(event) =>
                                                formProps.setFieldValue(
                                                  `document_details.${index}.file_upload`,
                                                  event.currentTarget.files[0]
                                                )
                                              }
                                              InputLabelProps={{ shrink: true }}
                                            />
                                          </Col>
                                          <Col
                                            md={2}
                                            className="d-flex align-items-end"
                                          >
                                            <Button
                                              color="error"
                                              size="large"
                                              variant="contained"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <DeleteIcon fontSize="inherit" />
                                            </Button>
                                          </Col>
                                        </Row>
                                      )
                                    )}
                                  </div>
                                )}
                              />
                            </Col>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "Localities_Neighbourhood"}
                        onChange={handleExpand("Localities_Neighbourhood")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>
                            Project Surrounding & Neighbourhood
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Row>
                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="building-type-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) => field?.name === "Property Type"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "building_type",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Building Type"
                                      name="building_type"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Commercial property"
                                  id="commercial_property"
                                  name="commercial_property"
                                  value={formProps.values.commercial_property}
                                  onChange={formProps.handleChange}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="project-surrounding-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) =>
                                        field?.name === "Project Surrounding"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "surrounding",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.surrounding &&
                                          formProps.errors.surrounding
                                      )}
                                      helperText={
                                        formProps.touched.surrounding &&
                                        formProps.errors.surrounding
                                      }
                                      label="Project surrounding"
                                      name="surrounding"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="project-localities-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) =>
                                        field?.name === "Project localities"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "localities",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.localities &&
                                          formProps.errors.localities
                                      )}
                                      helperText={
                                        formProps.touched.localities &&
                                        formProps.errors.localities
                                      }
                                      label="Project localities"
                                      name="localities"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Neighbourhood /type of development"
                                  id="neighbourhood"
                                  name="neighbourhood"
                                  value={formProps.values.neighbourhood}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Road access"
                                  id="road_access"
                                  name="road_access"
                                  value={formProps.values.road_access}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Road width"
                                  id="road_width"
                                  name="road_width"
                                  value={formProps.values.road_width}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="road-type-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) => field?.name === "Type of road"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "road_type",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.road_type &&
                                          formProps.errors.road_type
                                      )}
                                      helperText={
                                        formProps.touched.road_type &&
                                        formProps.errors.road_type
                                      }
                                      label="Type of road"
                                      name="road_type"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>

                              <Col md={4} className="pb-4">
                                <Autocomplete
                                  fullWidth
                                  id="approach-road-autocomplete"
                                  options={
                                    props?.dropdowns?.dropdowns?.filter(
                                      (field) =>
                                        field?.name ===
                                        "Condition of approach road"
                                    )[0]?.drop_down_details || []
                                  }
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  onChange={(e, value) => {
                                    formProps.setFieldValue(
                                      "approach_road",
                                      value?.name || ""
                                    );
                                  }}
                                  onOpen={formProps.handleBlur}
                                  includeInputInList
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      error={Boolean(
                                        formProps.touched.approach_road &&
                                          formProps.errors.approach_road
                                      )}
                                      helperText={
                                        formProps.touched.approach_road &&
                                        formProps.errors.approach_road
                                      }
                                      label="Condition of approach road"
                                      name="approach_road"
                                      variant="outlined"
                                    />
                                  )}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>

                  <Row className="pt-4 pb-4">
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "Proximity"}
                        onChange={handleExpand("Proximity")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Proximity to Civil Amenities </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Proximity to Civil Amenities</Label>
                            <Row className="pt-4 pb-2">
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="nearest_bus_station"
                                  name="nearest_bus_station"
                                  label="Nearest Bus Station"
                                  variant="outlined"
                                  value={formProps.values.nearest_bus_station}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="nearest_railway_station"
                                  name="nearest_railway_station"
                                  label="Nearest Railway Station"
                                  variant="outlined"
                                  value={
                                    formProps.values.nearest_railway_station
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="nearest_hospital"
                                  name="nearest_hospital"
                                  label="Nearest Hospital"
                                  variant="outlined"
                                  value={formProps.values.nearest_hospital}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="nearest_airport"
                                  name="nearest_airport"
                                  label="Nearest Airport"
                                  variant="outlined"
                                  value={formProps.values.nearest_airport}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    {/* <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "Boundries"}
                        onChange={handleExpand("Boundries")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Boundaries Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Project Physical Boundaries</Label>
                            <Row className="pt-4 pb-2">
                              <Col md={12}>
                                <FieldArray
                                  name="at_site"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="north_site"
                                            name="north_site"
                                            label="North"
                                            value={formProps.values.north_site}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.north_site &&
                                              Boolean(
                                                formProps.errors.north_site
                                              )
                                            }
                                            helperText={
                                              formProps.touched.north_site &&
                                              formProps.errors.north_site
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="south_site"
                                            name="south_site"
                                            label="South"
                                            value={formProps.values.south_site}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.south_site &&
                                              Boolean(
                                                formProps.errors.south_site
                                              )
                                            }
                                            helperText={
                                              formProps.touched.south_site &&
                                              formProps.errors.south_site
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="east_site"
                                            name="east_site"
                                            label="East"
                                            value={formProps.values.east_site}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.east_site &&
                                              Boolean(
                                                formProps.errors.east_site
                                              )
                                            }
                                            helperText={
                                              formProps.touched.east_site &&
                                              formProps.errors.east_site
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="west_site"
                                            name="west_site"
                                            label="West"
                                            value={formProps.values.west_site}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.west_site &&
                                              Boolean(
                                                formProps.errors.west_site
                                              )
                                            }
                                            helperText={
                                              formProps.touched.west_site &&
                                              formProps.errors.west_site
                                            }
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              if (
                                                formProps?.values?.at_site
                                                  .length == 0
                                              ) {
                                                arrayHelpers.push({
                                                  id: formProps?.values?.at_site
                                                    .length,
                                                  north_site:
                                                    formProps.values.north_site,
                                                  south_site:
                                                    formProps.values.south_site,
                                                  east_site:
                                                    formProps.values.east_site,
                                                  west_site:
                                                    formProps.values.west_site,
                                                });
                                              } else {
                                              }
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Sr No</th>
                                            <th>North</th>
                                            <th>South</th>
                                            <th>East</th>
                                            <th>West</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.at_site?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="North_site"
                                                      variant="outlined"
                                                      name={`at_site.${index}.north_site`}
                                                      value={area.north_site}
                                                      id="north_site"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="South"
                                                      variant="outlined"
                                                      name={`at_site.${index}.south_site`}
                                                      value={area.south_site}
                                                      id="south_site"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="East"
                                                      variant="outlined"
                                                      name={`at_site.${index}.east_site`}
                                                      value={area.east_site}
                                                      id="east_site"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="West"
                                                      variant="outlined"
                                                      name={`at_site.${index}.west_site`}
                                                      value={area.west_site}
                                                      id="west_site"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                            </Row>
                            <Label>Boundaries as per Plan / Document</Label>
                            <Row className="pt-4 pb-2">
                              <Col md={12}>
                                <FieldArray
                                  name="project_boundries"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="north"
                                            name="north"
                                            label="North"
                                            value={formProps.values.north}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.north &&
                                              Boolean(formProps.errors.north)
                                            }
                                            helperText={
                                              formProps.touched.north &&
                                              formProps.errors.north
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="south"
                                            name="south"
                                            label="South"
                                            value={formProps.values.south}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.south &&
                                              Boolean(formProps.errors.south)
                                            }
                                            helperText={
                                              formProps.touched.south &&
                                              formProps.errors.south
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="east"
                                            name="east"
                                            label="East"
                                            value={formProps.values.east}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.east &&
                                              Boolean(formProps.errors.east)
                                            }
                                            helperText={
                                              formProps.touched.east &&
                                              formProps.errors.east
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="west"
                                            name="west"
                                            label="West"
                                            value={formProps.values.west}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.west &&
                                              Boolean(formProps.errors.west)
                                            }
                                            helperText={
                                              formProps.touched.west &&
                                              formProps.errors.west
                                            }
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              if (
                                                formProps?.values
                                                  ?.project_boundries.length ==
                                                0
                                              ) {
                                                arrayHelpers.push({
                                                  id: formProps?.values
                                                    ?.project_boundries.length,
                                                  north: formProps.values.north,
                                                  south: formProps.values.south,
                                                  east: formProps.values.east,
                                                  west: formProps.values.west,
                                                });
                                              } else {
                                              }
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Sr No</th>
                                            <th>North</th>
                                            <th>South</th>
                                            <th>East</th>
                                            <th>West</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.project_boundries?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="North"
                                                      variant="outlined"
                                                      name={`at_site.${index}.north`}
                                                      value={area.north}
                                                      id="north"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="South"
                                                      variant="outlined"
                                                      name={`at_site.${index}.south`}
                                                      value={area.south}
                                                      id="south"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="East"
                                                      variant="outlined"
                                                      name={`at_site.${index}.east`}
                                                      value={area.east}
                                                      id="east"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="West"
                                                      variant="outlined"
                                                      name={`at_site.${index}.west`}
                                                      value={area.west}
                                                      id="west"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col> */}

                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "Specification"}
                        onChange={handleExpand("Specification")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Specification of Unit</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Specification of Unit</Label>
                            <Row className="pt-4 pb-2">
                              <Col md={12}>
                                <FieldArray
                                  name="amenitites_flat"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={4} className="pb-4">
                                          <TextField
                                            fullWidth
                                            size="small"
                                            id="type_of_unit"
                                            name="type_of_unit"
                                            label="Type of Unit"
                                            variant="outlined"
                                            value={
                                              formProps.values.type_of_unit
                                            }
                                            onChange={formProps.handleChange}
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <Autocomplete
                                            fullWidth
                                            id="flooring-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name === "Floring"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "floring",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                error={Boolean(
                                                  formProps.touched.floring &&
                                                    formProps.errors.floring
                                                )}
                                                helperText={
                                                  formProps.touched.floring &&
                                                  formProps.errors.floring
                                                }
                                                label="Flooring"
                                                name="floring"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Autocomplete
                                            fullWidth
                                            id="doors-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name === "Doors"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "doors",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                error={Boolean(
                                                  formProps.touched.doors &&
                                                    formProps.errors.doors
                                                )}
                                                helperText={
                                                  formProps.touched.doors &&
                                                  formProps.errors.doors
                                                }
                                                label="Doors"
                                                name="doors"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Autocomplete
                                            fullWidth
                                            id="windows-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name === "Window"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "windows",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                error={Boolean(
                                                  formProps.touched.windows &&
                                                    formProps.errors.windows
                                                )}
                                                helperText={
                                                  formProps.touched.windows &&
                                                  formProps.errors.windows
                                                }
                                                label="Windows"
                                                name="windows"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Autocomplete
                                            fullWidth
                                            id="kitchen-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name === "Kitchen"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "kitchen",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                error={Boolean(
                                                  formProps.touched.kitchen &&
                                                    formProps.errors.kitchen
                                                )}
                                                helperText={
                                                  formProps.touched.kitchen &&
                                                  formProps.errors.kitchen
                                                }
                                                label="Kitchen"
                                                name="kitchen"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Autocomplete
                                            fullWidth
                                            id="plumbing-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name === "Plumbing"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "plumbing",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                error={Boolean(
                                                  formProps.touched.plumbing &&
                                                    formProps.errors.plumbing
                                                )}
                                                helperText={
                                                  formProps.touched.plumbing &&
                                                  formProps.errors.plumbing
                                                }
                                                label="Plumbing"
                                                name="plumbing"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Autocomplete
                                            fullWidth
                                            id="electrification-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name ===
                                                  "Electrification"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "electrification",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                label="Electrification"
                                                name="electrification"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={2} className="mt-2">
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="other"
                                            name="other"
                                            label="Other"
                                            value={formProps.values.other}
                                            onChange={formProps.handleChange}
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Button
                                            className="mt-2"
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              if (
                                                formProps?.values
                                                  ?.amenitites_flat.length == 0
                                              ) {
                                                arrayHelpers.push({
                                                  id: formProps?.values
                                                    ?.amenitites_flat.length,
                                                  type_of_unit:
                                                    formProps.values
                                                      .type_of_unit,
                                                  floring:
                                                    formProps.values.floring,
                                                  doors: formProps.values.doors,
                                                  windows:
                                                    formProps.values.windows,
                                                  kitchen:
                                                    formProps.values.kitchen,
                                                  plumbing:
                                                    formProps.values.plumbing,
                                                  electrification:
                                                    formProps.values
                                                      .electrification,
                                                  other: formProps.values.other,
                                                });
                                              } else {
                                              }
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Sr No</th>
                                            <th>Type of Unit</th>
                                            <th>Floring</th>
                                            <th>Doors</th>
                                            <th>Windows</th>
                                            <th>Kitchen</th>
                                            <th>Plumbing</th>
                                            <th>Electrification</th>
                                            <th>Other</th>

                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.amenitites_flat?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Type Of Unit"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.type_of_unit`}
                                                      value={area.type_of_unit}
                                                      id="type_of_unit"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Floring"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.floring`}
                                                      value={area.floring}
                                                      id="floring"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Doors"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.doors`}
                                                      value={area.doors}
                                                      id="doors"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Windows"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.windows`}
                                                      value={area.windows}
                                                      id="windows"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Kitchen"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.kitchen`}
                                                      value={area.kitchen}
                                                      id="kitchen"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Plumbing"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.plumbing`}
                                                      value={area.plumbing}
                                                      id="plumbing"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Electrification"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.electrification`}
                                                      value={
                                                        area.electrification
                                                      }
                                                      id="electrification"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Other"
                                                      variant="outlined"
                                                      name={`amenitites_flat.${index}.other`}
                                                      value={area.other}
                                                      id="other"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>

                    {/* <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "Construction"}
                        onChange={handleExpand("Construction")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Construction Stage</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Construction Stage</Label>
                            <Row className="pt-4 pb-2">
                              <Col md={12}>
                                <FieldArray
                                  name="construction_stage"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="tower"
                                            name="tower"
                                            label="Tower"
                                            value={formProps.values.tower}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.tower &&
                                              Boolean(formProps.errors.tower)
                                            }
                                            helperText={
                                              formProps.touched.tower &&
                                              formProps.errors.tower
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="wings"
                                            name="wings"
                                            label="Wings"
                                            value={formProps.values.wings}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.wings &&
                                              Boolean(formProps.errors.wings)
                                            }
                                            helperText={
                                              formProps.touched.wings &&
                                              formProps.errors.wings
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="progress"
                                            name="progress"
                                            label="Progress %"
                                            value={formProps.values.progress}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.progress &&
                                              Boolean(formProps.errors.progress)
                                            }
                                            helperText={
                                              formProps.touched.progress &&
                                              formProps.errors.progress
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="recommendation"
                                            name="recommendation"
                                            label="Recommendation %"
                                            value={
                                              formProps.values.recommendation
                                            }
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched
                                                .recommendation &&
                                              Boolean(
                                                formProps.errors.recommendation
                                              )
                                            }
                                            helperText={
                                              formProps.touched
                                                .recommendation &&
                                              formProps.errors.recommendation
                                            }
                                          />
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            select
                                            size="small"
                                            variant="outlined"
                                            id="status"
                                            name="status"
                                            label="Status"
                                            value={formProps.values.status}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.status &&
                                              Boolean(formProps.errors.status)
                                            }
                                            helperText={
                                              formProps.touched.status &&
                                              formProps.errors.status
                                            }
                                          >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem
                                              value={"Under Construction"}
                                            >
                                              Under Construction
                                            </MenuItem>
                                            <MenuItem value={"Completed"}>
                                              Completed
                                            </MenuItem>
                                          </TextField>
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="remark"
                                            name="remark"
                                            label="Remarks"
                                            value={formProps.values.remark}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.remark &&
                                              Boolean(formProps.errors.remark)
                                            }
                                            helperText={
                                              formProps.touched.remark &&
                                              formProps.errors.remark
                                            }
                                          />
                                        </Col>

                                        <Col md={2} className="mt-2">
                                          <TextField
                                            fullWidth
                                            size="small"
                                            type="date"
                                            variant="outlined"
                                            id="cc_date"
                                            name="cc_date"
                                            label="CC Date"
                                            value={formProps.values.cc_date}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.cc_date &&
                                              Boolean(formProps.errors.cc_date)
                                            }
                                            helperText={
                                              formProps.touched.cc_date &&
                                              formProps.errors.cc_date
                                            }
                                          />
                                        </Col>
                                        <Col md={2} className="mt-2">
                                          <TextField
                                            fullWidth
                                            size="small"
                                            type="date"
                                            variant="outlined"
                                            id="review_date"
                                            name="review_date"
                                            label="Stage Review Date"
                                            value={formProps.values.review_date}
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.review_date &&
                                              Boolean(
                                                formProps.errors.review_date
                                              )
                                            }
                                            helperText={
                                              formProps.touched.review_date &&
                                              formProps.errors.review_date
                                            }
                                          />
                                        </Col>
                                        <Col md={2} className="mt-2">
                                          <TextField
                                            fullWidth
                                            size="small"
                                            type="date"
                                            variant="outlined"
                                            id="current_date"
                                            name="current_date"
                                            label="Current Date"
                                            value={
                                              formProps.values.current_date
                                            }
                                            onChange={formProps.handleChange}
                                            error={
                                              formProps.touched.current_date &&
                                              Boolean(
                                                formProps.errors.current_date
                                              )
                                            }
                                            helperText={
                                              formProps.touched.current_date &&
                                              formProps.errors.current_date
                                            }
                                          />
                                        </Col>

                                        <Col md={2}>
                                          <Button
                                            className="mt-2"
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              arrayHelpers.push({
                                                id:
                                                  formProps?.values
                                                    ?.construction_stage == null
                                                    ? 0
                                                    : formProps?.values
                                                        ?.construction_stage
                                                        .length,
                                                tower: formProps.values.tower,
                                                wings: formProps.values.wings,
                                                progress:
                                                  formProps.values.progress,
                                                recommendation:
                                                  formProps.values
                                                    .recommendation,
                                                remark: formProps.values.remark,
                                                status: formProps.values.status,
                                                review_date:
                                                  formProps.values.review_date,
                                                cc_date:
                                                  formProps.values.cc_date,
                                                current_date:
                                                  formProps.values.current_date,
                                              });
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table size="sm" className="mt-3">
                                        <thead>
                                          <tr>
                                            <th>Sr No</th>
                                            <th>Tower</th>
                                            <th>Wings</th>
                                            <th>Progress %</th>
                                            <th>Recommendation %</th>
                                            <th>Status</th>
                                            <th>Remarks</th>
                                            <th>CC Date</th>
                                            <th>Stage Review Date</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {formProps?.values?.construction_stage?.map(
                                            (area, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Tower"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.tower`}
                                                      value={area.tower}
                                                      id="tower"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Wings"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.wings`}
                                                      value={area.wings}
                                                      id="wings"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Progress"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.progress`}
                                                      value={area.progress}
                                                      id="progress"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Recommendation"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.recommendation`}
                                                      value={
                                                        area.recommendation
                                                      }
                                                      id="recommendation"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Remark"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.remark`}
                                                      value={area.remark}
                                                      id="remark"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Status"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.status`}
                                                      value={area.status}
                                                      id="status"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Review Date"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.review_date`}
                                                      value={area.review_date}
                                                      id="review_date"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="CC Date"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.cc_date`}
                                                      value={area.cc_date}
                                                      id="cc_date"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      label="Current Date"
                                                      variant="outlined"
                                                      name={`construction_stage.${index}.current_date`}
                                                      value={area.current_date}
                                                      id="current_date"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="contained"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Overall Project Completion"
                                  id="percent_completion"
                                  name="percent_completion"
                                  value={formProps.values.percent_completion}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Overall Project Stage Recommendation"
                                  id="stage_recommendation_completion"
                                  name="stage_recommendation_completion"
                                  value={
                                    formProps.values
                                      .stage_recommendation_completion
                                  }
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col> */}

                    {/* <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "contact_person"}
                        onChange={handleExpand("contact_person")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Contact Person Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Contact Person Details</Label>
                            <Row>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  type="date"
                                  variant="outlined"
                                  size="small"
                                  label="Visit Date"
                                  id="visit_date"
                                  name="visit_date"
                                  value={formProps.values.visit_date}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Sourced By"
                                  id="sourced_by"
                                  name="sourced_by"
                                  value={formProps.values.sourced_by}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Person to Meet"
                                  id="person_meet"
                                  name="person_meet"
                                  value={formProps.values.person_meet}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={4} className="pb-4">
                                <TextField
                                  fullWidth
                                  variant="outlined"
                                  size="small"
                                  label="Phone Number"
                                  id="phone_num"
                                  name="phone_num"
                                  value={formProps.values.phone_num}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col> */}
                    <Col md={12} className="">
                      <Accordion
                        expanded={expanded === "Declaration"}
                        onChange={handleExpand("Declaration")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>APF Remark / Declaration</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>APF Remark / Declaration</Label>
                            <Row>
                              <Col md={12}>
                                <Label>Declaration</Label>
                                <JoditEditor
                                  id="declaration_details"
                                  label="Declaration "
                                  name="declaration_details"
                                  value={content}
                                  onChange={(newContent) =>
                                    setContent(newContent)
                                  }
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12} className="">
                                <Label>Report Remarks</Label>
                                <TextareaAutosize
                                  //  aria-label="minimum height"
                                  style={{ width: 1060, margin: "auto" }}
                                  minRows={6}
                                  fullWidth
                                  // variant="outlined"
                                  size="large"
                                  label="Report Remarks"
                                  id="report_remark"
                                  name="report_remark"
                                  value={formProps.values.report_remark}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "special_remarks"}
                        onChange={handleExpand("special_remarks")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Special Remarks</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Special Remarks</Label>
                            <Row>
                              <Col md={12} className="pb-4">
                                <FieldArray
                                  name="special_remarks"
                                  render={(arrayHelpers) => (
                                    <div>
                                      <Row>
                                        <Col md={3}>
                                          <Autocomplete
                                            fullWidth
                                            id="remark_type-autocomplete"
                                            options={
                                              props?.dropdowns?.dropdowns?.filter(
                                                (field) =>
                                                  field?.name === "Remark Type"
                                              )[0]?.drop_down_details || []
                                            }
                                            getOptionLabel={(option) =>
                                              option?.name || ""
                                            }
                                            onChange={(e, value) => {
                                              formProps.setFieldValue(
                                                "remark_type",
                                                value?.name || ""
                                              );
                                            }}
                                            onOpen={formProps.handleBlur}
                                            includeInputInList
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                error={Boolean(
                                                  formProps.touched
                                                    .remark_type &&
                                                    formProps.errors.remark_type
                                                )}
                                                helperText={
                                                  formProps.touched
                                                    .remark_type &&
                                                  formProps.errors.remark_type
                                                }
                                                label="Remark Type"
                                                name="remark_type"
                                                variant="outlined"
                                              />
                                            )}
                                          />
                                        </Col>

                                        <Col md={3}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            id="remark_name"
                                            name="remark_name"
                                            label="Remarks"
                                            value={formProps.values.remark_name}
                                            onChange={formProps.handleChange}
                                          />
                                        </Col>
                                        <Col md={3}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            select
                                            id="status"
                                            name="status"
                                            label="status"
                                            variant="outlined"
                                            value={formProps.values.status}
                                            onChange={formProps.handleChange}
                                          >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value={0}>
                                              Important (This will show in
                                              report)
                                            </MenuItem>
                                            <MenuItem value={1}>
                                              General
                                            </MenuItem>
                                          </TextField>
                                        </Col>
                                        <Col md={2}>
                                          <TextField
                                            fullWidth
                                            size="small"
                                            select
                                            id="show_status"
                                            name="show_status"
                                            label="Show Status"
                                            variant="outlined"
                                            value={formProps.values.show_status}
                                            onChange={formProps.handleChange}
                                          >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>
                                            <MenuItem value={1}>Yes</MenuItem>
                                          </TextField>
                                        </Col>

                                        <Col md={1}>
                                          <Button
                                            color="success"
                                            variant="contained"
                                            onClick={() => {
                                              arrayHelpers.push({
                                                remark_type:
                                                  formProps.values.remark_type,
                                                remark_name:
                                                  formProps.values.remark_name,
                                                status: formProps.values.status,
                                                show_status:
                                                  formProps.values.show_status,
                                              });
                                              {
                                                formProps.setFieldValue(
                                                  "remark_type",
                                                  ""
                                                );
                                                formProps.setFieldValue(
                                                  "remark_name",
                                                  ""
                                                );
                                                formProps.setFieldValue(
                                                  "status",
                                                  ""
                                                );
                                                formProps.setFieldValue(
                                                  "document_file",
                                                  ""
                                                );
                                              }
                                            }}
                                            size="large"
                                          >
                                            <AddIcon fontSize="inherit" />
                                          </Button>
                                        </Col>
                                      </Row>
                                      <Table
                                        size="sm"
                                        className="mt-3"
                                        bordered
                                        style={{ textAlign: "center" }}
                                      >
                                        <thead>
                                          <tr>
                                            <th>Sr No.</th>
                                            <th>Remark Type</th>
                                            <th>Remark</th>
                                            <th>Status</th>
                                            <th>Show Status</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          {formProps?.values?.special_remarks?.map(
                                            (document, index) => {
                                              return (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      select
                                                      size="small"
                                                      label="Remark Type"
                                                      variant="outlined"
                                                      name={`document.${index}.remark_type`}
                                                      value={
                                                        document.remark_type
                                                      }
                                                      id="remark_type"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    >
                                                      <MenuItem value="">
                                                        Select
                                                      </MenuItem>
                                                      {props?.dropdowns?.dropdowns
                                                        ?.filter(
                                                          (field) =>
                                                            field?.name ===
                                                            "Remark Type"
                                                        )[0]
                                                        ?.drop_down_details?.map(
                                                          (field, i) => (
                                                            <MenuItem
                                                              key={i}
                                                              value={
                                                                field?.name
                                                              }
                                                            >
                                                              {field?.name}
                                                            </MenuItem>
                                                          )
                                                        )}
                                                    </TextField>
                                                  </td>

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      type="remark_name"
                                                      size="small"
                                                      label="Remarks"
                                                      variant="outlined"
                                                      name={`document.${index}.remark_name`}
                                                      value={
                                                        document.remark_name
                                                      }
                                                      id="remark_name"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      size="small"
                                                      select
                                                      label="status"
                                                      variant="outlined"
                                                      name={`document.${index}.status`}
                                                      value={document.status}
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                      id="status"
                                                    >
                                                      <MenuItem value="">
                                                        Select
                                                      </MenuItem>
                                                      <MenuItem value={0}>
                                                        Important (This will
                                                        show in report)
                                                      </MenuItem>
                                                      <MenuItem value={1}>
                                                        General
                                                      </MenuItem>
                                                    </TextField>
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      select
                                                      size="small"
                                                      label="show Status"
                                                      variant="outlined"
                                                      name={`document.${index}.show_status`}
                                                      value={
                                                        document.show_status
                                                      }
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                      id="show_status"
                                                    >
                                                      <MenuItem value="">
                                                        Select
                                                      </MenuItem>
                                                      <MenuItem value={0}>
                                                        No
                                                      </MenuItem>
                                                      <MenuItem value={1}>
                                                        Yes
                                                      </MenuItem>
                                                    </TextField>
                                                  </td>

                                                  <td>
                                                    <Button
                                                      color="error"
                                                      size="large"
                                                      variant="outlined"
                                                      onClick={() =>
                                                        arrayHelpers.remove(
                                                          index
                                                        )
                                                      }
                                                    >
                                                      <DeleteIcon fontSize="inherit" />
                                                    </Button>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </Table>
                                    </div>
                                  )}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "site_engg"}
                        onChange={handleExpand("site_engg")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Site Engineer Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Site Engineer Details</Label>
                            <Row>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="name_of_engg"
                                  name="name_of_engg"
                                  label="Name of Engineer"
                                  variant="outlined"
                                  value={formProps.values.name_of_engg}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                              <Col md={6} className="pb-4">
                                <TextField
                                  fullWidth
                                  size="small"
                                  id="visit_date"
                                  name="visit_date"
                                  label="Visit Date"
                                  variant="outlined"
                                  value={formProps.values.visit_date}
                                  onChange={formProps.handleChange}
                                />
                              </Col>
                            </Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "photograph"}
                        onChange={handleExpand("photograph")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Photographs</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Photograph</Label>
                            <Row></Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row> */}
                  {/* <Row>
                    <Col md={12} className="pb-4">
                      <Accordion
                        expanded={expanded === "annexure"}
                        onChange={handleExpand("annexure")}
                      >
                        <AccordionSummary
                          aria-controls="panel3d-content"
                          id="panel3d-header"
                        >
                          <Typography>Annexure</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Label>Annexure</Label>
                            <Row></Row>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Col>
                  </Row> */}

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
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    dropdowns: state.dropdowns,
    readyReckners: state.readyReckners,
    pincodes: state.pincodes,
    banks: state.banks,
    avm: state.avm,
    property: state.property,
    comparable: state.comparable,
    projects: state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postProjects2: (data, users) => dispatch(postProjects2(data, users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjects);
