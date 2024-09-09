import React from "react";
import MenuItem from "@mui/material/MenuItem";
import PrintIcon from "@mui/icons-material/Print";
import { connect } from "react-redux";
import { editPropertiesData } from "./../../../../Redux/Creators/PropertiesCreators";
function PrintButton(props) {
  const [value, setValue] = React.useState("");

  const printSubmit = () => {
    const token = props.login?.login?.token;
    let data = {
      token: token,
      pageno: 1,
      pageSize: 10000,
      id: props.data?.id,
      //*Case Details
      application_no: props.data?.application_no,
      applicant_name: props.data?.applicant_name,
      customer_name: props.data?.customer_name,
      surname: props.data?.surname,
      branch_name: props.data?.branch?.branch_name,
      contact_person_name: props.data?.contact_person_name,
      contact_person_no: props.data?.contact_person_no,
      property_type: props.data?.property_type,

      //*Type of OwnerShip
      property_ownerships: props.data?.property_ownerships,
      //*
      postal_address: props.data?.postal_address,
      legal_address: props.data?.legal_address,

      //*Legal Address
      survey_no: props.data?.survey_no,
      tp_no: props.data?.tp_no,
      fp_no: props.data?.fp_no,
      sp_no: props.data?.sp_no,
      op_no: props.data?.op_no,
      plot_no: props.data?.plot_no,
      block_no: props.data?.block_no,
      khasra_no: props.data?.khasra_no,
      village: props.data?.village,
      mouje: props.data?.mouje,
      district_name: props.data?.district_name,
      state: props.data?.state,
      pincode: props.data?.pincode,

      //* Next
      phase: props.data?.phase,
      unit_no: props.data?.unit_no,
      unit_name: props.data?.unit_name,
      road_name: props.data?.road_name,
      street_name: props.data?.street_name,
      area: props.data?.area,

      city: props.data?.city,
      location: props.data?.location,
      nearby_landmark: props.data?.nearby_landmark,

      taluka: props.data?.taluka,
      district: props.data?.district,

      is_address_missing: props.data?.is_address_missing,
      print_count: Number(props.data?.print_count) + 1,
    };

    props.editPropertiesData(data, setValue, value);
  };
  return (
    <div>
      <MenuItem
        disableRipple
        className="ml-3"
        color="error"
        onClick={printSubmit}
        disabled={props.data.print_count >= 3 ? true : false}
      >
        <PrintIcon color="error" />
      </MenuItem>
      {/* {props.data.print_count} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPropertiesData: (data, setValue, value) =>
      dispatch(editPropertiesData(data, setValue, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintButton);
