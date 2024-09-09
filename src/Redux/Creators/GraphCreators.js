import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseURL";
import Swal from "sweetalert2";



//*Post
export const MontlyReportPostGetData = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "getMontlyReport", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(MontlyReportGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
//*Post
export const WeeklyReportPostGetData = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "getPastSevenDaysReport", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(WeeklyReportGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const dailyReportPincodeGet = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportPincodeWise", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(DailyPincodeGetData(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const dailyReportUserWise = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportUserWise", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(dailyReportUserWiseGet(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const dailyReportDayWise = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportDayWise", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(GetdailyReportDayWise(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const dailyReportLocationWise = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportLocationWise", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(GetDailyReportLocationWise(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const dailyReportBankWise = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportBankWise", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(GetDailyReportBankWise(graphData  ));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};
export const dailyReportRelease = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportRelease", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData   data", graphData  );
        dispatch(GetDailyReportRelease(graphData));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        //   dispatch(getGraphData  Page(data));
        }
      });
    })
    .catch((error) => console.log(error));
    // .catch((error) => dispatch(graphData  Failed(error)));
};

export const dailyReportReleaseInTat = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "dailyReportReleaseInTat", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData data", graphData  );
        dispatch(GetDailyReportReleaseInTat(graphData));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        }
      });
    })
    .catch((error) => console.log(error));
};


export const dailyReportNotRelease = (data,token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "daily-report-not-release", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData data", graphData  );
        dispatch(getDailyReportNotRelease(graphData));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Added The Graph Data!",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.isDismissed) {
        }
      });
    })
    .catch((error) => console.log(error));
};
export const branchWiseBillAmount = (token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "branchWiseBillAmount", {
    method: "get",
    headers: myheader,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData data", graphData  );
        dispatch(GetbranchWiseBillAmount(graphData));
    })
    .catch((error) => console.log(error));
};
export const getDashboardCount = (token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "get-props-dashboard-counts", {
    method: "get",
    headers: myheader,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData data", graphData  );
        dispatch(DashboardCount(graphData));
    })
    .catch((error) => console.log(error));
};
export const getBillCount = (token) => (dispatch) => {
//   dispatch(graphData  Loading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  });

  return fetch(baseUrl + "bill-counts", {
    method: "get",
    headers: myheader,
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then((response) => response.json())
    .then((graphData  ) => {
      console.log("post graphData data", graphData);
        dispatch(BillCount(graphData));
    })
    .catch((error) => console.log(error));
};

export const bankStatsTableDashboard = (token) => (dispatch) => {
  //   dispatch(graphData  Loading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + "bank-wise-stats", {
      method: "get",
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((graphData  ) => {
        console.log("post graphData data", graphData  );
          dispatch(getBankStatsTableDashboard(graphData));
      })
      .catch((error) => console.log(error));
  };
export const employeeWiseStatsTable = (token) => (dispatch) => {
  //   dispatch(graphData  Loading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + "employee-wise-stats", {
      method: "get",
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((graphData  ) => {
        console.log("post graphData data", graphData  );
          dispatch(getEmployeeWiseStatsTable(graphData));
      })
      .catch((error) => console.log(error));
  };

  export const branchBankWiseDashboard = (data) => (dispatch) => {
  //   dispatch(graphData  Loading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data?.token,
    });
  
    return fetch(baseUrl + `bank-wise-branches-count?city=${data?.city}`, {
      method: "get",
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((graphData  ) => {
        console.log("post graphData data", graphData  );
          dispatch(getBranchBankWiseDashboard(graphData));
      })
      .catch((error) => console.log(error));
  };

  export const bankWiseRevenue = (token) => (dispatch) => {
  //   dispatch(graphData  Loading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + `bank-wise-revenue`, {
      method: "get",
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((graphData  ) => {
        console.log("post graphData data", graphData  );
          dispatch(getBankWiseRevenue(graphData));
      })
      .catch((error) => console.log(error));
  };
  export const bankWiseOverallStats = (token) => (dispatch) => {
  //   dispatch(graphData  Loading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + `bank-wise-overall-stats`, {
      method: "get",
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((graphData  ) => {
        console.log("post graphData data", graphData  );
          dispatch(getBankWiseOverallStats(graphData));
      })
      .catch((error) => console.log(error));
  };
  export const getHourlypProperty = (data,token) => (dispatch) => {
  //   dispatch(graphData  Loading(true));
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
  
    return fetch(baseUrl + `get-hourly-property?start_time=${data.start_time}&end_time=${data.end_time}`, {
      method: "get",
      headers: myheader,
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        let error = new Error(
          "Error:" + response.status + "Error Text: " + response.statusText
        );
  
        error.response = response;
        throw error;
      })
      .then((response) => response.json())
      .then((graphData  ) => {
        console.log("post graphData data", graphData  );
          dispatch(getHourlypProps(graphData));
      })
      .catch((error) => console.log(error));
  };


//*Fetch
export const MontlyReportGetData = (data) => ({
  type: ActionTypes.MONTLY_REPORT_DATA,
  payload: data,
});
export const WeeklyReportGetData = (data) => ({
  type: ActionTypes.WEEKLY_REPORT_DATA,
  payload: data,
});
export const dailyReportUserWiseGet = (data) => ({
  type: ActionTypes.DAILY_REPORT_USER_WISE,
  payload: data,
});
export const DailyPincodeGetData = (data) => ({
  type: ActionTypes.DAILY_PINCODE_GET_DATA,
  payload: data,
});
export const GetDailyReportLocationWise = (data) => ({
  type: ActionTypes.DAILYREPORTLOCATIONWISE,
  payload: data,
});
export const GetDailyReportBankWise = (data) => ({
  type: ActionTypes.DAILYREPORTBANKWISE,
  payload: data,
});
export const GetdailyReportDayWise = (data) => ({
  type: ActionTypes.DAILY_REPORT_DAY_WISE,
  payload: data,
});
export const GetDailyReportRelease = (data) => ({
  type: ActionTypes.DAILY_REPORT_RELEASE,
  payload: data,
});
export const GetDailyReportReleaseInTat = (data) => ({
  type: ActionTypes.DAILY_REPORT_RELEASE_IN_TAT,
  payload: data,
});
export const GetbranchWiseBillAmount = (data) => ({
  type: ActionTypes.BRANCHWISEBILLAMOUNT,
  payload: data,
});

export const DashboardCount = (data) => ({
  type: ActionTypes.GETDASHBOARDCOUNT,
  payload: data,
});
export const BillCount = (data) => ({
  type: ActionTypes.BILLCOUNT,
  payload: data,
});
export const getBankStatsTableDashboard = (data) => ({
  type: ActionTypes.GETBANKSTATSTABLEDASHBOARD,
  payload: data,
});
export const getBranchBankWiseDashboard = (data) => ({
  type: ActionTypes.GETBRANCHBANKWISEDASHBOARD,
  payload: data,
});
export const getBankWiseRevenue = (data) => ({
  type: ActionTypes.GETBANKWISEREVENUE,
  payload: data,
});
export const getEmployeeWiseStatsTable = (data) => ({
  type: ActionTypes.GETEMPLOYEEWISESTATSTABLE,
  payload: data,
});
export const getDailyReportNotRelease = (data) => ({
  type: ActionTypes.GETDAILYREPORTNOTRELEASE,
  payload: data,
});
export const getHourlypProps = (data) => ({
  type: ActionTypes.GETHOURLYPROPS,
  payload: data,
});
export const getBankWiseOverallStats = (data) => ({
  type: ActionTypes.GETBANKWISEOVERALLSTATS,
  payload: data,
});
