import React from "react";
import { connect } from "react-redux";
import { CardBody, Card, CardHeader, CardFooter, Row, Col } from "reactstrap";
import { Line } from "react-chartjs-2";

//*Actions
import { getBillDashboard } from "../../../Redux/Creators/BillDashboardCreators";
// import { BillGraphGet } from "../../../../../Redux/Creators/BillGraphCreators";
import { BillConfigGet } from "../../../Redux/Creators/BillGraphCreators";
import PreLoader from "components/Loaders/PreLoader";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import moment from "moment";


function RealResearchGraphs(props) {
  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  const token = props.login?.login?.token;
  const fetchData = () => {

    let data = {
      token: token,
      id:props?.property?.property?.project_id
    };
    props.getBillDashboard(data);
    props.BillConfigGet(data);
    // props.BillGraphGet(data);
  };

  const handleSubmit = (values) => {
    console.log("submit data", values);
    let data = {
      token: token,
      id:values?.id
    };
    if (values != null) {
      props.BillConfigGet(data);
    }
  }
  const data4 = {
    labels: props?.billGraph?.billConfigGraph?.map(
      (el) => el.completed_date
      ),
      datasets: [
        props?.billGraph?.billConfigGraph.map((line,i)=>(
          {
          label: "Configuration",
          // data: props?.billGraph?.billConfigGraph?.map((o) => ({
            // y: [9,6],
            data:
            {y: line.rate,
            x: line.configuration},
            // })),
            backgroundColor: "rgba(102, 200, 2, 0.5)",
        }
        )),
      //   {
      //     label: "Configuration",
      // data: props?.billGraph?.billConfigGraph?.map((o) => ({
      //   // y: [9,6],
      //   y: o.rate,
      //   x: o.configuration
      //   })),
      //   backgroundColor: "rgba(102, 200, 2, 0.5)",
      // },
    ],
  };
  return (
    <div>
      {props.billDashboard.isLoading ? (
        <div className="pt-4 px-3">
          <PreLoader />
        </div>
      ) : (
        <div className="pt-4 px-3">

          <Row className="pt-1 pb-1">
            <Col md={12}>
              <Card className="pt-2 pb-2">
                <CardHeader className="bg-success text-white">
                  <strong>Real Research Graphs</strong>
                </CardHeader>
                <CardBody>
      <CardBody>
          <Formik
            initialValues={{
              //*
              project_name: "",
              project_id: "",
              //*
            }}
            // onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
            })}
          >
            {(formProps) => {

              const projectsProps = {
                options: props?.projects?.isLoading
                  ? []
                  : props?.projects?.projects?.data?.map((project) => project),
              };
        return (
       <Form>
                  
                  <Row className="form-group">
                    <Col md={12} className="pb-4">
                      <>
                        <Autocomplete
                          id="contact-autocomplete"
                          options={projectsProps.options}
                          getOptionLabel={(project) =>
                            `${project?.project_name} ( ${project?.cts_no}, ${project?.village}, ${project?.fp_no} )`
                          }
                          onChange={(e, value) =>{

                            formProps.setFieldValue(
                              "project_id",
                              value?.id || ""
                              )
                              handleSubmit(value)
                            }
                          }
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
                              label="Project"
                              name="project_id"
                              variant="outlined"
                            />
                          )}
                        />
                      </>
                    </Col>
                  </Row>

                </Form>
        )
      }}
      </Formik>
    </CardBody>
                {/* Chart */}
                <div className="chart" style={{"height": "fit-content"}}>
                  <Line
                    data={data4}
                    options={{
                      responsive: true,

                      legend: {
                        display: true,
                        position: "top",

                        labels: {
                          boxHeight: 5,
                          boxWidth: 10,
                        },
                      },
                    }}
                  />
                </div>
              </CardBody>
             
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    property: state.property,
    billDashboard: state.billDashboard,
    billGraph: state.billGraph,
    projects: state.projects,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBillDashboard: (data) => dispatch(getBillDashboard(data)),
    BillConfigGet: (data) => dispatch(BillConfigGet(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RealResearchGraphs);
