import React from "react";
import componentLoader from "./componentLoader";

import Login from "./views/Components/Login/Login";
import EmployeeLogin from "./views/Components/Login/EmployeeLogin";
import BranchLogin from "./views/Components/Login/BranchLogin";
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";

//Dashboard
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const SiteDashboard = React.lazy(() => import("./views/DashboardSite"));
const BillStatistic = React.lazy(() => import("views/BillStatistic"));

//*Master Tab
const MasterTab = React.lazy(() =>
  import("./views/Components/MasterTab/MasterTab")
);
// // Task Management
const TaskManagement = React.lazy(() =>
  import("./views/Components/TaskManagement/TaskManagement")
);

//*Brokers
const Brokers = React.lazy(() => import("./views/Components/Brokers/Brokers"));

//*Company master
const CompanyMaster = React.lazy(() =>
  import("views/Components/CompanyMaster/CompanyMaster")
);

//*Pincode master
const PincodeMaster = React.lazy(() =>
  import("./views/Components/Pincodes/Pincodes")
);

//*payment master
const PaymentMaster = React.lazy(() =>
  import("./views/Components/PaymentMaster/PaymentMaster")
);

//*Projects
const Projects = React.lazy(() =>
  import("./views/Components/Projects/Projects")
);

//*case Master
const InitiatedCases = React.lazy(() =>
  import("./views/Components/CaseMaster/InitiatedCases/InitiatedCases")
);
const WorkInProgressCases = React.lazy(() =>
  import(
    "./views/Components/CaseMaster/WorkInProgressCases/WorkInProgressCases"
  )
);
const ViewWorkInProgress = React.lazy(() =>
  import("./views/Components/SplitScreeen/SplitScreen")
  // import("views/Components/SplitScreeen/SplitScreen")
);
const CompletedCases = React.lazy(() =>
  import("./views/Components/CaseMaster/CompletedCases/CompletedCases")
);
const CasesOnHold = React.lazy(() =>
  import("./views/Components/CaseMaster/CasesOnHold/CasesOnHold")
);
const CaseAllocation = React.lazy(() =>
  import("./views/Components/CaseMaster/CaseAllocation/CaseAllocation2")
);
const Dedupe = React.lazy(() =>
  import("./views/Components/CaseMaster/Deduce/Deduce")
);
//!

// //* MIS Master
const MisMaster = React.lazy(() =>
  import("./views/Components/MisMaster/MisMaster")
);
// //!

//* External Data
const ExternalData = React.lazy(() =>
  import("./views/Components/ExternalData/ExternalData")
);
//!

//*Employee Location
const EmployeeLocation = React.lazy(() =>
  import("./views/Components/EmployeeLocation/EmployeeLocation")
);
//!

//* User Creation and Page Rights
const UserCreation = React.lazy(() =>
  import("./views/Components/UserMaster&Rights/UserCreation")
);
const AssetsMaster = React.lazy(() =>
  import("./views/Components/UserMaster&Rights/AssrtsMaster/AssrtsMaster")
);
const OfferLetter = React.lazy(() =>
  import("./views/Components/UserMaster&Rights/OfferLetter/OfferLetter")
);
const LeavingLetter = React.lazy(() =>
  import("./views/Components/UserMaster&Rights/LeavingLetter/LeavingLetter")
);
const PageRights = React.lazy(() =>
  import("views/Components/UserMaster&Rights/PageRights/PageRights")
);
//!

//* Bank & Branch Master
const Bank = React.lazy(() =>
  import("./views/Components/Bank&BranchMaster/Bank/Bank")
);
const Branch = React.lazy(() =>
  import("./views/Components/Bank&BranchMaster/Branch/Branch")
);
const AgreementRenewal = React.lazy(() =>
  import(
    "./views/Components/Bank&BranchMaster/AgreementRenewal/AgreementRenewal"
  )
);
//!

//* MasterDocuments
const MasterDocuments = React.lazy(() =>
  import("./views/Components/MasterDocumets/MasterDocuments")
);
//!

//*ExternalDataUpload
const ExternalDataUpload = React.lazy(() =>
  import("./views/Components/ExternalDataUpload/ExternalDataUpload")
);
//!

//*NegativeProjectMaster
const NegativeProjectMaster = React.lazy(() =>
  import("./views/Components/NegativeProjectMaster/NegativeProjectsMaster")
);
//*NpaProjectMaster
const NpaProjectMaster = React.lazy(() =>
  import("./views/Components/NpaProjectMaster/NpaProjectsMaster")
);
//!

