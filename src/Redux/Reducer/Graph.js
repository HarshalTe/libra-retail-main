import * as ActionTypes from "../Types/ActionTypes";

export const Graph = (
  state = {
    isLoading: true,
    errMess: null,
    monthlyReport: [],//done
    weeklyReport: [],//done
    dailyPincodeReport: [],//done
    dailyReportLocationWise: [],//done
    dailyBankWiseReport: [],//!done
    dailyReportDayWise: [],
    dailyReportRelease: [],
    dailyReportUserWise: [],//done
    dailyReportReleaseInTat: [],//done
    branchWiseBillAmount: [],//done
    dashboardCount: [],//done
    getBankStatsTableDashboard: [],//done
    getBranchBankWiseDashboard: [],//done
    getBankWiseRevenue: [],//done
    EmployeeWiseStats: [],//done
    DailyReportNotRelease: [],//done
    hourlyProps: [],//done
    bankWiseOverallStats: [],//done
    billCount: [],//done
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.MONTLY_REPORT_DATA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        monthlyReport: action.payload,
      };

    case ActionTypes.WEEKLY_REPORT_DATA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        weeklyReport: action.payload,
      };
    case ActionTypes.DAILY_PINCODE_GET_DATA:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyPincodeReport: action.payload,
      };
    case ActionTypes.DAILYREPORTLOCATIONWISE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyReportLocationWise: action.payload,
      };
    case ActionTypes.DAILYREPORTBANKWISE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyBankWiseReport: action.payload,
      };
    case ActionTypes.DAILY_REPORT_DAY_WISE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyReportDayWise: action.payload,
      };
    case ActionTypes.DAILY_REPORT_USER_WISE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyReportUserWise: action.payload,
      };
    case ActionTypes.DAILY_REPORT_RELEASE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyReportRelease: action.payload,
      };
    case ActionTypes.DAILY_REPORT_RELEASE_IN_TAT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailyReportReleaseInTat: action.payload,
      };
    case ActionTypes.BRANCHWISEBILLAMOUNT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        branchWiseBillAmount: action.payload,
      };
    case ActionTypes.GETDASHBOARDCOUNT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dashboardCount: action.payload,
      };
    case ActionTypes.GETBANKSTATSTABLEDASHBOARD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        getBankStatsTableDashboard: action.payload,
      };
    case ActionTypes.GETBRANCHBANKWISEDASHBOARD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        getBranchBankWiseDashboard: action.payload,
      };
    case ActionTypes.GETBANKWISEREVENUE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        getBankWiseRevenue: action.payload,
      };
    case ActionTypes.GETEMPLOYEEWISESTATSTABLE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        EmployeeWiseStats: action.payload,
      };
    case ActionTypes.GETDAILYREPORTNOTRELEASE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        DailyReportNotRelease: action.payload,
      };
    case ActionTypes.GETHOURLYPROPS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        hourlyProps: action.payload,
      };
    case ActionTypes.GETBANKWISEOVERALLSTATS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        bankWiseOverallStats: action.payload,
      };
    case ActionTypes.BILLCOUNT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billCount: action.payload,
      };

    case ActionTypes.FINAL_BILLS_LOADING:
      return { 
        ...state,
         isLoading: true,
          errMess: null
         };

    // case ActionTypes.FINAL_BILLS_FAILED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     errMess: action.payload,
    //     finalBills: [],
    //   };

    default:
      return state;
  }
};
