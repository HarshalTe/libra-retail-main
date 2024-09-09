import React from "react";
import { connect } from "react-redux";
import { Row, Col, Table } from "reactstrap";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Autocomplete, Divider, MenuItem, Typography } from "@mui/material";

//*Actions
import { editOccupationData } from "../../../../../Redux/Creators/OccupationCreators";

//*Compoenets
import LinerLoader from "components/Loaders/LinerLoader";
import Box from "@mui/material/Box";
import LinearProgressWithLabel from "../ProjectDetails/LinearProgressWithLabel";
import ADD_ONE from "../../../../../Redux/Types/ActionTypes";
import { useDispatch } from "react-redux";
import { editProgressData } from "../../../../../Redux/Creators/ProgressCreators";

function Occupation(props) {
  const [progress, setProgress] = React.useState(0);
  const dispatch = useDispatch();
  const token = props.login?.login?.token;
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Values:", values);

    const value = 3;

    let progressData = {
      id: props?.property?.property?.id,
      occupationProgress: 1,
    };

    props.editProgressData(
      progressData,
      props.setValue,
      value,
      props.login?.login?.token
    );

    // props.editOccupationData(data, props.setValue, value, token);
    // setSubmitting(true);
    handleSubmit2(values, { setSubmitting });
  };
  const handleSubmit2 = (values, { setSubmitting }) => {
    console.log("Values:", values);

    let data = {
      // token: token,
      id: values.id,
      // property_id: values.property_id,
      // //*Occupation
      // status: values.status,
      // occupied_by: values.occupied_by,
      // occupied_since: values.occupied_since,
      // is_tenant: values.is_tenant,
      // // tenantName: values.tenantName,
      // // occupiedSince: values.occupiedSince,
      // // typeOfOccupancy: values.typeOfOccupancy,
      // // relation: values.relation,
      // customer_relationship: values.customer_relationship,
      // seller_name: values.seller_name,
      // seller_type: values.seller_type,
      // description: values.description,
      // site_access: values.site_access,
      // road_type: values.road_type,
      // condition_to_approach: values.condition_to_approach,
      // approved_authority: values.approved_authority,
      // occupent_name: values.occupent_name,

      // //*Lease hold details
      // property_type: values.property_type,
      // lessor_name: values.lessor_name,
      // lease_name: values.lease_name,
      // lease_nature: values.lease_nature,
      // lease_renewal_term: values.lease_renewal_term,
      // initial_premium: values.initial_premium,
      // ground_rent: values.ground_rent,
      // tranfer_charge: values.tranfer_charge,
      // lease_period_remaining: values.lease_period_remaining,
      // unearned_income_payable: values.unearned_income_payable,
      // name_of_tenant: values.name_of_tenant,
      // floor_no: values.floor_no,
      // occupancy_type: values.occupancy_type,
      // building_occupany_remark: values.building_occupany_remark,
      // is_specific_community: values.is_specific_community,
      // specific_community_remark: values.specific_community_remark,
      // tenant: values.tenant,
      // occupation: values.occupation,
      // tenant: [
      //   {
      //     floorNo: values.floorNo,
      //     tenantName: values.tenantName,
      //     occupiedSince: values.occupiedSince,
      //     typeOfOccupancy: values.typeOfOccupancy,
      //     relation: values.relation,
      //   },
      // ],


      status: values.status,
    occupancy_type: values.occupancy_type,
    customer_relationship: values.customer_relationship,
    occupied_seller_name: values.occupied_seller_name,
    occupied_since: values.occupied_since,
    seller_type: values.seller_type,
    self_occupied_name: values.self_occupied_name,
    self_occupied_since: values.self_occupied_since,
    if_vacant: values.if_vacant,
    vacant_since: values.vacant_since,
    tenant: values.tenant,
    seller_name_verified: values.seller_name_verified,
    seller_name_verified_remark: values.seller_name_verified_remark,
    property_type: values.property_type,
    lessor_name: values.lessor_name,
    lease_nature: values.lease_nature,
    lease_renewal_term: values.lease_renewal_term,
    initial_premium: values.initial_premium,
    ground_rent: values.ground_rent,
    tranfer_charge: values.tranfer_charge,
    lease_period_remaining: values.lease_period_remaining,
    total_period_of_lease: values.total_period_of_lease,
    date_of_lease_deed: values.date_of_lease_deed
    };

    const value = 3;

    // props.editProgressData(progressData, props.setValue, value,props.login?.login?.token);

    props.editOccupationData(data, props.setValue, value, token);
    setSubmitting(true);
  };
  const formPropsLength = 27;

  return (
    <>
      {props.occupation.isLoading ? (
        <div>
          <LinerLoader />
        </div>
      ) : (
        <div>
          <br />
          <Formik
            initialValues={{
              id: props?.property?.property?.occupation?.id,
              property_id: props?.property?.property?.id,
              //*Occupation
              status: props?.property?.property?.occupation?.status,
              occupied_by: props?.property?.property?.occupation?.occupied_by,
              occupied_since:
                props?.property?.property?.occupation?.occupied_since,
              // is_tenant:
              //   props?.property?.property?.occupation?.is_tenant,
              customer_relationship:
                props?.property?.property?.occupation?.customer_relationship,
              seller_name: props?.property?.property?.occupation?.seller_name,
              seller_type: props?.property?.property?.occupation?.seller_type,
              description: props?.property?.property?.occupation?.description,
              site_access: props?.property?.property?.occupation?.site_access,
              road_type: props?.property?.property?.occupation?.road_type,
              condition_to_approach:
                props?.property?.property?.occupation?.condition_to_approach,
              approved_authority:
                props?.property?.property?.occupation?.approved_authority,
              occupent_name:
                props?.property?.property?.occupation?.occupent_name,

              //*Lease hold details
              property_type:
                props?.property?.property?.occupation?.property_type,
              lessor_name: props?.property?.property?.occupation?.lessor_name,
              lease_name: props?.property?.property?.occupation?.lease_name,
              lease_nature: props?.property?.property?.occupation?.lease_nature,
              lease_renewal_term:
                props?.property?.property?.occupation?.lease_renewal_term,
              initial_premium:
                props?.property?.property?.occupation?.initial_premium,
              ground_rent: props?.property?.property?.occupation?.ground_rent,
              tranfer_charge:
                props?.property?.property?.occupation?.tranfer_charge,
              lease_period_remaining:
                props?.property?.property?.occupation?.lease_period_remaining,
              unearned_income_payable:
                props?.property?.property?.occupation?.unearned_income_payable,
              floor_no: props?.property?.property?.occupation?.floor_no,
              name_of_tenant:
                props?.property?.property?.occupation?.name_of_tenant,
              occupancy_type:
                props?.property?.property?.occupation?.occupancy_type,
              building_occupany_remark:
                props?.property?.property?.occupation?.building_occupany_remark,
              is_specific_community:
                props?.property?.property?.occupation?.is_specific_community ==
                1
                  ? "Yes"
                  : props?.property?.property?.occupation
                      ?.is_specific_community == 0
                  ? "No"
                  : "N/A",
              specific_community_remark:
                props?.property?.property?.occupation
                  ?.specific_community_remark,
              is_tenant:
                props?.property?.property?.occupation?.is_tenant == 1
                  ? "yes"
                  : props?.property?.property?.occupation?.is_tenant == 0
                  ? "No"
                  : "N/A",
              floorNo:
                props?.property?.property?.occupation?.tenant == null
                  ? ""
                  : props?.property?.property?.occupation?.tenant[0]?.floorNo,
              tenantName:
                props?.property?.property?.occupation?.tenant == null
                  ? ""
                  : props?.property?.property?.occupation?.tenant[0]
                      ?.tenantName,
              occupiedSince:
                props?.property?.property?.occupation?.tenant == null
                  ? ""
                  : props?.property?.property?.occupation?.tenant[0]
                      ?.occupiedSince,
              typeOfOccupancy:
                props?.property?.property?.occupation?.tenant == null
                  ? ""
                  : props?.property?.property?.occupation?.tenant[0]
                      ?.typeOfOccupancy,
              relation:
                props?.property?.property?.occupation?.tenant == null
                  ? ""
                  : props?.property?.property?.occupation?.tenant[0]?.relation,
              tenant: props?.property?.property?.occupation?.tenant,
              occupation: props?.property?.property?.occupation?.occupation,
              deleted_boundaries: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              // branch_name: Yup.string().required("Branch Name is required"),
            })}
          >
            {(formProps) => (
              <Form>
                <div className="pb-4">
                  <Box sx={{ width: "90%" }}>
                    <LinearProgressWithLabel
                      value={
                        (Object?.values(formProps?.values)?.filter(
                          (val) => val !== null && val?.length > 0
                        )?.length /
                          Object?.keys(formProps?.values)?.length) *
                        100
                      }
                    />
                  </Box>
                </div>
                <Typography variant={"h5"}>Occupation</Typography>
                <Divider />
                <br />
                <Row className="form-group">
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="status"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name == "Property Status"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue("status", newValue?.name || "");
                        if (newValue?.name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      onBlur={formProps.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Property status"
                          variant="standard"
                          value={formProps.values.status}
                          error={
                            formProps.touched.status &&
                            Boolean(formProps.errors.status)
                          }
                          helperText={
                            formProps.touched.status && formProps.errors.status
                          }
                        />
                      )}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="occupancy_type"
                      name="occupancy_type"
                      label="Type of Occupancy &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22 } }}
                      variant="standard"
                      size="small"
                      value={formProps.values.occupancy_type}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.occupancy_type)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.occupancy_type &&
                        Boolean(formProps.errors.occupancy_type)
                      }
                      helperText={
                        formProps.touched.occupancy_type &&
                        formProps.errors.occupancy_type
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="customer_relationship"
                      name="customer_relationship"
                      label="Relationship with customer &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.customer_relationship}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.customer_relationship)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.customer_relationship &&
                        Boolean(formProps.errors.customer_relationship)
                      }
                      helperText={
                        formProps.touched.customer_relationship &&
                        formProps.errors.customer_relationship
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="occupied_seller_name"
                      name="occupied_seller_name"
                      label="If Seller Occupied, Name"
                      variant="standard"
                      value={formProps.values.occupied_seller_name}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.occupied_seller_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.occupied_seller_name &&
                        Boolean(formProps.errors.occupied_seller_name)
                      }
                      helperText={
                        formProps.touched.occupied_seller_name &&
                        formProps.errors.occupied_seller_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="occupied_since"
                      name="occupied_since"
                      label="Seller Occupied Since &#x1F4F1;"
                      // InputLabelProps={{ style: { fontSize: 22,textTransform: "capitalize" } }}
                      variant="standard"
                      value={formProps.values.occupied_since}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.occupied_since)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.occupied_since &&
                        Boolean(formProps.errors.occupied_since)
                      }
                      helperText={
                        formProps.touched.occupied_since &&
                        formProps.errors.occupied_since
                      }
                    />
                  </Col>

                  <Col md={4}>
                    <TextField
                      fullWidth
                      id="seller_type"
                      name="seller_type"
                      label="Seller type"
                      variant="standard"
                      value={formProps.values.seller_type}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.seller_type)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.seller_type &&
                        Boolean(formProps.errors.seller_type)
                      }
                      helperText={
                        formProps.touched.seller_type &&
                        formProps.errors.seller_type
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="self_occupied_name"
                      name="self_occupied_name"
                      label="If Self Occupied, Name"
                      variant="standard"
                      value={formProps.values.self_occupied_name}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.self_occupied_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.self_occupied_name &&
                        Boolean(formProps.errors.self_occupied_name)
                      }
                      helperText={
                        formProps.touched.self_occupied_name &&
                        formProps.errors.self_occupied_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="self_occupied_since"
                      name="self_occupied_since"
                      label="Self Occupied Since"
                      variant="standard"
                      value={formProps.values.self_occupied_since}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.self_occupied_since)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.self_occupied_since &&
                        Boolean(formProps.errors.self_occupied_since)
                      }
                      helperText={
                        formProps.touched.self_occupied_since &&
                        formProps.errors.self_occupied_since
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4"></Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      select
                      id="if_vacant"
                      name="if_vacant"
                      label="If Vacant"
                      variant="standard"
                      value={formProps.values.if_vacant}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.if_vacant)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.if_vacant &&
                        Boolean(formProps.errors.if_vacant)
                      }
                      helperText={
                        formProps.touched.if_vacant &&
                        formProps.errors.if_vacant
                      }
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="vacant_since"
                      name="vacant_since"
                      label="Vacant Since"
                      variant="standard"
                      value={formProps.values.vacant_since}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.vacant_since)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.vacant_since &&
                        Boolean(formProps.errors.vacant_since)
                      }
                      helperText={
                        formProps.touched.vacant_since &&
                        formProps.errors.vacant_since
                      }
                    />
                  </Col>
                </Row>

                <Typography variant={"h5"}>Tenant Occupied</Typography>
                <Row className="mb-3">
                  <Col md={12}>
                    <FieldArray
                      name="tenant"
                      render={(arrayHelpers) => (
                        <div>
                          <Row>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="tenantName"
                                name="tenantName"
                                size="small"
                                label="Tenant Name"
                                variant="outlined"
                                value={formProps.values.tenantName}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.tenantName)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="floorNo"
                                size="small"
                                name="floorNo"
                                label="Floor No"
                                variant="outlined"
                                value={formProps.values.floorNo}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.floorNo)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="occupiedSince"
                                name="occupiedSince"
                                size="small"
                                label="Occupied Since"
                                variant="outlined"
                                value={formProps.values.occupiedSince}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.occupiedSince)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="typeOfOccupancy"
                                name="typeOfOccupancy"
                                label="Type Of Occupancy"
                                size="small"
                                variant="outlined"
                                value={formProps.values.typeOfOccupancy}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.typeOfOccupancy)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="relation"
                                size="small"
                                name="relation"
                                label="Relation"
                                variant="outlined"
                                value={formProps.values.relation}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.relation)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="rent"
                                size="small"
                                name="rent"
                                label="Rent"
                                variant="outlined"
                                value={formProps.values.rent}
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.rent)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="no_of_tenant_in_property"
                                size="small"
                                name="no_of_tenant_in_property"
                                label="No. of Tenants in Property"
                                variant="outlined"
                                value={
                                  formProps.values.no_of_tenant_in_property
                                }
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (formProps.values.no_of_tenant_in_property)
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>
                            <Col md={4} className="pb-4">
                              <TextField
                                fullWidth
                                id="occupied_by_specific_community"
                                size="small"
                                name="occupied_by_specific_community"
                                label="Occupied by Specific Community"
                                variant="outlined"
                                value={
                                  formProps.values
                                    .occupied_by_specific_community
                                }
                                onChange={formProps.handleChange}
                                onBlur={() => {
                                  if (
                                    formProps.values
                                      .occupied_by_specific_community
                                  )
                                    setProgress(
                                      progress + 100 / formPropsLength
                                    );
                                }}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                  arrayHelpers.push({
                                    property_id: formProps.values.property_id,
                                    floorNo: formProps.values.floorNo,
                                    tenantName: formProps.values.tenantName,
                                    occupiedSince:
                                      formProps.values.occupiedSince,
                                    typeOfOccupancy:
                                      formProps.values.typeOfOccupancy,
                                    relation: formProps.values.relation,
                                    rent: formProps.values.rent,
                                    no_of_tenant_in_property:
                                      formProps.values.no_of_tenant_in_property,
                                    occupied_by_specific_community:
                                      formProps.values
                                        .occupied_by_specific_community,
                                    property_unit_detail_id:
                                      formProps.values.id,
                                  });
                                  formProps.setFieldValue("tenantName", "");
                                  formProps.setFieldValue("floorNo", "");
                                  formProps.setFieldValue("occupiedSince", "");
                                  formProps.setFieldValue(
                                    "typeOfOccupancy",
                                    ""
                                  );
                                  formProps.setFieldValue("relation", "");
                                  formProps.setFieldValue("rent", "");
                                  formProps.setFieldValue(
                                    "no_of_tenant_in_property",
                                    ""
                                  );
                                  formProps.setFieldValue(
                                    "occupied_by_specific_community",
                                    ""
                                  );
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
                                <th>Tenant Name</th>
                                <th>Floor No</th>
                                <th>Occupied Since</th>
                                <th>Type Of Occupancy</th>
                                <th>Relation</th>
                                <th>Rent</th>
                                <th>No. of Tenants in Property</th>
                                <th>Occupied by Specific Community</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formProps?.values?.tenant?.map(
                                (tenant, index) => (
                                  <tr key={index}>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Tenant Name"
                                        variant="outlined"
                                        name={`tenant.${index}.tenantName`}
                                        value={tenant.tenantName}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Floor No"
                                        variant="outlined"
                                        name={`tenant.${index}.floorNo`}
                                        value={tenant.floorNo}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Occupied Since"
                                        variant="outlined"
                                        name={`tenant.${index}.occupiedSince`}
                                        value={tenant.occupiedSince}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Type Of Occupancy"
                                        variant="outlined"
                                        name={`tenant.${index}.typeOfOccupancy`}
                                        value={tenant.typeOfOccupancy}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Relation"
                                        variant="outlined"
                                        name={`tenant.${index}.relation`}
                                        value={tenant.relation}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Rent"
                                        variant="outlined"
                                        name={`tenant.${index}.rent`}
                                        value={tenant.rent}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="No. of Tenants in Property"
                                        variant="outlined"
                                        name={`tenant.${index}.no_of_tenant_in_property`}
                                        value={tenant.no_of_tenant_in_property}
                                        onChange={formProps.handleChange}
                                      />
                                    </td>
                                    <td>
                                      <TextField
                                        fullWidth
                                        size="small"
                                        label="Occupied by Specific Community"
                                        variant="outlined"
                                        name={`tenant.${index}.occupied_by_specific_community`}
                                        value={
                                          tenant.occupied_by_specific_community
                                        }
                                        onChange={formProps.handleChange}
                                      />
                                    </td>

                                    <td>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                          formProps.values.deleted_boundaries.push(
                                            tenant.id
                                          );
                                        }}
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
<br/>
                <Typography variant={"h5"}>Neighbourhood check </Typography>
                <Row>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="seller_name_verified"
                      name="seller_name_verified"
                      label="Seller Name Verified"
                      variant="standard"
                      value={formProps.values.seller_name_verified}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.seller_name_verified)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.seller_name_verified &&
                        Boolean(formProps.errors.seller_name_verified)
                      }
                      helperText={
                        formProps.touched.seller_name_verified &&
                        formProps.errors.seller_name_verified
                      }
                    />
                  </Col>
                  <Col md={8} className="pb-4">
                    <TextField
                      fullWidth
                      id="seller_name_verified_remark"
                      name="seller_name_verified_remark"
                      label="If Yes from whom/ If no, then Remarks"
                      variant="standard"
                      value={formProps.values.seller_name_verified_remark}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.seller_name_verified_remark)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.seller_name_verified_remark &&
                        Boolean(formProps.errors.seller_name_verified_remark)
                      }
                      helperText={
                        formProps.touched.seller_name_verified_remark &&
                        formProps.errors.seller_name_verified_remark
                      }
                    />
                  </Col>
                </Row>

                <Typography variant={"h5"}>Lease Hold Details </Typography>
                <Row>
                  <Col md={4} className="pb-4">
                    <Autocomplete
                      id="property_type"
                      options={
                        props?.dropdowns?.dropdowns?.filter(
                          (field) => field?.name === "Property Type"
                        )[0]?.drop_down_details || []
                      }
                      getOptionLabel={(option) => option?.name || ""}
                      onChange={(event, newValue) => {
                        formProps.setFieldValue(
                          "property_type",
                          newValue?.name || ""
                        );
                        if (newValue?.name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      onBlur={formProps.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Type of property"
                          variant="standard"
                          value={formProps.values.property_type}
                        />
                      )}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="lessor_name"
                      name="lessor_name"
                      label="Name of lessor"
                      variant="standard"
                      value={formProps.values.lessor_name}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lessor_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.lessor_name &&
                        Boolean(formProps.errors.lessor_name)
                      }
                      helperText={
                        formProps.touched.lessor_name &&
                        formProps.errors.lessor_name
                      }
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="lessor_name"
                      name="lessor_name"
                      label="Name of lessor"
                      variant="standard"
                      value={formProps.values.lessor_name}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lessor_name)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      error={
                        formProps.touched.lessor_name &&
                        Boolean(formProps.errors.lessor_name)
                      }
                      helperText={
                        formProps.touched.lessor_name &&
                        formProps.errors.lessor_name
                      }
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="lease_nature"
                      name="lease_nature"
                      label="Nature of lease"
                      variant="standard"
                      value={formProps.values.lease_nature}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lease_nature)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="lease_renewal_term"
                      name="lease_renewal_term"
                      label="Terms of renewal of lease"
                      variant="standard"
                      value={formProps.values.lease_renewal_term}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lease_renewal_term)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="initial_premium"
                      name="initial_premium"
                      label="Initial premium"
                      variant="standard"
                      value={formProps.values.initial_premium}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.initial_premium)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="ground_rent"
                      name="ground_rent"
                      label="Ground rent payable per annum"
                      variant="standard"
                      value={formProps.values.ground_rent}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.ground_rent)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>

                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="tranfer_charge"
                      name="tranfer_charge"
                      label="Transfer Charge"
                      variant="standard"
                      value={formProps.values.tranfer_charge}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.tranfer_charge)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="lease_period_remaining"
                      name="lease_period_remaining"
                      label="Remaining period of lease"
                      variant="standard"
                      value={formProps.values.lease_period_remaining}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.lease_period_remaining)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="total_period_of_lease"
                      name="total_period_of_lease"
                      label="Total Period of Lease"
                      variant="standard"
                      value={formProps.values.total_period_of_lease}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.total_period_of_lease)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                    />
                  </Col>
                  <Col md={4} className="pb-4">
                    <TextField
                      fullWidth
                      id="date_of_lease_deed"
                      name="date_of_lease_deed"
                      label="Date of Lease Deed"
                      type="date"
                      variant="standard"
                      value={formProps.values.date_of_lease_deed}
                      onChange={formProps.handleChange}
                      onBlur={() => {
                        if (formProps.values.date_of_lease_deed)
                          setProgress(progress + 100 / formPropsLength);
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Col>
                </Row>

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
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    // propertyid: state.properties.propertyid,
    property: state.property,
    occupation: state.occupation,
    dropdowns: state.dropdowns,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOccupationData: (data, setValue, value, token) =>
      dispatch(editOccupationData(data, setValue, value, token)),
    editProgressData: (progressData, setValue, value, token) =>
      dispatch(editProgressData(progressData, setValue, value, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Occupation);