//* Bill Master
const BillInitiation = React.lazy(() =>
  import("./views/Components/BillMaster/BillInitiation/BillInitiation")
);
const BillInitiationAndApprove = React.lazy(() =>
  import(
    "./views/Components/BillMaster/BillInitiationAndApprove/BillInitiationAndApprove"
  )
);
const CompletedBill = React.lazy(() =>
  import("./views/Components/BillMaster/CompletedBill/CompletedBill")
);
const BillLevel3 = React.lazy(() =>
  import("./views/Components/BillMaster/BillLevel3/BillLevel3")
);
const BillDashboard = React.lazy(() =>
  import("./views/Components/BillMaster/BillDashboard/BillDashboard")
);
const TdsDetails = React.lazy(() =>
  import("./views/Components/BillMaster/TdsDetails/TdsDetails")
);
const PendingAmount = React.lazy(() =>
  import("./views/Components/BillMaster/PendingAmount/PendingAmount")
);
const UnBilledDetails = React.lazy(() =>
  import("./views/Components/BillMaster/UnBilledDetails/UnBilledDetails")
);
const CreditNoteApproval = React.lazy(() =>
  import("./views/Components/BillMaster/CreditNoteApproval/CreditNoteApproval")
);
const CreditNoteCreated = React.lazy(() =>
  import("./views/Components/BillMaster/CreditNoteCreated/CreditNoteCreated")
);
const BillHistory = React.lazy(() =>
  import("./views/Components/BillMaster/BillHistory/BillHistory")
);
//!

//*Components
const DcrGovPolicyLinks = React.lazy(() =>
  import("views/Components/DcrGovPolicyLinks/DcrGovPolicyLinks")
);
const TechnicalPolicyBank = React.lazy(() =>
  import("views/Components/TechnicalPolicyBank/TechnicalPolicyBank")
);
const RealEstateLinkState = React.lazy(() =>
  import("views/Components/RealEstateLinkState/RealEstateLinkState")
);
const UnderConstructionProjects = React.lazy(() =>
  import("views/Components/UnderConstructionProjects/UnderConstructionProjects")
);
const RealResearchGraphs = React.lazy(() =>
  import("views/Components/RealResearchGraphs/RealResearchGraphs")
);

//*AVM
const Avm = React.lazy(() => import("views/Components/Avm/Avm"));

//*Bank Dashboard
const BranchDashboard = React.lazy(() =>
  import("views/Components/BranchDashboard/BranchDashboard")
);

//*Quries
const Quries = React.lazy(() => import("views/Components/Queries/Queries"));
const Tickets = React.lazy(() => import("./views/Components/Tickets/Tickets"));

//* SplitScreen

// const SplitScreen = React.lazy(() =>
//   import("views/Components/SplitScreeen/SplitScreen")
// );

const Learnings = React.lazy(() =>
  import("views/Components/LearningsPage/Learnings")
);
const SoftwareTutorial = React.lazy(() =>
  import("views/Components/SoftwareTutorial/SoftwareTutorial")
);

const MailSettings = React.lazy(() =>
  import("views/Components/MailSettings/MailSettings")
);

//*SplitScreen Compoenets
const SiteEngineer1 = React.lazy(() =>
  import(
    // "views/Components/SplitScreeen/SplitComponents/SiteEngineer1/SiteEngineer1"
    "./views/Components/SplitScreeen/SplitComponents/SiteEngineer1/SiteEngineer1"
  )
);

const CourierDetails = React.lazy(() =>
  import("./views/Components/Courier/CourierDetails")
);
const ReceivedCourier = React.lazy(() =>
  import("./views/Components/ReceivedCourier/ReceivedCourierDetails")
);
const ProjectReportDetails = React.lazy(() =>
  import("./views/Components/ProjectReport/ProjectReportDetails")
);
const ReadyRecknerMasterDetails = React.lazy(() =>
  import("./views/Components/ReadyRecknerMaster/ReadyRecknerMasterDetails")
);
const CasesUplaodedOnlineDetails = React.lazy(() =>
  import("./views/Components/CasesUplaodedOnline/CasesUplaodedOnlineDetails")
);
const ExpenseManagement = React.lazy(() =>
  import("./views/Components/Expense management/ExpenseManagement")
);
const LeaveManagement = React.lazy(() =>
  import("./views/Components/Leave Management/LeaveManagement")
);
const Matrix = React.lazy(() =>
  import("./views/Components/MatrixLevel3/Matrixs")
);
const BranchMaster = React.lazy(() =>
  import("./views/Components/Branch Master/BranchManagement")
);
const CompanyDocument = React.lazy(() =>
  import("./views/Components/CompanyDocument/CompanyDocument")
);
const EmailDetail = React.lazy(() =>
  import("./views/Components/Email/EmailManagement")
);
const UploadDocuments = React.lazy(() =>
  import("./views/Components/CaseMaster/InitiatedCases/DocumentsUploadPage")
);

