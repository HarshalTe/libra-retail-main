import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

//*Actions
import { postPropertiesData } from "../../../../Redux/Creators/PropertiesCreators";

//*Components
import DedupeModal from "../Dedupe/DedupeModal";
import CreateProjects from "../../Projects/CreateProjects";
import DedupeTable from "../Dedupe/DedupeTable";
import SendMail from "./SendMail";
import { getDropdownsList } from "../../../../Redux/Creators/DropdownCreators";

function InitiatedCasesForm(props) {
  //*
  const initiated_case_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "initiated_case_page"
  );
  let project_page = props?.login?.login?.user?.rights.find(
    (o) => o.page.name === "project_page"
  );
  const token = props.login?.login?.token;

  const [modal, setModal] = React.useState(false);
  const [personName2, setPersonName2] = React.useState(
    props?.property?.property?.specification?.property_authority || []
  );

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [files, setFiles] = React.useState({});

  const handleFileChange = (event) => {
    const { name, files: selectedFiles } = event.target;
    const file = selectedFiles[0];
    if (file) {
      setFiles(prevFiles => ({
        ...prevFiles,
        [name]: {
          file,
          fileURL: URL.createObjectURL(file)
        }
      }));
    }
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

  function convertToCamelCase(str) {
    // Split the string into words
    const words = str.split(" ");

    // Convert the first word to lowercase
    const firstWord = words[0].toLowerCase();

    // Convert the remaining words to camel case
    const camelCaseWords = words.slice(1).map((word) => {
      // Capitalize the first letter of each word
      const capitalizedWord = word.charAt(0).toLowerCase() + word.slice(1);
      return capitalizedWord;
    });

    // Join the words together and return the result
    const result = [firstWord, ...camelCaseWords].join("_");
    return result;
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getDropdownsList(data);
  };

  let dropdown = props?.dropdowns?.dropdowns?.filter(
    (field) => field?.name == "Document Details"
  )[0]?.drop_down_details;
  const convertedData = dropdown?.map((item) => ({
    document_name: item?.name,
    status: 0,
  }));
  console.log("dropdown", dropdown, convertedData);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values In Create form", values);

    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      user_id: props.login?.login?.user?.id,
      employee_id: props.login?.login?.user?.id,
      status: props.login?.login?.user?.status,
      prospect_no: values.prospect_no,
      project_id: values.project_id,
      customer_name: values.customer_name,
      surname: values.surname,
      contact_person_name: values.contact_person_name,
      contact_person_cell_no: values.contact_person_cell_no,
      location: values.location,
      legal_address: values.legal_address,
      state: values.state,
      authority: values.authority,
      city: values.city,
      pincode: values.pincode,
      country: values.country,
      tp_no: values.tp_no,
      survey_no: values.survey_no,
      fp_no: values.fp_no,
      sp_no: values.sp_no,
      op_no: values.op_no,
      plot_no: values.plot_no,
      block_no: values.block_no,
      flat_no: values.flat_no,
      khasra_no: values.khasra_no,
      nearby_landmark: values.nearby_landmark,
      latitude: values.latitude,
      longitude: values.longitude,
      postal_address: values.postal_address,
      remark: values.remark,
      remark2: values.remark2,
      priority: values.priority,
      vertical: values.vertical,
      product: values.product,
      bank_vertical_id: values.bank_vertical_id,
      bank_product_id: values.bank_product_id,
      branch_name: values.branch_name,
      branch_id: values.branch_id,
      bank_id: values.bank_id,
      bank_no: values.bank_no,
      configuration: values.configuration,
      // scheduled_date: values.scheduled_date,
      scheduled_date: values.scheduled_date,
      district_name: values.district_name,
      // is_online_upload: "0",
      document_details: [
        { document_name: "Pan Card", status: values.pancard_status },
        { document_name: "Adhar Card", status: values.adharcard_status },
        { document_name: "Tax Details", status: values.taxdetails_status },
        { document_name: "Index XI", status: values.index11_status },
        { document_name: "Sale Deed", status: values.saledeed_status },
        {
          document_name: "Sale Certificate",
          status: values.salecertificate_status,
        },
      ],
    };

    console.log("submit data", data);
    setModal(true);
    setSubmitting(false);
  };
  return (
    <div>
      <br />
      <Card>
        <CardHeader className="bg-info text-white">
          <Row>
            <Col md={10}></Col>
            <Col md={2}>
              <Button color="success" variant="contained" size="small">
                Upload Excel
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              //* Customer Dets
              customer_name: "",
              surname: "",
              contact_person_name: "",
              contact_person_cell_no: "",
              location: "",
              legal_address: "",
              state: "",
              authority: "",
              city: "",
              pincode: "",
              country: "India",
              tp_no: "",
              survey_no: "",
              fp_no: "",
              sp_no: "",
              op_no: "",
              plot_no: "",
              block_no: "",
              flat_no: "",
              khasra_no: "",
              nearby_landmark: "",
              latitude: "",
              longitude: "",
              postal_address: "",
              property_type: "",
              configuration: "",
              remark: "",
              remark2: "",
              priority: "",

              //!

              //* Bank Dets
              branch_name: "",
              branch_id: "",
              bank_id: "",
              bank_no: "",
              prospect_no: "",
              //*
              project_name: "",
              project_id: "",
              //*
              documents_submitted: "",
              scheduled_date: moment().format("YYYY-MM-DD"),

              vertical: "",
              total: "",
              product: "",
              //*
              bank_vertical_id: "",
              bank_product_id: "",
              //*
              document_attachment_name: "",
              file_upload: "",
              district_name: "",
              village: "",
              //!

              //*status

              pancard_status: 0,
              adharcard_status: 0,
              taxdetails_status: 0,
              index11_status: 0,
              saledeed_status: 0,
              salecertificate_status: 0,
              document_details: convertedData,
              project_data: "",

              project_tower_details_id: "",
              project_tower_details: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              branch_name: Yup.string().required("Branch Name is required"),
              project_id: Yup.string().required("Project is required"),
              country: Yup.string().required("Country is required"),
              tp_no: Yup.string().required("TP Number is required"),
              survey_no: Yup.string().required("Survey Number is required"),
              state: Yup.string().required("State is required"),
              // authority: Yup.string().required("Authority is required"),
              city: Yup.string().required("city is required"),
              prospect_no: Yup.string().required("prospect_no is required"),
              customer_name: Yup.string().required("Customer Name is required"),

              nearby_landmark: Yup.string().required(
                "Nearby Landmark is required"
              ),

              scheduled_date: Yup.string().required(
                "Inspection Date & Time is required"
              ),
              remark: Yup.string().required("Remarks is required"),

              bank_vertical_id: Yup.string().required("Vertical is required"),
              bank_product_id: Yup.string().required("Product is required"),
              priority: Yup.string().required("Priority is required"),
            })}
          >
            {(formProps) => {
              const branchProps = {
                options: props?.branches?.isLoading
                  ? []
                  : props?.branches?.branches?.data?.map((branch) => branch),
              };

              const projectsProps = {
                options: props?.projects?.isLoading
                  ? []
                  : props?.projects?.projects?.data?.map((project) => project),
              };
              // console.log("projectsProps",projectsProps)

              const verticalsProps = {
                options: props?.bankVerticals?.isLoading
                  ? []
                  : props.bankVerticals.bankVerticals?.data
                      ?.filter(
                        (product) =>
                          formProps?.values.branch_name ==
                          product.branch?.branch_name
                      )
                      ?.map((vertical) => vertical),
              };
              const productProps = {
                options:
                  formProps.values.bank_vertical_id == ""
                    ? []
                    : props?.bankProducts?.bankProducts?.data
                        ?.filter(
                          (product) =>
                            formProps.values.bank_vertical_id ==
                            product.bank_vertical_id
                        )
                        ?.map((product) => product),
              };

              return (
                <Form>
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
                    {/* <Divider /> */}
                    <ModalBody>
                      <DedupeTable data={formProps.values} />
                    </ModalBody>
                  </Modal>
                  <Typography variant={"h4"}>Customer Details</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="prospect_no"
                        name="prospect_no"
                        label="Prospect No *"
                        variant="standard"
                        value={formProps.values.prospect_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.prospect_no &&
                          Boolean(formProps.errors.prospect_no)
                        }
                        helperText={
                          formProps.touched.prospect_no &&
                          formProps.errors.prospect_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="customer_name"
                        name="customer_name"
                        label="Customer Name *"
                        variant="standard"
                        value={formProps.values.customer_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.customer_name &&
                          Boolean(formProps.errors.customer_name)
                        }
                        helperText={
                          formProps.touched.customer_name &&
                          formProps.errors.customer_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="surname"
                        name="surname"
                        label="Surname"
                        variant="standard"
                        value={formProps.values.surname}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.surname &&
                          Boolean(formProps.errors.surname)
                        }
                        helperText={
                          formProps.touched.surname && formProps.errors.surname
                        }
                      />
                    </Col>
                    <Col md={9} className="pb-4">
                      <>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={projectsProps.options}
                          getOptionLabel={(project) =>
                            `${project?.project_name} ( ${project?.cts_no}, ${
                              project?.fp_no
                            },${project?.pincode} ${
                              project.is_npa == 1 ? ",Project Is NPA" : ""
                            } )`
                          }
                          onChange={(e, value) => {
                            formProps.setFieldValue(
                              "project_id",
                              value?.id || ""
                            );
                            formProps.setFieldValue(
                              "project_data",
                              value || ""
                            );
                            formProps.setFieldValue(
                              "pincode",
                              value.pincode || ""
                            );
                            formProps.setFieldValue(
                              "legal_address",
                              value.legal_address || ""
                            );
                            formProps.setFieldValue(
                              "postal_address",
                              value.address || ""
                            );
                            formProps.setFieldValue("city", value.city || "");
                            formProps.setFieldValue(
                              "location",
                              value.location || ""
                            );
                            formProps.setFieldValue(
                              "country",
                              value.country || ""
                            );
                            formProps.setFieldValue("tp_no", value.tp_no || "");
                            formProps.setFieldValue(
                              "survey_no",
                              value.survey_no || ""
                            );
                            formProps.setFieldValue("fp_no", value.fp_no || "");
                            formProps.setFieldValue("sp_no", value.sp_no || "");
                            formProps.setFieldValue("op_no", value.op_no || "");
                            formProps.setFieldValue(
                              "plot_no",
                              value.plot_no || ""
                            );
                            formProps.setFieldValue(
                              "block_no",
                              value.block_no || ""
                            );
                            formProps.setFieldValue(
                              "flat_no",
                              value.flat_no || ""
                            );
                            formProps.setFieldValue(
                              "khasra_no",
                              value.khasra_no || ""
                            );
                            formProps.setFieldValue(
                              "latitude",
                              value.latitidue || ""
                            );
                            formProps.setFieldValue(
                              "longitude",
                              value.longitude || ""
                            );
                            formProps.setFieldValue("state", value.state || "");
                            formProps.setFieldValue(
                              "nearby_landmark",
                              value.nearby_landmark || ""
                            );
                            formProps.setFieldValue(
                              "project_tower_details",
                              value.project_tower_details || ""
                            );
                            formProps.setFieldValue(
                              "district_name",
                              value.district || ""
                            );
                            formProps.setFieldValue(
                              "village",
                              value.village || ""
                            );
                          }}
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.project_id &&
                                  formProps.errors.project_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.project_id &&
                                formProps.errors.project_id
                              }
                              label="Project *"
                              name="project_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                    <Col md={2} className="pb-4 pr-5">
                      {project_page.create_status === 1 ? (
                        <CreateProjects />
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col md={4}>
                      <Autocomplete
                        fullWidth
                        id="tower-autocomplete"
                        options={formProps.values.project_tower_details || []}
                        getOptionLabel={(option) => option?.tower_name || ""}
                        value={formProps.values.project_tower_details_id}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "project_tower_details_id",
                            value?.id || ""
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.project_tower_details_id &&
                                formProps.errors.project_tower_details_id
                            )}
                            helperText={
                              formProps.touched.project_tower_details_id &&
                              formProps.errors.project_tower_details_id
                            }
                            label="Tower"
                            name="project_tower_details_id"
                            variant="outlined"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4}>
                      <TextField
                        fullWidth
                        id="contact_person_name"
                        name="contact_person_name"
                        label="Contact Person Name"
                        variant="standard"
                        value={formProps.values.contact_person_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.contact_person_name &&
                          Boolean(formProps.errors.contact_person_name)
                        }
                        helperText={
                          formProps.touched.contact_person_name &&
                          formProps.errors.contact_person_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="contact_person_cell_no"
                        name="contact_person_cell_no"
                        label="Contact Person Cell No"
                        variant="standard"
                        value={formProps.values.contact_person_cell_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.contact_person_cell_no &&
                          Boolean(formProps.errors.contact_person_cell_no)
                        }
                        helperText={
                          formProps.touched.contact_person_cell_no &&
                          formProps.errors.contact_person_cell_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="location"
                        name="location"
                        label="Location/Area"
                        variant="standard"
                        value={formProps.values.location}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.location &&
                          Boolean(formProps.errors.location)
                        }
                        helperText={
                          formProps.touched.location &&
                          formProps.errors.location
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="pincode"
                        name="pincode"
                        label="Pin Code"
                        variant="standard"
                        value={formProps.values.pincode}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City *"
                        variant="standard"
                        value={formProps.values.city}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.city &&
                          Boolean(formProps.errors.city)
                        }
                        helperText={
                          formProps.touched.city && formProps.errors.city
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="district_name"
                        name="district_name"
                        label="District *"
                        variant="standard"
                        value={formProps.values.district_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.district_name &&
                          Boolean(formProps.errors.district_name)
                        }
                        helperText={
                          formProps.touched.district_name &&
                          formProps.errors.district_name
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="state"
                        name="state"
                        label="State *"
                        variant="standard"
                        value={formProps.values.state}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.state &&
                          Boolean(formProps.errors.state)
                        }
                        helperText={
                          formProps.touched.state && formProps.errors.state
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="country"
                        name="country"
                        label="Country *"
                        variant="standard"
                        value={formProps.values.country}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.country &&
                          Boolean(formProps.errors.country)
                        }
                        helperText={
                          formProps.touched.country && formProps.errors.country
                        }
                      />
                    </Col>

                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="legal_address"
                        name="legal_address"
                        label="Legal Address"
                        variant="standard"
                        value={formProps.values.legal_address}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="postal_address"
                        name="postal_address"
                        label="Postal Address"
                        variant="standard"
                        value={formProps.values.postal_address}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="address_as_per_initation"
                        name="address_as_per_initation"
                        label="Address as per Initiation"
                        variant="standard"
                        value={formProps.values.address_as_per_initation}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    {/* <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="city"
                        name="city"
                        label="City *"
                        variant="standard"
                        value={formProps.values.city}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.city &&
                          Boolean(formProps.errors.city)
                        }
                        helperText={
                          formProps.touched.city && formProps.errors.city
                        }
                      />
                    </Col> */}
                    {/* <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="property_type"
                      name="property_type"
                      label="Property Type"
                      variant="standard"
                      value={formProps.values.property_type}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.property_type &&
                        Boolean(formProps.errors.property_type)
                      }
                      helperText={
                        formProps.touched.property_type &&
                        formProps.errors.property_type
                      }
                    />
                  </Col> */}

                    <Col md={4} className="pb-4">
                      <Autocomplete
                        fullWidth
                        id="property_type-autocomplete"
                        options={
                          props?.dropdowns?.dropdowns?.filter(
                            (field) => field?.name === "Property Type"
                          )[0]?.drop_down_details || []
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "property_type",
                            value?.name || ""
                          );
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.property_type &&
                                formProps.errors.property_type
                            )}
                            helperText={
                              formProps.touched.property_type &&
                              formProps.errors.property_type
                            }
                            label="Property Type"
                            name="property_type"
                            variant="outlined"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4} className="pb-4">
                      <Autocomplete
                        fullWidth
                        id="configuration-autocomplete"
                        options={
                          props?.dropdowns?.dropdowns?.filter(
                            (field) => field?.name === "Configuration"
                          )[0]?.drop_down_details || []
                        }
                        getOptionLabel={(option) => option?.name || ""}
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "configuration",
                            value?.name || ""
                          );
                        }}
                        onOpen={formProps.handleBlur}
                        includeInputInList
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              formProps.touched.configuration &&
                                formProps.errors.configuration
                            )}
                            helperText={
                              formProps.touched.configuration &&
                              formProps.errors.configuration
                            }
                            label="Configuration"
                            name="configuration"
                            variant="outlined"
                          />
                        )}
                      />
                    </Col>

                    <Col md={4}>
                      <div>
                        <FormControl sx={{ m: 1, width: 330 }}>
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
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                          >
                            {props?.dropdowns?.dropdowns
                              ?.filter(
                                (field) => field?.name == "approving_authority"
                              )[0]
                              ?.drop_down_details?.map((field) => (
                                <MenuItem key={field?.name} value={field?.name}>
                                  <Checkbox
                                    checked={
                                      personName2.indexOf(field?.name) > -1
                                    }
                                  />
                                  <ListItemText primary={field?.name} />
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="flat_no"
                        name="flat_no"
                        label="Flat No"
                        variant="standard"
                        value={formProps.values.flat_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="tp_no"
                        name="tp_no"
                        label="TP No *"
                        variant="standard"
                        value={formProps.values.tp_no}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.tp_no &&
                          Boolean(formProps.errors.tp_no)
                        }
                        helperText={
                          formProps.touched.tp_no && formProps.errors.tp_no
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="survey_no"
                        name="survey_no"
                        label="Survey No *"
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
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
                        variant="standard"
                        value={formProps.values.khasra_no}
                        onChange={formProps.handleChange}
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="nearby_landmark"
                        name="nearby_landmark"
                        label="Nearby Landmark *"
                        variant="standard"
                        value={formProps.values.nearby_landmark}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.nearby_landmark &&
                          Boolean(formProps.errors.nearby_landmark)
                        }
                        helperText={
                          formProps.touched.nearby_landmark &&
                          formProps.errors.nearby_landmark
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="latitude"
                        name="latitude"
                        label="Latitude"
                        variant="standard"
                        value={formProps.values.latitude}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.latitude &&
                          Boolean(formProps.errors.latitude)
                        }
                        helperText={
                          formProps.touched.latitude &&
                          formProps.errors.latitude
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        id="longitude"
                        name="longitude"
                        label="Longitude"
                        variant="standard"
                        value={formProps.values.longitude}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.longitude &&
                          Boolean(formProps.errors.longitude)
                        }
                        helperText={
                          formProps.touched.longitude &&
                          formProps.errors.longitude
                        }
                      />
                    </Col>
                    <Col md={4} className="pb-4">
                      <TextField
                        fullWidth
                        select
                        id="priority"
                        name="priority"
                        label=" Case Priority"
                        variant="standard"
                        value={formProps.values.priority}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.priority &&
                          Boolean(formProps.errors.priority)
                        }
                        helperText={
                          formProps.touched.priority &&
                          formProps.errors.priority
                        }
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </TextField>
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="remark"
                        name="remark"
                        label="Special instructions to engineer *"
                        variant="standard"
                        value={formProps.values.remark}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.remark &&
                          Boolean(formProps.errors.remark)
                        }
                        helperText={
                          formProps.touched.remark && formProps.errors.remark
                        }
                      />
                    </Col>
                    <Col md={12} className="pb-4">
                      <TextField
                        fullWidth
                        id="remark2"
                        name="remark2"
                        label="Special instructions to Admin  *"
                        variant="standard"
                        value={formProps.values.remark2}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.remark2 &&
                          Boolean(formProps.errors.remark2)
                        }
                        helperText={
                          formProps.touched.remark2 && formProps.errors.remark2
                        }
                      />
                    </Col>
                  </Row>
                  <Typography variant={"h6"}>Bank Details</Typography>
                  <Divider />
                  <br />
                  <Row className="form-group">
                    <Col md={6} className="pb-4">
                      {/* <FormLabel>Branch name</FormLabel> */}
                      <>
                        <Autocomplete
                          id="branch-autocomplete"
                          options={branchProps.options}
                          getOptionLabel={(branch) =>
                            // `${project?.project_name} ${project?.id}`
                            branch?.branch_name
                          }
                          onChange={(e, value) => {
                            formProps.setFieldValue(
                              "branch_name",
                              value?.branch_name || ""
                            );
                            formProps.setFieldValue(
                              "branch_id",
                              value?.id || ""
                            );
                            formProps.setFieldValue(
                              "bank_id",
                              value?.bank?.id || ""
                            );
                            formProps.setFieldValue(
                              "bank_no",
                              value?.bank?.bank_code || ""
                            );
                          }}
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.branch_name &&
                                  formProps.errors.branch_name
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.branch_name &&
                                formProps.errors.branch_name
                              }
                              label="Branch Name *"
                              name="branch_name"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>

                    <Col md={6} className="pb-4">
                      <TextField
                        fullWidth
                        id="scheduled_date"
                        name="scheduled_date"
                        size="medium"
                        // placeholder="Inspection Date & Time *"
                        label="Inspection Date & Time *"
                        variant="outlined"
                        shrink={true}
                        type="date"
                        value={formProps.values.scheduled_date}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.scheduled_date &&
                          Boolean(formProps.errors.scheduled_date)
                        }
                        helperText={
                          formProps.touched.scheduled_date &&
                          formProps.errors.scheduled_date
                        }
                      />
                    </Col>

                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_vertical_id"
                          options={verticalsProps.options}
                          getOptionLabel={(vertical) =>
                            // `${project?.project_name} ${project?.id}`
                            vertical?.name
                          }
                          onChange={(e, value) =>
                            formProps.setFieldValue(
                              "bank_vertical_id",
                              value?.id || ""
                            )
                          }
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_vertical_id &&
                                  formProps.errors.bank_vertical_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_vertical_id &&
                                formProps.errors.bank_vertical_id
                              }
                              label="Bank Vertical *"
                              name="bank_vertical_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>

                    <Col md={6} className="pb-4">
                      <>
                        <Autocomplete
                          id="bank_product_id"
                          options={productProps.options}
                          getOptionLabel={(product) =>
                            // `${project?.project_name} ${project?.id}`
                            product?.name
                          }
                          onChange={(e, value) => {
                            console.log("bank_product_id", value);
                            formProps.setFieldValue("total", value?.rate || "");
                            formProps.setFieldValue(
                              "bank_product_id",
                              value?.id || ""
                            );
                          }}
                          onOpen={formProps.handleBlur}
                          includeInputInList
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={Boolean(
                                formProps.touched.bank_product_id &&
                                  formProps.errors.bank_product_id
                              )}
                              fullWidth
                              helperText={
                                formProps.touched.bank_product_id &&
                                formProps.errors.bank_product_id
                              }
                              label="Bank Product *"
                              name="bank_product_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                    {/* <Col md={6} className="pb-4">
                      <TextField
                        fullWidth
                        id="total"
                        name="total"
                        label="Total"
                        variant="standard"
                        value={formProps.values.total}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.total &&
                          Boolean(formProps.errors.total)
                        }
                        helperText={
                          formProps.touched.total && formProps.errors.total
                        }
                      />
                    </Col> */}
                    <Col md={6}>
                      <Label>Fees Approvel Upload</Label>
                      <input type="file" name="upload" onChange={handleFileChange} />
                      {/* <TextField
                        fullWidth
                        name="upload"
                        variant="outlined"
                        margin="normal"
                        onChange={(e, value) => {
                          formProps.setFieldValue(
                            "upload",
                            e.currentTarget.files[0]
                          );
                        }}
                        type="file"
                        error={
                          formProps.touched.upload &&
                          Boolean(formProps.errors.upload)
                        }
                        helperText={
                          formProps.touched.upload && formProps.errors.upload
                        }
                      /> */}
                    </Col>
                    <Col md={6}>
                    {files.upload && (
          <Button
            variant="contained"
            color="primary"
            component="a"
            href={files.upload.fileURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open File in New Tab
          </Button>
        )}</Col>
                  </Row>
                  <Row className="">
                    <Col md={5}>
                      <strong className="">
                        Mail To Client For Pending / Recived Document
                      </strong>

                      <Switch
                        className=""
                        // {...label}
                        defaultChecked
                        size="small"
                        color="success"
                      />
                    </Col>

                    <Col>
                      <SendMail />
                      {/* <Button size="small" variant="contained" color="warning">
                        Edit
                      </Button> */}
                    </Col>
                  </Row>

                  <Divider />
                  <br />

                  {/* <strong>Documents Submitted</strong> */}

                  {/* <Divider /> */}
                  <Row className="pt-4 pb-2">
                    <Col md={12}>
                      <FieldArray
                        name="document_details"
                        render={(arrayHelpers) => (
                          <div>
                            <Table size="sm" className="mt-3">
                              <tbody>
                                {console.log(
                                  "values",
                                  formProps?.values?.document_details
                                )}
                                {formProps?.values?.document_details?.map(
                                  (document_details, index) => {
                                    console.log(
                                      "document_details",
                                      document_details
                                    );
                                    return (
                                      <tr key={index}>
                                        <td>
                                          {document_details?.document_name}
                                        </td>

                                        <td>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                id="status"
                                                name={`document_details.${index}.status`}
                                                value={document_details.status}
                                                checked={
                                                  document_details.status == 1
                                                    ? true
                                                    : false
                                                }
                                                onChange={(event) => {
                                                  event.target.value == 1
                                                    ? formProps.setFieldValue(
                                                        `document_details.${index}.status`,
                                                        0
                                                      )
                                                    : formProps.setFieldValue(
                                                        `document_details.${index}.status`,
                                                        1
                                                      );
                                                }}
                                              />
                                            }
                                            label={
                                              document_details?.document_name
                                            }
                                          />
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
                  {/* <DocumentsUpload/> */}

                  {initiated_case_page.create_status === 1 ? (
                    <DedupeModal
                      type="submit"
                      setSubmitting={formProps.setSubmitting}
                      data={formProps.values}
                      data2={formProps}
                    />
                  ) : (
                    ""
                  )}
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    branches: state.branches,
    projects: state.projects,
    bankVerticals: state.bankVerticals,
    bankProducts: state.bankProducts,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postPropertiesData: (data) => dispatch(postPropertiesData(data)),
    getDropdownsList: (data) => dispatch(getDropdownsList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitiatedCasesForm);
