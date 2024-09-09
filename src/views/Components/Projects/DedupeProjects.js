import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Divider, FormControl, InputLabel, ListItemText, OutlinedInput, TextareaAutosize } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";
import AddCaption from "./AddCaption";
import { Autocomplete } from "@mui/material";

//*Actions
import { postProjects2 } from "../../../Redux/Creators/ProjectsCreators";
import { DeleteSpecial_remarks } from "../../../Redux/Creators/ProjectsCreators";
import JoditEditor from 'jodit-react';

function DedupeProjects(props) {
  const [modal, setModal] = useState(false);
  const [content, setContent] = React.useState(props?.data?.declaration || "");
  const [expanded, setExpanded] = React.useState("panel1");

  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    const token = props.login?.login?.token;
    const user = {
      id: props.data.id,
      pageno: 1,
      pageSize: 10000,
      token: token,
    };
    const data = new FormData();
    data.append("project_name", values.project_name);
    data.append("project_boundries", JSON.stringify(values.project_boundries));
    data.append("per_site", values.per_site);
    data.append("address", values.address);
    data.append("legal_address", values.legal_address);
    data.append("rera_no", values.rera_no);
    data.append("commencement_date", values.commencement_date);
    data.append("end_date", values.end_date);
    data.append("revised_end_date", values.revised_end_date);
    data.append("building_type", values.building_type);
    // data.append("amenities", values.amenities);
    data.append("amenities", JSON.stringify(personName));
    data.append("project_amenities", JSON.stringify(personName));
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
    data.append("approving_authority", JSON.stringify(personName2));
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
    data.append("project_amenities", values.project_amenities);
    data.append("unauthorized_layout", values.unauthorized_layout);
    data.append("associated_risk", values.associated_risk);
    data.append("vicinity_rate", values.vicinity_rate);
    data.append("flat_rate", values.flat_rate);
    data.append("recommended_rate", values.recommended_rate);
    data.append(
      "construction_stage",
      JSON.stringify(values.construction_stage)
    );
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
    data.append("state", values.pincode?.state);
    data.append("country", values.country);
    data.append("district", values.pincode?.districtname);
    data.append("city", values.pincode?.city);
    data.append("village", values.village);
    data.append("percentage", values.percentage);
    data.append("rera_bank", values.rera_bank);
    data.append("client_bank", values.client_bank);
    
    console.log("data::", data,JSON.stringify(personName),personName);

    props.postProjects2(data, user);
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

  const [personName, setPersonName] = React.useState(props?.data?.project_amenities || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [personName2, setPersonName2] = React.useState(props?.data?.approving_authority || []);

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [personName3, setPersonName3] = React.useState([]);

  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName3(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
        <div
        style={{
          "font-weight": "800",
          "font-size": "1rem",
          "cursor": "pointer",
          "color": "#5e72e6",
        }}
          onClick={() => toggle()}
        >
          <i className="" aria-hidden="true"></i>Dedupe Project
        </div>
      <Modal
        className="modal-xl"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Dedupe Project</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              project_name: props?.data?.project_name,
              project_boundries: JSON.parse(props?.data?.project_boundries), //add karwa
              per_site: props?.data?.per_site,
              address: props?.data?.address,
              legal_address: props?.data?.legal_address, //add karwa

              //*rera
              rera_no: props?.data?.rera_no,
              commencement_date: props?.data?.commencement_date,
              end_date: props?.data?.end_date,
              revised_end_date: props?.data?.revised_end_date,
              building_type: props?.data?.building_type, //add karwa
              project_amenities: props?.data?.project_amenities,
              amenities: props?.data?.project_amenities,
              surrounding: props?.data?.surrounding,
              localities: props?.data?.localities,
              neighbourhood: props?.data?.neighbourhood, //add karwa
              road_access: props?.data?.road_access,
              road_width: props?.data?.road_width,
              road_type: props?.data?.road_type,
              approach_road: props?.data?.approach_road,
              structure_type: props?.data?.structure_type,
              negative_info_project: props?.data?.negative_info_project,
              negative_info_locality: props?.data?.negative_info_locality,

              //*Documents
              approving_authority: props?.data?.approving_authority || [],
              corp_limit: props?.data?.corp_limit,
              municipal_limit: props?.data?.municipal_limit,
              tpvd: props?.data?.tpvd,
              commercial_property: props?.data?.commercial_property,
              building_age: props?.data?.building_age,
              residual_age: props?.data?.residual_age,
              gf: props?.data?.gf,

              //*
              project_details: props?.data?.project_details,
              project_tower_details: props?.data?.project_tower_details,
              project_flat_details: props?.data?.project_flat_details,
              special_remarks: props?.data?.special_remarks,
              doc_name: "",
              date: moment().format("YYYY-MM-DD"),
              ref_no: "",
              floors_no: "",
              remarks: "",
              //*

              //*Builder
              builder_name: props?.data?.builder_name,
              builder_address: props?.data?.builder_address,
              builder_contact: props?.data?.builder_contact,
              previous_project: props?.data?.previous_project,
              permit_details: props?.data?.permit_details,
              negative_info: props?.data?.negative_info,

              tp_no: props?.data?.tp_no,
              survey_no: props?.data?.survey_no,
              fp_no: props?.data?.fp_no,
              cts_no: props?.data?.cts_no,
              sp_no: props?.data?.sp_no,
              op_no: props?.data?.op_no,
              plot_no: props?.data?.plot_no,
              block_no: props?.data?.block_no,
              flat_no: props?.data?.flat_no,
              khasra_no: props?.data?.khasra_no,
              negative_info_remark: props?.data?.negative_info_remark,
              pincode: props?.data?.pincode,
              location: props?.data?.location,
              area: props?.data?.area,
              visit_date: props?.data?.visit_date,
              sourced_by: props?.data?.sourced_by,
              phone_num: props?.data?.phone_num,
              person_meet: props?.data?.person_meet,
              architect: props?.data?.architect,
              locality_class: props?.data?.locality_class,
              civil_amenities: props?.data?.civil_amenities,
              at_site: props?.data?.at_site,
              longitude: props?.data?.longitude,
              latitidue: props?.data?.latitidue,
              permissible_FSI: props?.data?.permissible_FSI,
              permissible_plot_area: props?.data?.permissible_plot_area,
              consumed_FSI: props?.data?.consumed_FSI,
              wings_NO: props?.data?.wings_NO,
              approved_flar: props?.data?.approved_flar,
              carpet_area: props?.data?.carpet_area,
              apporvel_levels: props?.data?.apporvel_levels,
              approved_land_use: props?.data?.approved_land_use,
              shop_nos: props?.data?.shop_nos,
              flat_carpet_area: props?.data?.flat_carpet_area,
              construction_type: props?.data?.construction_type,
              construction_quality: props?.data?.construction_quality,
              amenitites_flat: props?.data?.amenitites_flat,
              // project_amenities: props?.data?.project_amenities,
              unauthorized_layout: props?.data?.unauthorized_layout,
              associated_risk: props?.data?.associated_risk,
              vicinity_rate: props?.data?.vicinity_rate,
              flat_rate: props?.data?.flat_rate,
              recommended_rate: props?.data?.recommended_rate,
              construction_stage: props?.data?.construction_stage,
              percent_completion: props?.data?.percent_completion,
              rera_date: props?.data?.rera_date,
              opinion_date: props?.data?.opinion_date,
              developer_date: props?.data?.developer_date,
              declaration: props?.data?.declaration,


              is_underconstruction: props?.data?.is_underconstruction,
              is_npa: props?.data?.is_npa,
              is_negative: props?.data?.is_negative,


              commercial_net_yield: props?.data?.commercial_net_yield,
              commercial_gross_yield: props?.data?.commercial_gross_yield,
              residential_net_yield: props?.data?.residential_net_yield,
              residential_gross_yield: props?.data?.residential_gross_yield,
              ready_reckner_id: props?.data?.ready_reckner_id,
              npa_remarks: props?.data?.npa_remarks,
              npa_file_upload: props?.data?.npa_file_upload,
              negative_file_upload: props?.data?.negative_file_upload,
              b_north: props?.data?.b_north,
              b_south: props?.data?.b_south,
              b_east: props?.data?.b_east,
              b_west: props?.data?.b_west,
              pb_north: props?.data?.pb_north,
              pb_west: props?.data?.pb_west,
              pb_east: props?.data?.pb_east,
              pb_south: props?.data?.pb_south,
              report_remark: props?.data?.report_remark,
              no_towers: props?.data?.no_towers,
              //ready reckner
              // village_name: props?.data?.village_name,
              // area_type: props?.data?.area_type,
              // local_body_type: props?.data?.local_body_type,
              // local_body_name: props?.data?.local_body_name,
              // landmark: props?.data?.landmark,
              // zone: props?.data?.zone,
              // subzone: props?.data?.subzone,
              // land: props?.data?.land,
              // residential: props?.data?.residential,
              // office: props?.data?.office,
              // shop: props?.data?.shop,
              // industrial: props?.data?.industrial,
              // cs_no: props?.data?.cs_no,
              // tps_no: props?.data?.tps_no,
              sociaty_name: props?.data?.sociaty_name,
              taluka: props?.data?.taluka,
              state: props?.data?.state,
              country: props?.data?.country,
              district: props?.data?.district,
              city: props?.data?.city,
              village: props?.data?.village,
              percentage: props?.data?.percentage,
              client_bank: props?.data?.client_bank,
              rera_bank: props?.data?.rera_bank,
              readyReckners:props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id),
              village_name: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.village_name,
              area_type: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.area_type,
              local_body_type: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.local_body_type,
              local_body_name: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.local_body_name,
              landmark: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.landmark,
              zone: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.zone,
              subzone: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.subzone,
              land: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.land,
              residential: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.residential,
              office: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.office,
              shop: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.shop,
              industrial: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.industrial,
              cs_no: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.cs_no,
              tps_no: props.readyReckners?.readyReckners?.find((row,i)=> row.id === props?.data?.ready_reckner_id)?.tps_no,

              
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              project_name: Yup.string().required("Project Name is required"),
              address: Yup.string().required("Project Address is required"),

              // rera_no: Yup.string().required("Rera No. is required"),

              // commencement_date: Yup.string().required(
              //   "Commencement Date is required"
              // ),
              // end_date: Yup.string().required("End Date required"),
              // revised_end_date: Yup.string().required(
              //   "Revised End Date is required"
              // ),
              // project_amenities: Yup.string().required("Project Amenities is required"),
              // localities: Yup.string().required(
              //   "Project Localities is required"
              // ),
              // surrounding: Yup.string().required(
              //   "Project Surrounding is required"
              // ),
            })}
          >
            {(formProps) => {
              const pincodeProps = {
                options: props.pincodes?.isLoading
                  ? []
                  : props.pincodes?.pincodes?.data?.map((pincode) => pincode),
              };
              return (
                <Form>
                <Row>
                  {console.log(
                    "formProps",
                    formProps.values.building_type,
                    formProps.values.electrification
                  )}
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
                                    console.log(value, e, "ere");

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
                                label="City *"
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
                                label="District *"
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
                                label="State *"
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
                                    label="Country *"
                                    name="country"
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
                                label="Latitude"
                                id="latitidue"
                                name="latitidue"
                                value={formProps.values.latitidue}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                label="Longitude"
                                id="longitude"
                                name="longitude"
                                value={formProps.values.longitude}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={4} className="pb-4"></Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="tp_no"
                                name="tp_no"
                                label="TP No *"
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
                            <Col md={4} className="pb-4"></Col>
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
                            <Col md={6} className="pb-4">
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
                              <TextField
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
                                // label="Project Negative Remark"
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
                              />
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
                            <Col md={6} className="pb-4">
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
                              variant="outlined"
                              type="file"
                              hidden={
                                formProps.values.is_npa == 1 ? false : true
                              }
                              size="small"
                              id="npa_file_upload"
                              name="npa_file_upload"
                              // label="Project NPA File"
                              value={formProps.values.npa_file_upload}
                              onChange={formProps.handleChange}
                              error={
                                formProps.touched.npa_file_upload &&
                                Boolean(formProps.errors.npa_file_upload)
                              }
                              helperText={
                                formProps.touched.npa_file_upload &&
                                formProps.errors.npa_file_upload
                              }
                            /> */}
                              <TextField
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
                              />
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
                            {/* <Col md={8}></Col> */}
                            {/* <Col md={6} className="pb-4">
                            <TextField
                              fullWidth
                              // select
                              id="negative_info_project"
                              size="small"
                              name="negative_info_project"
                              label="-ve Information of Project"
                              variant="outlined"
                              value={formProps.values.negative_info_project}
                              onChange={formProps.handleChange}
                            >
                            </TextField>
                          </Col> */}

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
                            <Col md={4} className="pb-4">
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
                            </Col>
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
                            <Col md={8} className="pb-4">
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
                                  props.banks?.banks?.data.find(
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
                            </Col>
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
                        <Typography>Builder Details</Typography>
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
                                label="Builder name"
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
                                label="Builder address"
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
                                label="Builder contact"
                                id="builder_contact"
                                name="builder_contact"
                                value={formProps.values.builder_contact}
                                onChange={formProps.handleChange}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
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
                                label="Category of Builders"
                                id="permit_details"
                                name="permit_details"
                                value={formProps.values.permit_details}
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
                            </Col>
                            <Col md={4} className="pb-4">
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
                            </Col>
                            <Col md={4} className="pb-4">
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
                            </Col>
                          </Row>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Col>

                  <Col md="12" className="mt-4">
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
                          {/* <Label>Rera Details</Label> */}
                          <Row>
                            <Col md={6} className="pb-4">
                              <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                id="rera_no"
                                name="rera_no"
                                label="Rera No."
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
                                  props.banks?.banks?.data.find(
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
                              <div>
                                <FormControl sx={{ m: 1, width: 1053 }}>
                                  <InputLabel id="demo-multiple-checkbox-label">
                                    Approving Authority
                                  </InputLabel>
                                  <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={personName2}
                                    onChange={handleChange2}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) =>
                                      selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {props?.dropdowns?.dropdowns
                                      ?.filter(
                                        (field) =>
                                          field?.name == "approving_authority"
                                      )[0]
                                      ?.drop_down_details?.map((field) => (
                                        <MenuItem
                                          key={field?.name}
                                          value={field?.name}
                                        >
                                          <Checkbox
                                            checked={
                                              personName2.indexOf(
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
                            <Col md={6}>
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
                            </Col>
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
                                label="CS No."
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
                                label="TPS No."
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
                        <Typography>Project Tower Detail</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Row>
                            <Col md={12}>
                              <FieldArray
                                name="project_tower_details"
                                render={(arrayHelpers) => (
                                  <div>
                                    <Label>Tower Details</Label>
                                    <Row>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="tower_name"
                                          name="tower_name"
                                          label="Tower Name"
                                          value={formProps.values.tower_name}
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="no_floors"
                                          name="no_floors"
                                          label="No. of Floor"
                                          value={formProps.values.no_floors}
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="no_lifts"
                                          name="no_lifts"
                                          label="No. of Lifts"
                                          value={formProps.values.no_lifts}
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="other_details"
                                          name="other_details"
                                          label="Other Details"
                                          value={
                                            formProps.values.other_details
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="floor_rise"
                                          name="floor_rise"
                                          label="Floor Rise"
                                          value={formProps.values.floor_rise}
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          type="date"
                                          size="small"
                                          variant="outlined"
                                          id="completion_date"
                                          name="completion_date"
                                          label="Completion Date"
                                          value={
                                            formProps.values.completion_date
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={3} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="project_stage_recommended"
                                          name="project_stage_recommended"
                                          label="Project Stage Recommended"
                                          value={
                                            formProps.values
                                              .project_stage_recommended
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={2} className="pt-1">
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="project_stage_actual"
                                          name="project_stage_actual"
                                          label="Project Stage Actual"
                                          value={
                                            formProps.values
                                              .project_stage_actual
                                          }
                                          onChange={formProps.handleChange}
                                        />
                                      </Col>
                                      <Col md={6}>
                                        <div>
                                          <FormControl
                                            sx={{ m: 1, width: 530 }}
                                          >
                                            <InputLabel id="demo-multiple-checkbox-label">
                                              Project Amenities
                                            </InputLabel>
                                            <Select
                                              labelId="demo-multiple-checkbox-label"
                                              id="demo-multiple-checkbox"
                                              multiple
                                              value={personName2}
                                              onChange={handleChange2}
                                              input={
                                                <OutlinedInput label="Tag" />
                                              }
                                              renderValue={(selected) =>
                                                selected.join(", ")
                                              }
                                              MenuProps={MenuProps}
                                            >
                                              {props?.dropdowns?.dropdowns
                                                ?.filter(
                                                  (field) =>
                                                    field?.name == "amenities"
                                                )[0]
                                                ?.drop_down_details?.map(
                                                  (field) => (
                                                    <MenuItem
                                                      key={field?.name}
                                                      value={field?.name}
                                                    >
                                                      <Checkbox
                                                        checked={
                                                          personName2.indexOf(
                                                            field?.name
                                                          ) > -1
                                                        }
                                                      />
                                                      <ListItemText
                                                        primary={field?.name}
                                                      />
                                                    </MenuItem>
                                                  )
                                                )}
                                            </Select>
                                          </FormControl>
                                        </div>
                                      </Col>

                                      <Col md={1} className="pt-1">
                                        <Button
                                          color="success"
                                          variant="contained"
                                          onClick={() => {
                                            arrayHelpers.push({
                                              tower_name:
                                                formProps.values.tower_name,
                                              no_floors:
                                                formProps.values.no_floors,
                                              no_lifts:
                                                formProps.values.no_lifts,
                                              other_details:
                                                formProps.values
                                                  .other_details,
                                              floor_rise:
                                                formProps.values.floor_rise,
                                              completion_date:
                                                formProps.values
                                                  .completion_date,
                                              project_stage_recommended:
                                                formProps.values
                                                  .project_stage_recommended,
                                              project_stage_actual:
                                                formProps.values
                                                  .project_stage_actual,
                                              tower_amenities: personName2,
                                              // ref_no: formProps.values.ref_no,
                                              // floors_no: formProps.values.floors_no,
                                              // remarks: formProps.values.remarks,
                                            });
                                            {
                                              formProps.setFieldValue(
                                                "tower_name",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "no_floors",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "no_lifts",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "other_details",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "floor_rise",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "project_stage_recommended",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "project_stage_actual",
                                                ""
                                              );
                                              // formProps.setFieldValue("completion_date", "");
                                              formProps.setFieldValue(
                                                "completion_date",
                                                moment().format("YYYY-MM-DD")
                                              );
                                              formProps.setFieldValue(
                                                "ref_no",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "floors_no",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "remarks",
                                                ""
                                              );
                                              formProps.setFieldValue(
                                                "tower_amenities",
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
                                    <Row>
                                      <Table
                                        size="sm"
                                        className="mt-3"
                                        bordered
                                        style={{ textAlign: "center" }}
                                      >
                                        <thead>
                                          <tr>
                                            {/* <th>Sr No.</th> */}
                                            <th>Tower Name</th>
                                            <th>No. of Floor</th>
                                            <th>no of lifts</th>
                                            <th>Other Details</th>
                                            <th>Floor rise</th>
                                            <th>Completion Date</th>
                                            <th>Project stage recommended</th>
                                            <th>Porject stage actual</th>
                                            <th>Delete</th>
                                          </tr>
                                        </thead>

                                        <tbody>
                                          {console.log(
                                            "project_tower_details",
                                            formProps?.values
                                              ?.project_tower_details
                                          )}
                                          {formProps?.values?.project_tower_details?.map(
                                            (document, index) => {
                                              return (
                                                <tr key={index}>
                                                  {/* <td>{index + 1}</td> */}

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      size="small"
                                                      label="Tower Name"
                                                      variant="outlined"
                                                      name={`document.${index}.tower_name`}
                                                      value={
                                                        document.tower_name
                                                      }
                                                      id="doc_name"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      // type="date"
                                                      size="small"
                                                      label="No. of Floor"
                                                      variant="outlined"
                                                      name={`document.${index}.no_floors`}
                                                      value={
                                                        document.no_floors
                                                      }
                                                      id="no_floors"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      // type="date"
                                                      size="small"
                                                      label="No. of Lift"
                                                      variant="outlined"
                                                      name={`document.${index}.no_lifts`}
                                                      value={
                                                        document.no_lifts
                                                      }
                                                      id="no_lifts"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      size="small"
                                                      label="Other Details"
                                                      variant="outlined"
                                                      name={`document.${index}.other_details`}
                                                      value={
                                                        document.other_details
                                                      }
                                                      id="ref_no"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      size="small"
                                                      label="Floor Rise"
                                                      variant="outlined"
                                                      name={`document.${index}.floor_rise`}
                                                      value={
                                                        document.floor_rise
                                                      }
                                                      id="floor_rise"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      type="date"
                                                      size="small"
                                                      label="Completion Date"
                                                      variant="outlined"
                                                      name={`document.${index}.completion_date`}
                                                      value={
                                                        document.completion_date
                                                      }
                                                      id="completion_date"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>

                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      size="small"
                                                      label="Project Stage Recommended"
                                                      variant="outlined"
                                                      name={`document.${index}.project_stage_recommended`}
                                                      value={
                                                        document.project_stage_recommended
                                                      }
                                                      id="project_stage_recommended"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
                                                  </td>
                                                  <td>
                                                    <TextField
                                                      fullWidth
                                                      // disabled
                                                      size="small"
                                                      label="Project Stage Actual"
                                                      variant="outlined"
                                                      name={`document.${index}.project_stage_actual`}
                                                      value={
                                                        document.project_stage_actual
                                                      }
                                                      id="project_stage_actual"
                                                      onChange={
                                                        formProps.handleChange
                                                      }
                                                    />
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
                                    </Row>
                                  </div>
                                )}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
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
                        <Typography>Project Flat Detail</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <FieldArray
                            name="project_flat_details"
                            render={(arrayHelpers) => (
                              <div>
                                <Label>Configuration Details</Label>
                                <Row>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="tower_name_config"
                                      name="tower_name_config"
                                      label="Tower Name"
                                      value={
                                        formProps.values.tower_name_config
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="config"
                                      name="config"
                                      label="Configuration"
                                      value={formProps.values.config}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="rera_carpet"
                                      name="rera_carpet"
                                      label="Rera Carpet"
                                      value={formProps.values.rera_carpet}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="number"
                                      variant="outlined"
                                      id="area_carpet"
                                      name="area_carpet"
                                      label="Area Carpet"
                                      value={formProps.values.area_carpet}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      type="number"
                                      size="small"
                                      variant="outlined"
                                      id="parking_rate"
                                      name="parking_rate"
                                      label="Parking Rate"
                                      value={formProps.values.parking_rate}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="floor_rise"
                                      name="floor_rise"
                                      label="Floor Rise"
                                      value={formProps.values.floor_rise}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="amenities2"
                                      name="amenities2"
                                      label="Amenities"
                                      value={formProps.values.amenities2}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="flat_type"
                                      name="flat_type"
                                      label="Flat Type"
                                      value={formProps.values.flat_type}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      type="number"
                                      variant="outlined"
                                      id="base_rate"
                                      name="base_rate"
                                      label="Base Rate"
                                      value={formProps.values.base_rate}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="value"
                                      name="value"
                                      label="Value"
                                      value={
                                        formProps.values?.rera_carpet *
                                          formProps.values?.base_rate +
                                        formProps.values?.parking_rate
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="remarks"
                                      name="remarks"
                                      label="Remarks"
                                      value={formProps.values.remarks}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2} className="pt-1">
                                    <TextField
                                      fullWidth
                                      type="date"
                                      size="small"
                                      variant="outlined"
                                      id="date"
                                      name="date"
                                      label="Date"
                                      value={formProps.values.date}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col md={1} className="pt-1">
                                    <Button
                                      color="success"
                                      variant="contained"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          config: formProps.values.config,
                                          tower_name_config:
                                            formProps.values
                                              .tower_name_config,
                                          rera_carpet:
                                            formProps.values.rera_carpet,
                                          area_carpet:
                                            formProps.values.area_carpet,
                                          parking_rate:
                                            formProps.values.parking_rate,
                                          floor_rise:
                                            formProps.values.floor_rise,
                                          amenities2:
                                            formProps.values.amenities2,
                                          base_rate:
                                            formProps.values.base_rate,
                                          value: formProps.values.value,
                                          remarks: formProps.values.remarks,
                                          date: formProps.values.date,
                                        });
                                      }}
                                      size="large"
                                    >
                                      <AddIcon fontSize="inherit" />
                                    </Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Table
                                    size="sm"
                                    className="mt-3"
                                    bordered
                                    style={{ textAlign: "center" }}
                                  >
                                    <thead>
                                      <tr>
                                        {/* <th>Sr No.</th> */}
                                        <th>Tower Name</th>
                                        <th>Configuration </th>
                                        <th>Rera Carpet</th>
                                        <th>Area Carpet</th>
                                        <th>Parking Rate</th>
                                        <th>Floor rise</th>
                                        <th>Amenities</th>
                                        <th>Base Rate</th>
                                        <th>Value</th>
                                        <th>Remarks</th>
                                        <th>Date</th>
                                        <th>Delete</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {/* {console.log(
                                "values",
                                formProps?.values?.project_flat_details
                              )} */}
                                      {formProps?.values?.project_flat_details?.map(
                                        (document, index) => {
                                          return (
                                            <tr key={index}>
                                              {/* <td>{index + 1}</td> */}

                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="Tower Name"
                                                  variant="outlined"
                                                  name={`document.${index}.tower_name_config`}
                                                  value={
                                                    document.tower_name_config
                                                  }
                                                  id="tower_name_config"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="config"
                                                  variant="outlined"
                                                  name={`document.${index}.config`}
                                                  value={document.config}
                                                  id="config"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>

                                              <td>
                                                <TextField
                                                  fullWidth
                                                  // type="date"
                                                  size="small"
                                                  label="Rera Carpet"
                                                  variant="outlined"
                                                  name={`document.${index}.rera_carpet`}
                                                  value={document.rera_carpet}
                                                  id="rera_carpet"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  // type="date"
                                                  size="small"
                                                  label="Area Carpet"
                                                  variant="outlined"
                                                  name={`document.${index}.area_carpet`}
                                                  value={document.area_carpet}
                                                  id="area_carpet"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="Parking Rate"
                                                  variant="outlined"
                                                  name={`document.${index}.parking_rate`}
                                                  value={
                                                    document.parking_rate
                                                  }
                                                  id="parking_rate"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="Floor Rise"
                                                  variant="outlined"
                                                  name={`document.${index}.floor_rise`}
                                                  value={document.floor_rise}
                                                  id="floor_rise"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="amenities"
                                                  variant="outlined"
                                                  name={`document.${index}.amenities2`}
                                                  value={document.amenities2}
                                                  id="amenities2"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="Base Rate"
                                                  variant="outlined"
                                                  name={`document.${index}.base_rate`}
                                                  value={document.base_rate}
                                                  id="base_rate"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>

                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="Value"
                                                  variant="outlined"
                                                  name={`document.${index}.value`}
                                                  value={document.value}
                                                  id="value"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  size="small"
                                                  label="Remarks"
                                                  variant="outlined"
                                                  name={`document.${index}.remarks`}
                                                  value={document.remarks}
                                                  id="remarks"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <TextField
                                                  fullWidth
                                                  type="date"
                                                  size="small"
                                                  label="Date"
                                                  variant="outlined"
                                                  name={`document.${index}.date`}
                                                  value={document.date}
                                                  id="date"
                                                  onChange={
                                                    formProps.handleChange
                                                  }
                                                />
                                              </td>
                                              {/* <td>
                              <Button
                                size="small"
                                type="submit"
                                target="_blank"
                                color="success"
                                variant="contained"
                                href={`https://lvpl.in/librabackend/storage/app/public/DocumentDetails/${document?.document_file_flat}`}
                                alt=""
                              >
                                View
                              </Button>
                            </td> */}

                                              <td>
                                                <Button
                                                  color="error"
                                                  size="large"
                                                  variant="outlined"
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
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
                                </Row>
                                <Row>
                                  <Col md={4} className="pb-4">
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      label="Vicinity Rate Range"
                                      id="vicinity_rate"
                                      name="vicinity_rate"
                                      value={formProps.values.vicinity_rate}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col md={4} className="pb-4">
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      label="Flat Rate Range"
                                      id="flat_rate"
                                      name="flat_rate"
                                      value={formProps.values.flat_rate}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  {/* Continue adding the remaining fields using the same pattern */}
                                  <Col md={4} className="pb-4">
                                    <TextField
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      label="Recommended Rate"
                                      id="recommended_rate"
                                      name="recommended_rate"
                                      value={
                                        formProps.values.recommended_rate
                                      }
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            )}
                          />
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
                        <Typography>
                          Project Document Detail (Layout details)
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <FieldArray
                            name="project_details"
                            render={(arrayHelpers) => (
                              <div>
                                <Label>Document Details</Label>
                                <Row>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="doc_name"
                                      name="doc_name"
                                      label="Document name"
                                      value={formProps.values.doc_name}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      type="date"
                                      size="small"
                                      variant="outlined"
                                      id="date"
                                      name="date"
                                      label="Date"
                                      value={formProps.values.date}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="ref_no"
                                      name="ref_no"
                                      label="Reference number"
                                      value={formProps.values.ref_no}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="floors_no"
                                      name="floors_no"
                                      label="Outward No."
                                      value={formProps.values.floors_no}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>
                                  <Col md={2}>
                                    <TextField
                                      fullWidth
                                      size="small"
                                      variant="outlined"
                                      id="remarks"
                                      name="remarks"
                                      label="Remarks"
                                      value={formProps.values.remarks}
                                      onChange={formProps.handleChange}
                                    />
                                  </Col>

                                  <Col>
                                    <Button
                                      color="success"
                                      variant="contained"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          doc_name: formProps.values.doc_name,
                                          date: formProps.values.date,
                                          ref_no: formProps.values.ref_no,
                                          floors_no:
                                            formProps.values.floors_no,
                                          remarks: formProps.values.remarks,
                                        });
                                        {
                                          formProps.setFieldValue(
                                            "doc_name",
                                            ""
                                          );
                                          formProps.setFieldValue(
                                            "date",
                                            moment().format("YYYY-MM-DD")
                                          );
                                          formProps.setFieldValue(
                                            "ref_no",
                                            ""
                                          );
                                          formProps.setFieldValue(
                                            "floors_no",
                                            ""
                                          );
                                          formProps.setFieldValue(
                                            "remarks",
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
                                      <th>Document name</th>
                                      <th>Date</th>
                                      <th>Reference number</th>
                                      <th>Outward No.</th>
                                      <th>Remarks</th>
                                      <th>Delete</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {/* {console.log(
                              "values",
                              formProps?.values?.project_details
                            )} */}
                                    {formProps?.values?.project_details?.map(
                                      (document, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>{index + 1}</td>

                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Document name"
                                                variant="outlined"
                                                name={`document.${index}.doc_name`}
                                                value={document.doc_name}
                                                id="doc_name"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>

                                            <td>
                                              <TextField
                                                fullWidth
                                                type="date"
                                                size="small"
                                                label="Date"
                                                variant="outlined"
                                                name={`document.${index}.date`}
                                                value={document.date}
                                                id="date"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Reference number"
                                                variant="outlined"
                                                name={`document.${index}.ref_no`}
                                                value={document.ref_no}
                                                id="ref_no"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>
                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Outward No."
                                                variant="outlined"
                                                name={`document.${index}.floors_no`}
                                                value={document.floors_no}
                                                id="floors_no"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>

                                            <td>
                                              <TextField
                                                fullWidth
                                                size="small"
                                                label="Remarks"
                                                variant="outlined"
                                                name={`document.${index}.remarks`}
                                                value={document.remarks}
                                                id="remarks"
                                                onChange={
                                                  formProps.handleChange
                                                }
                                              />
                                            </td>

                                            <td>
                                              <Button
                                                color="error"
                                                size="large"
                                                variant="outlined"
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
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
                          Project Localities & Neighbourhood
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

                {/* //*documents */}

                {/* //*Builder */}

                <Divider />
                <Label>Project Report Form</Label>
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
                            <Col md={12}>
                              <FieldArray
                                name="civil_amenities"
                                render={(arrayHelpers) => (
                                  <div>
                                    <Row>
                                      <Col md={5}>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="bus_station"
                                          name="bus_station"
                                          label="Near Bus station"
                                          value={formProps.values.bus_station}
                                          onChange={formProps.handleChange}
                                          error={
                                            formProps.touched.bus_station &&
                                            Boolean(
                                              formProps.errors.bus_station
                                            )
                                          }
                                          helperText={
                                            formProps.touched.bus_station &&
                                            formProps.errors.bus_station
                                          }
                                        />
                                      </Col>
                                      <Col md={5}>
                                        <TextField
                                          fullWidth
                                          size="small"
                                          variant="outlined"
                                          id="train_station"
                                          name="train_station"
                                          label="Near Railway station"
                                          value={
                                            formProps.values.train_station
                                          }
                                          onChange={formProps.handleChange}
                                          error={
                                            formProps.touched.train_station &&
                                            Boolean(
                                              formProps.errors.train_station
                                            )
                                          }
                                          helperText={
                                            formProps.touched.train_station &&
                                            formProps.errors.train_station
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
                                                ?.civil_amenities.length == 0
                                            ) {
                                              arrayHelpers.push({
                                                id: formProps?.values
                                                  ?.civil_amenities.length,
                                                bus_station:
                                                  formProps.values
                                                    .bus_station,
                                                train_station:
                                                  formProps.values
                                                    .train_station,
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
                                          <th>Near Bus station</th>
                                          <th>Near Railway station</th>
                                          <th>Delete</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {formProps?.values?.civil_amenities?.map(
                                          (area, index) => {
                                            return (
                                              <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                  <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Near Railway station"
                                                    variant="outlined"
                                                    name={`civil_amenities.${index}.bus_station`}
                                                    value={area.bus_station}
                                                    id="email"
                                                    onChange={
                                                      formProps.handleChange
                                                    }
                                                  />
                                                </td>
                                                <td>
                                                  <TextField
                                                    fullWidth
                                                    size="small"
                                                    label="Near Bus station"
                                                    variant="outlined"
                                                    name={`civil_amenities.${index}.train_station`}
                                                    value={area.train_station}
                                                    id="train_station"
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
                  <Col md={12} className="pb-4">
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
                  </Col>

                  <Col md={12} className="pb-4">
                    <Accordion
                      expanded={expanded === "Specification"}
                      onChange={handleExpand("Specification")}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                      >
                        <Typography>Specification within Project</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Label>Specification within Project</Label>
                          <Row className="pt-4 pb-2">
                            <Col md={12}>
                              <FieldArray
                                name="amenitites_flat"
                                render={(arrayHelpers) => (
                                  <div>
                                    <Row>
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

                  <Col md={12} className="pb-4">
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
                  </Col>

                  <Col md={12} className="pb-4">
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
                  </Col>
                  <Col md={12} className="">
                    <Accordion
                      expanded={expanded === "Declaration"}
                      onChange={handleExpand("Declaration")}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                      >
                        <Typography>Declaration & Remark</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <Label>Declaration & Remark</Label>
                          <Row>
                            <Col md={12}>
                              <Label>Declaration</Label>
                              <JoditEditor
                                id="declaration_details"
                                label="Declaration *"
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
                                        {console.log(
                                          "values",
                                          formProps?.values?.special_remarks
                                        )}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postProjects2: (data, user) =>
      dispatch(postProjects2(data, user)),
    DeleteSpecial_remarks: (data) => dispatch(DeleteSpecial_remarks(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DedupeProjects);