var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/employeeLogin",
    name: "Employee Login",
    icon: "ni ni-key-25 text-info",
    component: EmployeeLogin,
    layout: "/auth",
  },
  {
    path: "/branchlogin",
    name: "Branch Login",
    icon: "ni ni-key-25 text-info",
    component: BranchLogin,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard 2",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/siteDashboard",
    name: "Site Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: SiteDashboard,
    layout: "/admin",
  },
  {
    path: "/bill-statistics",
    name: "Bill Statistics",
    icon: "ni ni-tv-2 text-primary",
    component: BillStatistic,
    layout: "/admin",
  },
  {
    path: "/masterTab",
    name: "Master Tab",
    icon: "ni ni-tv-2 text-primary",
    component: MasterTab,
    layout: "/admin",
  },
  {
    path: "/task-management",
    name: "Master Tab",
    icon: "ni ni-tv-2 text-primary",
    component: TaskManagement,
    layout: "/admin",
  },

  //*Broker
  {
    path: "/brokers",
    name: "Brokers",
    icon: "ni ni-tv-2 text-primary",
    component: Brokers,
    layout: "/admin",
  },

  //*
  {
    path: "/companymaster",
    name: "Company Master",
    icon: "ni ni-tv-2 text-primary",
    component: CompanyMaster,
    layout: "/admin",
  },

  //*Projects
  {
    path: "/projects",
    name: "Projects",
    icon: "ni ni-tv-2 text-primary",
    component: Projects,
    layout: "/admin",
  },

  //*Pincodes Master
  {
    path: "/pincodes",
    name: "Pincodes",
    icon: "ni ni-tv-2 text-primary",
    component: PincodeMaster,
    layout: "/admin",
  },

  //*Payment Master
  {
    path: "/payment-master",
    name: "Libra Bank Details",
    icon: "ni ni-tv-2 text-primary",
    component: PaymentMaster,
    layout: "/admin",
  },

  //* Case master
  {
    path: "/initiatedCases",
    name: "Initiate Cases",
    icon: "ni ni-tv-2 text-primary",
    component: InitiatedCases,
    layout: "/admin",
  },
  {
    path: "/workInProgressCases",
    name: "Work In Progress Cases",
    icon: "ni ni-tv-2 text-primary",
    component: WorkInProgressCases,
    layout: "/admin",
  },

  {
    path: "/completedCases",
    name: "Completed Cases",
    icon: "ni ni-tv-2 text-primary",
    component: CompletedCases,
    layout: "/admin",
  },
  {
    path: "/casesOnHold",
    name: "Cases On Hold",
    icon: "ni ni-tv-2 text-primary",
    component: CasesOnHold,
    layout: "/admin",
  },

  {
    path: "/caseAllocation",
    name: "Cases Allocation",
    icon: "ni ni-tv-2 text-primary",
    component: CaseAllocation,
    layout: "/admin",
  },

  {
    path: "/dedupe",
    name: "Dedupe",
    icon: "ni ni-tv-2 text-primary",
    component: Dedupe,
    layout: "/admin",
  },

  //* Mis master
  {
    path: "/misMaster",
    name: "MIS Master",
    icon: "ni ni-tv-2 text-primary",
    component: MisMaster,
    layout: "/admin",
  },

  {
    path: "/externalData",
    name: "External Data",
    icon: "ni ni-tv-2 text-primary",
    component: ExternalData,
    layout: "/admin",
  },

  {
    path: "/employeeLocation",
    name: "Employee Location",
    icon: "ni ni-tv-2 text-primary",
    component: EmployeeLocation,
    layout: "/admin",
  },

  {
    path: "/pageRights",
    name: "Page Rights",
    icon: "ni ni-tv-2 text-primary",
    component: PageRights,
    layout: "/admin",
  },

  //* Bank & Branch Master
  {
    path: "/bank",
    name: "Bank",
    icon: "ni ni-tv-2 text-primary",
    component: Bank,
    layout: "/admin",
  },

  {
    path: "/branch",
    name: "Branch",
    icon: "ni ni-tv-2 text-primary",
    component: Branch,
    layout: "/admin",
  },
  {
    path: "/agreementRenewal",
    name: "Agreement Renewal",
    icon: "ni ni-tv-2 text-primary",
    component: AgreementRenewal,
    layout: "/admin",
  },
  //*

  {
    path: "/externalDataUpload",
    name: "External Data Upload",
    icon: "ni ni-tv-2 text-primary",
    component: ExternalDataUpload,
    layout: "/admin",
  },

  {
    path: "/negativeProjectMaster",
    name: "Negative Project Master",
    icon: "ni ni-tv-2 text-primary",
    component: NegativeProjectMaster,
    layout: "/admin",
  },
  {
    path: "/npaProjectMaster",
    name: "NPA Project Master",
    icon: "ni ni-tv-2 text-primary",
    component: NpaProjectMaster,
    layout: "/admin",
  },

  //* Bill Master
  {
    path: "/billInitiation",
    name: "Bill Generate",
    icon: "ni ni-tv-2 text-primary",
    component: BillInitiation,
    layout: "/admin",
  },
  {
    path: "/billInitiationAndApproval",
    name: "Bill Initiation And Approval",
    icon: "ni ni-tv-2 text-primary",
    component: BillInitiationAndApprove,
    layout: "/admin",
  },
  {
    path: "/completedBill",
    name: "Completed Bill",
    icon: "ni ni-tv-2 text-primary",
    component: CompletedBill,
    layout: "/admin",
  },
  {
    path: "/billLevel3",
    name: "CA Level",
    icon: "ni ni-tv-2 text-primary",
    component: BillLevel3,
    layout: "/admin",
  },
  {
    path: "/billDashboard",
    name: "Bill Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: BillDashboard,
    layout: "/admin",
  },
  {
    path: "/tdsDetails",
    name: "TDS Details",
    icon: "ni ni-tv-2 text-primary",
    component: TdsDetails,
    layout: "/admin",
  },
  {
    path: "/pendingAmount",
    name: "Pending Amount",
    icon: "ni ni-tv-2 text-primary",
    component: PendingAmount,
    layout: "/admin",
  },
  {
    path: "/unBilledDetails",
    name: "Un-Billed Details",
    icon: "ni ni-tv-2 text-primary",
    component: UnBilledDetails,
    layout: "/admin",
  },
  {
    path: "/creditNoteApproval",
    name: "Credit Note Approval",
    icon: "ni ni-tv-2 text-primary",
    component: CreditNoteApproval,
    layout: "/admin",
  },
  {
    path: "/creditNoteCreated",
    name: "Credit Note Created",
    icon: "ni ni-tv-2 text-primary",
    component: CreditNoteCreated,
    layout: "/admin",
  },
  {
    path: "/BillHistory",
    name: "Bill History",
    icon: "ni ni-tv-2 text-primary",
    component: BillHistory,
    layout: "/admin",
  },

  //*

  {
    path: "/viewWorkInProgress/:id",
    name: "Work In Progress Case",
    icon: "ni ni-tv-2 text-primary",
    component: ViewWorkInProgress,
    layout: "/admin",
  },
  {
    path: "/viewWorkInProgress",
    name: "Work In Progress Case",
    icon: "ni ni-tv-2 text-primary",
    component: ViewWorkInProgress,
    layout: "/admin",
  },
  {
    path: "/dcrGovPolicyLinks",
    name: "DCR/GOV Policy Links",
    icon: "ni ni-tv-2 text-primary",
    component: DcrGovPolicyLinks,
    layout: "/admin",
  },
  {
    path: "/technicalPolicyBank",
    name: "Technical Policy(Bank)",
    icon: "ni ni-tv-2 text-primary",
    component: TechnicalPolicyBank,
    layout: "/admin",
  },
  {
    path: "/realEstateLinkState",
    name: "Real Estate Link State",
    icon: "ni ni-tv-2 text-primary",
    component: RealEstateLinkState,
    layout: "/admin",
  },
  {
    path: "/underConstructionProjects",
    name: "Under Construction Projects",
    icon: "ni ni-tv-2 text-primary",
    component: UnderConstructionProjects,
    layout: "/admin",
  },
  {
    path: "/realResearchGraphs",
    name: "Real Research Graphs",
    icon: "ni ni-tv-2 text-primary",
    component: RealResearchGraphs,
    layout: "/admin",
  },

  {
    path: "/avm",
    name: "AVM",
    icon: "ni ni-tv-2 text-primary",
    component: Avm,
    layout: "/admin",
  },

  {
    path: "/branchDashboard",
    name: "BranchDashboard",
    icon: "ni ni-tv-2 text-primary",
    component: BranchDashboard,
    layout: "/admin",
  },
  {
    path: "/queries",
    name: "Queries",
    icon: "ni ni-tv-2 text-primary",
    component: Quries,
    layout: "/admin",
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: "ni ni-tv-2 text-primary",
    component: Tickets,
    layout: "/admin",
  },
  {
    path: "/masterDocuments",
    name: "Master Documents",
    icon: "ni ni-tv-2 text-primary",
    component: MasterDocuments,
    layout: "/admin",
  },

  {
    path: "/learnings",
    name: "Learnings",
    icon: "ni ni-tv-2 text-primary",
    component: Learnings,
    layout: "/admin",
  },
  {
    path: "/softwareTutorial",
    name: "Software Tutorial",
    icon: "ni ni-tv-2 text-primary",
    component: SoftwareTutorial,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },

  //* User Creation
  {
    path: "/userCreation",
    name: "User Creation",
    icon: "ni ni-tv-2 text-primary",
    component: UserCreation,
    layout: "/admin",
  },
  {
    path: "/assetsMaster",
    name: "Assets Master",
    icon: "ni ni-tv-2 text-primary",
    component: AssetsMaster,
    layout: "/admin",
  },
  {
    path: "/offerLetter",
    name: "Offer Letter",
    icon: "ni ni-tv-2 text-primary",
    component: OfferLetter,
    layout: "/admin",
  },
  {
    path: "/leavingLetter",
    name: "Leaving Letter",
    icon: "ni ni-tv-2 text-primary",
    component: LeavingLetter,
    layout: "/admin",
  },

  //* Mail Settings
  {
    path: "/mailSettings",
    name: "Mail Settings",
    icon: "ni ni-tv-2 text-primary",
    component: MailSettings,
    layout: "/admin",
  },

  //*SplitScreen
  // {
  //   path: "/splitScreen",
  //   name: "Split Screen",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: SplitScreen,
  //   layout: "/admin",
  // },

  {
    path: "/siteEngineer1",
    name: "Site Engineer #1",
    icon: "ni ni-tv-2 text-primary",
    component: SiteEngineer1,
    layout: "/admin",
  },
  {
    path: "/courier",
    name: "Courier Details",
    icon: "ni ni-tv-2 text-primary",
    component: CourierDetails,
    layout: "/admin",
  },
  {
    path: "/receivedCourier",
    name: "Received Courier",
    icon: "ni ni-tv-2 text-primary",
    component: ReceivedCourier,
    layout: "/admin",
  },
  {
    path: "/ProjectReport",
    name: "Project Report",
    icon: "ni ni-tv-2 text-primary",
    component: ProjectReportDetails,
    layout: "/admin",
  },
  {
    path: "/ReadyRecknerMaster",
    name: "Ready Reckoner Master",
    icon: "ni ni-tv-2 text-primary",
    component: ReadyRecknerMasterDetails,
    layout: "/admin",
  },
  {
    path: "/CasesUplaodedOnline",
    name: "Cases Uplaoded Online Filed",
    icon: "ni ni-tv-2 text-primary",
    component: CasesUplaodedOnlineDetails,
    layout: "/admin",
  },
  {
    path: "/ExpenseManagement",
    name: "Expense Management",
    icon: "ni ni-tv-2 text-primary",
    component: ExpenseManagement,
    layout: "/admin",
  },
  {
    path: "/LeaveManagement",
    name: "Leave Management",
    icon: "ni ni-tv-2 text-primary",
    component: LeaveManagement,
    layout: "/admin",
  },
  {
    path: "/matrixs",
    name: "Internal System Approval Matrix",
    icon: "ni ni-tv-2 text-primary",
    component: Matrix,
    layout: "/admin",
  },
  {
    path: "/branchMaster",
    name: "Libra Branch Master",
    icon: "ni ni-tv-2 text-primary",
    component: BranchMaster,
    layout: "/admin",
  },
  {
    path: "/companyDocument",
    name: "Libra Company Document",
    icon: "ni ni-tv-2 text-primary",
    component: CompanyDocument,
    layout: "/admin",
  },
  {
    path: "/emailDetail",
    name: "Email Detail",
    icon: "ni ni-tv-2 text-primary",
    component: EmailDetail,
    layout: "/admin",
  },
  {
    path: "/uploadDocuments/:id",
    name: "Upload Documents",
    icon: "ni ni-tv-2 text-primary",
    component: UploadDocuments,
    layout: "/admin",
  },
  //*
];
export default routes;
