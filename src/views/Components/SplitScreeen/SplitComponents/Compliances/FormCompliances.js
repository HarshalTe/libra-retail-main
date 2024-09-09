import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Table,
  ListGroupItem,
} from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";

// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

//*Actions
import { editComplianceData } from "../../../../../Redux/Creators/CompliancesCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";
import { getCompliance } from "../../../../../Redux/Creators/CompliancesMasterCreators";
import { editComplianceRemarkData } from "../../../../../Redux/Creators/CompliancesRemarksCreators";
import UpdateRemarks from "./UpdateRemarks";
import { getDocumentPage } from "../../../../../Redux/Creators/IniciateDocumentCreators";
import { getMatrixsList } from "../../../../../Redux/Creators/UserMatrixCreators";

function FormCompliances(props) {
  const token = props.login?.login?.token;
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const token = props.login?.login?.token;

    let data = {
      token: token,
    };
    props.getCompliance(data);
    props.getDocumentPage(data);
    props.getMatrixsList(data);
  };

  const projectsProps = props?.projects?.isLoading
    ? []
    : props?.projects?.projects?.data?.find(
        (row) => row.id === props?.property?.property?.project_id
      );

  // Function to calculate average base_rate
  function calculateAverageBaseRate(details) {
    // Check if details is an array and has elements
    if (!Array.isArray(details) || details.length === 0) {
      return 0;
    }

    // Calculate the total base_rate
    const totalBaseRate = details.reduce((sum, detail) => {
      // Check if base_rate is present and a valid number
      const baseRate = parseFloat(detail.base_rate);
      return isNaN(baseRate) ? sum : sum + baseRate;
    }, 0);

    // Calculate the average
    const averageBaseRate = totalBaseRate / details.length;

    return averageBaseRate;
  }

  // Get the average base_rate
  const averageBaseRate = calculateAverageBaseRate(
    projectsProps?.project_flat_details
  );

  const finalValue = props?.property?.property?.valuation?.type?.final_value;

  // Calculate the gap percentage
  const valueGapPercentage = (
    (Math.abs(finalValue - averageBaseRate) / averageBaseRate) *
    100
  )?.toFixed(2);

  let userMatrix = props.matrixs?.isLoading
    ? []
    : props.matrixs?.matrixs?.length > 0
    ? props.matrixs?.matrixs?.find((user) => {
        return (
          user.user_id === props.login?.login?.user?.id
           && user?.property_type === props?.property?.property?.property_type
        );
      })
    : [];

  console.log(
    props,
    "updatedFirstArray"
  );

  console.log("props", props);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);
    let data = {
      property_id: values.id,
      compliance_masters: values.compliance_masters.map(
        ({ id, compliance_master_id, remarks }) => ({
          id: id,
          compliance_master_id: compliance_master_id,
          remarks,
          property_id: values.id,
        })
      ),
    };

    // let data = {
    //   // token: token,
    //   id: values.id,
    //   property_id: values.property_id,
    //   property_age: values.property_age,
    //   documents: values.documents,
    //   plot_length: values.plot_length,
    //   property_outside: values.property_outside,
    //   property_above_50: values.property_above_50,
    //   property_without_document: values.property_without_document,
    //   property_gt: values.property_gt,
    //   illegal: values.illegal,
    //   demolition: values.demolition,
    //   value_gap_more_than_5: values.value_gap_more_than_5,
    //   base_role: values.base_role,
    //   bank_policy: values.bank_policy,
    //   other_valuation: values.other_valuation,
    //   ec_not_arrived: values.ec_not_arrived,
    //   ownership_docs: values.ownership_docs,
    //   open_plot: values.open_plot,
    //   industrial_property: values.industrial_property,

    // };
    let progressData = {
      id: props?.property?.property?.id,
      compliancesProgress: 1,
    };
    const value = 4;
    console.log("data", data);

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );
    // props.editComplianceData(data, token);
    props.editComplianceRemarkData(data, token);
    setSubmitting(false);
  };

  const idToNameMap = props?.companiesmaster?.companiesmaster?.reduce(
    (map, item) => {
      map[item?.id] = item?.name;
      return map;
    },
    {}
  );

  // Add the "name" property to the objects in the first array
  const updatedFirstArray =
    props?.property?.property?.property_compliances?.map((item) => {
      const name = idToNameMap[item?.compliance_master_id];
      const color = "";

      return { ...item, name, color };
    });
  let red = [];
  let yellow = [];
  let green = [];
  if (props?.property?.property?.project?.building_age >= 60) {
    red?.push(
      updatedFirstArray?.find((element) => element?.name == "Age of property")
    );
  } else if (props?.property?.property?.project?.building_age <= 30) {
    green?.push(
      updatedFirstArray?.find((element) => element?.name == "Age of property")
    );
  } else {
    yellow?.push(
      updatedFirstArray?.find((element) => element?.name == "Age of property")
    );
  }
  // if (
  //   props?.property?.property?.observation?.is_demolition_risk === "Yes" ||
  //   "High"
  // ) {
  //   red?.push(
  //     updatedFirstArray?.find(
  //       (element) => element?.name == "Property Listed in Demolition list"
  //     )
  //   );
  // } else if (
  //   props?.property?.property?.observation?.is_demolition_risk === "No"
  // ) {
  //   green?.push(
  //     updatedFirstArray?.find(
  //       (element) => element?.name == "Property Listed in Demolition list"
  //     )
  //   );
  // } else {
  //   yellow?.push(
  //     updatedFirstArray?.find(
  //       (element) => element?.name == "Property Listed in Demolition list"
  //     )
  //   );
  // }
  // if (props?.property?.property?.property_documents?.length==0) {
  //   console.log("updatedFirstArray", props?.property?.property?.property_documents?.length);
  //   red?.push(
  //     updatedFirstArray?.find((element) => element?.name == "Documents")
  //   );
  // }
  // else if (props?.property?.property?.property_documents?.length==0) {
  //     green?.push(updatedFirstArray?.find((element) => element?.name == "Property Without Document"));
  // }
  // else {
  //   console.log("updatedFirstArray", props?.property?.property?.property_documents?.length);
  //   yellow?.push(
  //     updatedFirstArray?.find((element) => element?.name == "Ownership documents")
  //   );
  //   yellow?.push(
  //     updatedFirstArray?.find((element) => element?.name == "Technical Documents")
  //   );
  // }
  if (
    props?.property?.property?.observation?.property_identified_through == "Yes"
  ) {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Property Identified From Plan"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Property Identified From Plan"
      )
    );
  }
  if (props?.property?.property?.project?.corp_limit == "GP") {
    red?.push(
      updatedFirstArray?.find((element) => element?.name == "GP Property")
    );
  } else {
    green?.push(
      updatedFirstArray?.find((element) => element?.name == "GP Property")
    );
  }
  if (props?.property?.property?.observation?.is_demolition_risk == "0") {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Property Listed in Demolition list"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Property Listed in Demolition list"
      )
    );
  }
  if (props?.property?.property?.property_type == "Independent Property") {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Independent Property"
      )
    );
  } else {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Independent Property"
      )
    );
  }
  if (props?.property?.property?.property_type == "Open Plot") {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Open Plot Valuation"
      )
    );
  } else {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Open Plot Valuation"
      )
    );
  }

  if (
    props?.property?.property?.observation?.environment_certificate == "Yes"
  ) {
    red?.push(
      updatedFirstArray?.find((element) => element?.name == "EC not Available")
    );
  } else {
    green?.push(
      updatedFirstArray?.find((element) => element?.name == "EC not Available")
    );
  }

  if (props?.property?.property?.observation?.bank_policy == "Yes") {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Bank Policy Devision"
      )
    );
  } else {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Bank Policy Devision"
      )
    );
  }

  if (props?.property?.property?.observation?.illegal_property == "Yes") {
    red?.push(
      updatedFirstArray?.find((element) => element?.name == "Illegal Property")
    );
  } else {
    green?.push(
      updatedFirstArray?.find((element) => element?.name == "Illegal Property")
    );
  }

  if (
    props?.property?.property?.observation?.property_identified_through == "Yes"
  ) {
    green?.push(
      updatedFirstArray?.find(
        (element) =>
          element?.name == "Property identified from ownership documents"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) =>
          element?.name == "Property identified from ownership documents"
      )
    );
  }
  if (
    props?.iniciateDocument?.iniciateDocument
      ?.filter((row) => row?.property_id == props?.property?.property?.id)
      .find((doc) => doc.document_name === "Technical Documents")
  ) {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Technical Documents"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Technical Documents"
      )
    );
  }
  if (
    props?.iniciateDocument?.iniciateDocument
      ?.filter((row) => row?.property_id == props?.property?.property?.id)
      .find((doc) => doc.document_name === "Ownership documents")
  ) {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Ownership documents"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Ownership documents"
      )
    );
  }
  if (
    props?.iniciateDocument?.iniciateDocument?.filter(
      (row) => row?.property_id == props?.property?.property?.id
    )
  ) {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Property Without Document"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Property Without Document"
      )
    );
  }
  if (valueGapPercentage > 5) {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Value gap is more than 5%"
      )
    );
  } else {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Value gap is more than 5%"
      )
    );
  }
  if (userMatrix?.limit > finalValue) {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Base role deviation 10%"
      )
    );
  } else {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "Base role deviation 10%"
      )
    );
  }
  
  if (props?.property?.property?.bank_product?.name === "LAP" && props?.property?.property?.occupation?.status === "Vacant" && props?.iniciateDocument?.iniciateDocument
  ?.filter((row) => row?.property_id == props?.property?.property?.id)
  .find((doc) => doc.document_name === "OC")) {
    red?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "if type of property is lap and it is vacant after oc"
      )
    );
  } else {
    green?.push(
      updatedFirstArray?.find(
        (element) => element?.name == "if type of property is lap and it is vacant after oc"
      )
    );
  }

  return (
    <>
      {props.compliances.isLoading && props.companiesmaster.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.id,
              property_id: props?.property?.property?.id,
              property_age: props?.property?.property?.compliance?.property_age,
              documents: props?.property?.property?.compliance?.documents,
              plot_length: props?.property?.property?.compliance?.plot_length,
              property_outside:
                props?.property?.property?.compliance?.property_outside,
              property_above_50:
                props?.property?.property?.compliance?.property_above_50,
              property_without_document:
                props?.property?.property?.compliance
                  ?.property_without_document,
              property_gt: props?.property?.property?.compliance?.property_gt,
              illegal: props?.property?.property?.compliance?.illegal,
              demolition: props?.property?.property?.compliance?.demolition,
              value_gap_more_than_5:
                props?.property?.property?.compliance?.value_gap_more_than_5,
              base_role: props?.property?.property?.compliance?.base_role,
              bank_policy: props?.property?.property?.compliance?.bank_policy,
              other_valuation:
                props?.property?.property?.compliance?.other_valuation,
              ec_not_arrived:
                props?.property?.property?.compliance?.ec_not_arrived,
              ownership_docs:
                props?.property?.property?.compliance?.ownership_docs,
              open_plot: props?.property?.property?.compliance?.open_plot,
              industrial_property:
                props?.property?.property?.compliance?.industrial_property,
              compliance_masters: props?.companiesmaster?.companiesmaster,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Typography variant={"h5"}>Compliances</Typography>

                {props?.companiesmaster?.companiesmaster?.map(
                  (compliance_masters, index) => {
                    return (
                      <Row className="" key={index}>
                        <Col md={5} className="">
                          {compliance_masters?.name}
                        </Col>
                        {/* <Col md={7}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Remarks"
                            variant="outlined"
                            name={`compliance_masters.${index}.remarks`}
                            value={compliance_masters.remarks}
                            id="remarks"
                            onChange={formProps.handleChange}
                          />
                        </Col> */}
                      </Row>
                    );
                  }
                )}
                <Divider />
                <Divider />

                <h2>High Risk</h2>

                <ul>
                  <li style={{ color: "red" }}>
                    <span style={{ color: "black" }}>
                      Age of property is more
                    </span>
                  </li>
                  <li style={{ color: "red" }}>
                    <span style={{ color: "black" }}>
                      Documetns not matching
                    </span>
                  </li>
                </ul>
                <h2>Valid</h2>

                <ul>
                  <li>Site boundaries matching </li>
                  <li>No risk of Demolition </li>
                </ul>
                <br />

                <Divider />
                <div className="test d-flex">
                  <div className="w-33 p-1 font-weight-bold text-white test-r m-0 bg-green">
                    Low Risk
                  </div>
                  <div className="w-33 p-1 font-weight-bold text-white pl-2 test-r bg-yellow">
                    Medium Risk
                  </div>
                  <div className="w-33 p-1 font-weight-bold text-white test-r pl-2 bg-red">
                    High Risk
                  </div>
                </div>
                <div className="test d-flex">
                  <div className="w-33 p-1  test-r m-0">
                    {green.map((row,i) => {
                      return (
                        <div className="text-black m-0 d-flex">
                          {i+1}. {row?.name} 
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-33 p-1 pl-2 test-r">
                    {yellow.map((row,i) => {
                      return (
                        <div className="text-black m-0 d-flex">
                          {i+1}. {row?.name} 
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-33 p-1 test-r pl-2">
                    {red.map((row,i) => {
                      return (
                        <div className="text-black m-0 d-flex">
                          {i+1}. {row?.name} 
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Divider />

                {/* removed all checkbox fields */}
                {/* <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="property_age"
                      name="property_age"
                      value={formProps.values.property_age}
                      checked={
                        formProps.values.property_age === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.property_age === 1
                          ? formProps.setFieldValue("property_age", 0)
                          : formProps.setFieldValue("property_age", 1);
                      }}
                    />
                    Age of property
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="documents"
                      name="documents"
                      value={formProps.values.documents}
                      checked={formProps.values.documents === 1 ? true : false}
                      onClick={() => {
                        formProps.values.documents === 1
                          ? formProps.setFieldValue("documents", 0)
                          : formProps.setFieldValue("documents", 1);
                      }}
                    />
                    Documents
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="plot_length"
                      name="plot_length"
                      value={formProps.values.plot_length}
                      checked={
                        formProps.values.plot_length === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.plot_length === 1
                          ? formProps.setFieldValue("plot_length", 0)
                          : formProps.setFieldValue("plot_length", 1);
                      }}
                    />
                    Plot length with approved
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="property_outside"
                      name="property_outside"
                      value={formProps.values.property_outside}
                      checked={
                        formProps.values.property_outside === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.property_outside === 1
                          ? formProps.setFieldValue("property_outside", 0)
                          : formProps.setFieldValue("property_outside", 1);
                      }}
                    />
                    Property outside geo limit
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="property_above_50"
                      name="property_above_50"
                      value={formProps.values.property_above_50}
                      checked={
                        formProps.values.property_above_50 === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.property_above_50 === 1
                          ? formProps.setFieldValue("property_above_50", 0)
                          : formProps.setFieldValue("property_above_50", 1);
                      }}
                    />
                    Age of property above 50years
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="property_without_document"
                      name="property_without_document"
                      value={formProps.values.property_without_document}
                      checked={
                        formProps.values.property_without_document === 1
                          ? true
                          : false
                      }
                      onClick={() => {
                        formProps.values.property_without_document === 1
                          ? formProps.setFieldValue(
                              "property_without_document",
                              0
                            )
                          : formProps.setFieldValue(
                              "property_without_document",
                              1
                            );
                      }}
                    />
                    Property without documents
                  </Col>

                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="property_gt"
                      name="property_gt"
                      value={formProps.values.property_gt}
                      checked={
                        formProps.values.property_gt === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.property_gt === 1
                          ? formProps.setFieldValue("property_gt", 0)
                          : formProps.setFieldValue("property_gt", 1);
                      }}
                    />
                    GT property
                  </Col>

                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="illegal"
                      name="illegal"
                      value={formProps.values.illegal}
                      checked={formProps.values.illegal === 1 ? true : false}
                      onClick={() => {
                        formProps.values.illegal === 1
                          ? formProps.setFieldValue("illegal", 0)
                          : formProps.setFieldValue("illegal", 1);
                      }}
                    />
                    Illegal property
                  </Col>

                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="demolition"
                      name="demolition"
                      value={formProps.values.demolition}
                      checked={formProps.values.demolition === 1 ? true : false}
                      onClick={() => {
                        formProps.values.demolition === 1
                          ? formProps.setFieldValue("demolition", 0)
                          : formProps.setFieldValue("demolition", 1);
                      }}
                    />
                    Listed in demolition
                  </Col>

                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="value_gap_more_than_5"
                      name="value_gap_more_than_5"
                      value={formProps.values.value_gap_more_than_5}
                      checked={
                        formProps.values.value_gap_more_than_5 === 1
                          ? true
                          : false
                      }
                      onClick={() => {
                        formProps.values.value_gap_more_than_5 === 1
                          ? formProps.setFieldValue("value_gap_more_than_5", 0)
                          : formProps.setFieldValue("value_gap_more_than_5", 1);
                      }}
                    />
                    Value gap is more than 5%
                  </Col>

                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="base_role"
                      name="base_role"
                      value={formProps.values.base_role}
                      checked={formProps.values.base_role === 1 ? true : false}
                      onClick={() => {
                        formProps.values.base_role === 1
                          ? formProps.setFieldValue("base_role", 0)
                          : formProps.setFieldValue("base_role", 1);
                      }}
                    />
                    Base role deviation 10%
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="bank_policy"
                      name="bank_policy"
                      value={formProps.values.bank_policy}
                      checked={
                        formProps.values.bank_policy === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.bank_policy === 1
                          ? formProps.setFieldValue("bank_policy", 0)
                          : formProps.setFieldValue("bank_policy", 1);
                      }}
                    />
                    Bank policy deviation
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="other_valuation"
                      name="other_valuation"
                      value={formProps.values.other_valuation}
                      checked={
                        formProps.values.other_valuation === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.other_valuation === 1
                          ? formProps.setFieldValue("other_valuation", 0)
                          : formProps.setFieldValue("other_valuation", 1);
                      }}
                    />
                    Over valuation
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="ec_not_arrived"
                      name="ec_not_arrived"
                      value={formProps.values.ec_not_arrived}
                      checked={
                        formProps.values.ec_not_arrived === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.ec_not_arrived === 1
                          ? formProps.setFieldValue("ec_not_arrived", 0)
                          : formProps.setFieldValue("ec_not_arrived", 1);
                      }}
                    />
                    EC not arrived
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="ownership_docs"
                      name="ownership_docs"
                      value={formProps.values.ownership_docs}
                      checked={
                        formProps.values.ownership_docs === 1 ? true : false
                      }
                      onClick={() => {
                        formProps.values.ownership_docs === 1
                          ? formProps.setFieldValue("ownership_docs", 0)
                          : formProps.setFieldValue("ownership_docs", 1);
                      }}
                    />
                    Ownership documents not available
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="industrial_property"
                      name="industrial_property"
                      value={formProps.values.industrial_property}
                      checked={
                        formProps.values.industrial_property === 1
                          ? true
                          : false
                      }
                      onClick={() => {
                        formProps.values.industrial_property === 1
                          ? formProps.setFieldValue("industrial_property", 0)
                          : formProps.setFieldValue("industrial_property", 1);
                      }}
                    />
                    Industrial property
                  </Col>
                  <Col md={4} className="pb-4">
                    <Checkbox
                      size="medium"
                      id="open_plot"
                      name="open_plot"
                      value={formProps.values.open_plot}
                      checked={formProps.values.open_plot === 1 ? true : false}
                      onClick={() => {
                        formProps.values.open_plot === 1
                          ? formProps.setFieldValue("open_plot", 0)
                          : formProps.setFieldValue("open_plot", 1);
                      }}
                    />
                    Open plot valuation
                  </Col>
                </Row> */}

                <Divider />
                <br />

                <Row className="form-group pb-4">
                  <Col>
                    <Button
                      color="success"
                      variant="contained"
                      disabled={formProps.isSubmitting}
                      fullWidth
                      type="submit"
                      onClick={() => dispatch(ADD_ONE())}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    projects: state.projects,
    property: state.property,
    compliances: state.compliances,
    companiesmaster: state.companiesmaster,
    iniciateDocument: state.iniciateDocument,
    matrixs: state.matrixs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editComplianceData: (data, token) =>
      dispatch(editComplianceData(data, token)),
    getMatrixsList: (data) => dispatch(getMatrixsList(data)),
    editComplianceRemarkData: (data, token) =>
      dispatch(editComplianceRemarkData(data, token)),
    getCompliance: (data) => dispatch(getCompliance(data)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
    getDocumentPage: (data) => dispatch(getDocumentPage(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCompliances);
