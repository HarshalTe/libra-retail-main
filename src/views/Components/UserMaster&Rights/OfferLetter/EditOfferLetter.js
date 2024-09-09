import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label
} from "reactstrap";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@material-ui/core/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Divider, TextareaAutosize } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DateFnsUtils from "@date-io/date-fns";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";

//*Actions
import { offerlettersEditData } from "../../../../Redux/Creators/OfferLetterCreators";
import JoditEditor from "jodit-react";
import DeleteIcon from "@mui/icons-material/Delete";

function EditOfferLetter(props) {
  const token = props.login?.login?.token;

let data = "<p class=\"MsoNormal\" align=\"center\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: center;\"><strong><span lang=\"EN-US\" style=\"font-size: 16px; line-height: 107%;\">Letter of\n            Offer</span></strong></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">26<sup>th</sup> June\n        2022<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><em>Strictly Private and Confidential</em></span></p>\n\n<p class=\"MsoNoSpacing\" style=\"margin: 0px; font-size: 15px; font-family: Calibri, sans-serif;\"><span lang=\"EN-US\">applicant_name</span></p>\n\n<p class=\"MsoNoSpacing\" style=\"margin: 0px; font-size: 15px; font-family: Calibri, sans-serif;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p class=\"MsoNoSpacing\" style=\"margin: 0px; font-size: 15px; font-family: Calibri, sans-serif;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">Dear applicant_name,<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">With reference\n        to your application and the subsequent discussion you had with Libra Valuers,\n        We are pleased to extend this offer of employment to you. This offer is\n        contingent upon you clearing our background verification and reference check\n        process and suitable certification of your medical fitness.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">You shall be\n        designated as <strong>Site Engineer</strong> at Associates grade at <strong>Mumbai</strong> and\n        your per annum fixed cost to company (CTC) (inclusive of all statutory payments\n        that one liable for) shall be 1,80,000/- (One Lac Eighty Thousand Only).</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">All amounts\n        payable are subject to deduction of taxes and other contributions that are\n        required to be made under Indian laws or the policies of the company. This CTC\n        would be reviewed periodically as per the norms and practices of the company.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">You should serve\n        training period for 10 Days. During your training period company will pay you\n        conveyance charges as applicable. Should your performance be found\n        satisfactory, the company would be pleased to start your compensation benefits\n        after the completion of successful training given by the official team member\n        of the company.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">A Bond of 2\n        Years shall be applicable as per the company policy.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">On your employment\n        with the company, you will cover under the accidental insurance as per the\n        company &amp; covering bank policy.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">Your date of\n        joining will be 26<sup>th</sup> June 2022.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">You are required\n        to understand and except the terms and conditions of the company during your\n        first login to the company interface. On fulfilling the conditions and signing\n        the company mandatory formats you will receive your appointment letter and the\n        company listed procedure and confidential norms will be binding upon you.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">At the time of joining,\n        we would require the following documents from you.</span></p>\n\n<p class=\"MsoListParagraphCxSpFirst\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>1.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">4 Color Photographs in formal\n        attire.</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>2.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">2 professional references. (Name,\n        Designation, Contact No, Address, Email Id etc)</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>3.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">One copy of all qualification\n        certificates along with the latest 2 months pay slips.</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>4.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">A copy of past experience\n        certificates.</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>5.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">Copy of salary certificate or\n        Form 16 of previous organization.</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>6.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">Photo Id Proof.</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>7.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">Medical / Fitness certificate\n        issued by registered doctor.</span></p>\n\n<p class=\"MsoListParagraphCxSpMiddle\" style=\"margin: 0px 0px 0px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>8.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">Pan Card / Banker’s signature\n        verification letter.</span></p>\n\n<p class=\"MsoListParagraphCxSpLast\" style=\"margin: 0px 0px 11px 48px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify; text-indent: -24px;\"><span lang=\"EN-US\"><span>9.<span style=\"font: 9px &quot;Times New Roman&quot;;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n            </span></span></span><span lang=\"EN-US\">UID (Aadhar Number)</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">You are required\n        to undertake that this offer letter will be kept confidential and not be used\n        for any personal gains. All information shared with you at the time of\n        interview regarding the LV Group must be kept confidential and not disclose to\n        any person or organization.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">In the terms of\n        your resignation to the company you have to serve the notice period of 3 months\n        after your resignation. If in the case, if you fail to do so you shall have to\n        pay 3 month salary to the company. Company has sole rights to take legal action\n        in case candidate fail to do so in both circumstances.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">Please sign and\n        return a copy of this letter to acknowledge receipt as well as token of\n        acceptance within 7 days of the date of offer, failing which it shall be\n        considered withdrawn.</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">Thanking You,</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">For, Libra\n        Valuers<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Received &amp; Accepted,</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">&nbsp;</span><br></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">Mr Tejas\n        Yogeshbhai Dave <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>applicant_name</span></p>\n\n<p class=\"MsoNormal\" style=\"margin: 0px 0px 11px; line-height: 107%; font-size: 15px; font-family: Calibri, sans-serif; text-align: justify;\"><span lang=\"EN-US\">Director<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Date:</span></p>"
let replacements = {
  "applicant_name": props.data?.name,
  "26<sup>th</sup> June": props.data?.doj,
  "1,80,000": props.data?.salary_pa
};

let updatedData = data;

for (let key in replacements) {
  updatedData = updatedData.replace(key, replacements[key]);
}
  const [modal, setModal] = useState(false);
  const [content, setContent] = React.useState(data);
  const toggle = () => setModal(!modal);

  const handleSubmit = (values, { setSubmitting }) => {
    
    let token = {
          id:props?.data?.id,
          token:props.login?.login?.token
    }
    const data = new FormData();
    data.append("id", props?.data?.id);
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phone", values.phone);
    data.append("gender", values.gender);
    data.append("doj", values.doj);
    data.append("position", values.position);
    data.append("salary_pa", values.salary_pa);
    data.append("status", values.status);
    data.append("message", content);
    data.append("is_approved", values.is_approved);
    data.append("file_name", values.file_name);
    data.append("internal_remarks", values.internal_remarks);
    console.log("Values In Upload file:",data, values);

    props.offerlettersEditData(data, token);
    setSubmitting(true);
    setModal(false);
  };
  // console.log(object)

  return (
    <div>
      <Tooltip title="Edit OfferLetters" placement="right" className="m-2" style={{float:"right"}}>
      <Button
          variant="outlined"
          color="warning"
          size="small"
          className="p-1"
          onClick={() => toggle()}
        >
          <EditIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Modal
        className="modal-lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          <Typography>
            <strong>Edit Offer Letters</strong>
          </Typography>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Formik
            initialValues={{
              user_id: props.data?.user_id,
              name:props.data?.name,
              email:props.data?.email,
              phone:props.data?.phone,
              gender:props.data?.gender,
              doj:props.data?.doj,
              position:props.data?.position,
              salary_pa:props.data?.salary_pa,
              status:props.data?.status,
              internal_remarks:props.data?.internal_remarks,
              is_approved:props.data?.is_approved,
              message:[],
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            //   pincode: Yup.string().required("Pincode is required"),
            //   instrcutions: Yup.string().required("Instructions is required"),
            })}
          >
            {(formProps) => (
              <Form enctype="multipart/form-data">
     <Row>
                  <Col md={6} className="">
                    <Label>Name</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Name"
                      id="name"
                      name="name"
                      value={formProps.values.name}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.name && Boolean(formProps.errors.name)
                      }
                      helperText={
                        formProps.touched.name && formProps.errors.name
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Email Id</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Email Id"
                      id="email"
                      name="email"
                      value={formProps.values.email}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.email &&
                        Boolean(formProps.errors.email)
                      }
                      helperText={
                        formProps.touched.email && formProps.errors.email
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Mobile No.</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Mobile No."
                      id="phone"
                      name="phone"
                      value={formProps.values.phone}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.phone &&
                        Boolean(formProps.errors.phone)
                      }
                      helperText={
                        formProps.touched.phone && formProps.errors.phone
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Gender</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Gender"
                      id="gender"
                      name="gender"
                      value={formProps.values.gender}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.gender &&
                        Boolean(formProps.errors.gender)
                      }
                      helperText={
                        formProps.touched.gender && formProps.errors.gender
                      }
                    />
                  </Col>

                  <Col md={6} className="">
                    <Label>Date Of Birth</Label>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      size="small"
                      label="Date Of Birth"
                      id="doj"
                      name="doj"
                      value={formProps.values.doj}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.doj && Boolean(formProps.errors.doj)
                      }
                      helperText={formProps.touched.doj && formProps.errors.doj}
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Salary</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Salary"
                      id="salary_pa"
                      name="salary_pa"
                      value={formProps.values.salary_pa}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.salary_pa &&
                        Boolean(formProps.errors.salary_pa)
                      }
                      helperText={
                        formProps.touched.salary_pa &&
                        formProps.errors.salary_pa
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Position</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      label="Position"
                      id="position"
                      name="position"
                      value={formProps.values.position}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.position &&
                        Boolean(formProps.errors.position)
                      }
                      helperText={
                        formProps.touched.position && formProps.errors.position
                      }
                    />
                  </Col>
                  <Col md={6} className="">
                    <Label>Approvel Status</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      select
                      label="Status"
                      id="status"
                      name="status"
                      value={formProps.values.status}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.status &&
                        Boolean(formProps.errors.status)
                      }
                      helperText={
                        formProps.touched.status && formProps.errors.status
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Sent">Sent</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Hired">Hired</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </TextField>
                  </Col>

                  <Col md={6} className="pb-4 pt-3">
                    <Label>Upload</Label>
                    <TextField
                      fullWidth
                      size="small"
                      name="file_name"
                      variant="outlined"
                      onChange={(e, value) => {
                        formProps.setFieldValue(
                          "file_name",
                          e.currentTarget.files[0]
                        );
                      }}
                      type="file"
                      error={
                        formProps.touched.file_name &&
                        Boolean(formProps.errors.file_name)
                      }
                      helperText={
                        formProps.touched.file_name &&
                        formProps.errors.file_name
                      }
                    />
                  </Col>

                  <Col md={6} className="pb-4 pt-3">
                    <Label>Is Approved</Label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      select
                      label="Is Approved"
                      id="is_approved"
                      name="is_approved"
                      value={formProps.values.is_approved}
                      onChange={formProps.handleChange}
                      error={
                        formProps.touched.is_approved &&
                        Boolean(formProps.errors.is_approved)
                      }
                      helperText={
                        formProps.touched.is_approved &&
                        formProps.errors.is_approved
                      }
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={0}>Yes</MenuItem>
                      <MenuItem value={1}>No</MenuItem>
                    </TextField>
                  </Col>

                  {/* <Col md={12} className="">
                    <Label>Remark</Label>
                    <TextareaAutosize
                      //  aria-label="minimum height"
                      style={{ width: 725, margin: "auto" }}
                      minRows={6}
                      fullWidth
                      // variant="outlined"
                      size="large"
                      label="message"
                      id="message"
                      name="message"
                      value={formProps.values.message}
                      onChange={formProps.handleChange}
                    />
                  </Col> */}

                  <Col md={12} className="">
                    <Label>Internal Remark</Label>
                    <TextareaAutosize
                      //  aria-label="minimum height"
                      style={{ width: 725, margin: "auto" }}
                      minRows={6}
                      fullWidth
                      // variant="outlined"
                      size="large"
                      label="internal_remarks"
                      id="internal_remarks"
                      name="internal_remarks"
                      value={formProps.values.internal_remarks}
                      onChange={formProps.handleChange}
                    />
                  </Col>
                </Row>
                <Divider />
                <Row>
                <Col md={12}>
                  <FieldArray
                    name="massage"
                    render={(arrayHelpers) => (
                      <div>
                        <div>
                          <div>
                          <JoditEditor
                                      id="details"
                                    //   label="Declaration *"
                                      name="details"
                                      value={content}
                                      onChange={newContent=>setContent(newContent)}
                                    />
                          </div>
                          {/* <div>
                            <Button
                              color="success"
                              variant="outlined"
                              onClick={() => {
                                arrayHelpers.push({
                                  details: content,
                                });
                                {
                                  formProps.setFieldValue("details", "");
                                }
                              }}
                              size="large"
                            >
                              <AddIcon fontSize="inherit" />
                            </Button>
                          </div> */}
                        </div>
                        {/* <div size="sm" className="mt-3">
                          
                          <div>
                            {console.log(
                              "values",
                              formProps?.values?.massage
                            )}
                            {formProps?.values?.massage?.map(
                              (massage, index) => {
                                return (
                                  <div key={index}>
                                    <div>
                                    <JoditEditor
                                      id="details"
                                      label="Declaration *"
                                      name={`massage.${index}details`}
                                       value={massage.details}
                                    />
                                    </div>

                                    <div>
                                      <Button
                                        color="error"
                                        size="large"
                                        variant="outlined"
                                        onClick={() => {
                                          arrayHelpers.remove(index);
                                        }}
                                      >
                                        <DeleteIcon fontSize="inherit" />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div> */}
                      </div>
                    )}
                  />
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    offerlettersEditData: (data,token) => dispatch(offerlettersEditData(data,token)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditOfferLetter);
