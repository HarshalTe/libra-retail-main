import { combineReducers } from "redux";

import { Login } from "./login";
import { Users } from "./users";
import { Dropdowns } from "./dropdowns";
import { DropdownDetails } from "./dropdownDetails";
import { Banks } from "./banks";
import { Branches } from "./branches";
import { NegativeProjects } from "./negativeProjects";
import { ExternalData } from "./externalData";
import { DcrGovPolicy } from "./dcrGovPolicy";
import { States } from "./states";
import { RealEstateState } from "./realEstateState";
import { TechPolicy } from "./technicalPolicy";
import { TechTypes } from "./techTypes";
import { UnderConstructProjects } from "./underConstructProjects";
import { AgreementsRenewal } from "./agreementRenewal";
import { Properties } from "./properties";
import { CompletedProperties } from "./propertiesCompleted";
import { Property } from "./ViewWorkInProgress";
import { Projects } from "./projects";
import { Brokers } from "./brokers";
import { BrokerApi } from "./brokerApi";
import { Deduce } from "./deduce";
import { ProjectStage } from "./projectStage";
import { UnitDetails } from "./unitDetails";
import { Occupation } from "./Occupation";
import { Specifications } from "./Specifications";
import { Surroundings } from "./Surroundings";
import { Observations } from "./Observations";
import { Deviation } from "./Deviation";
import { Ndmc } from "./NDMC";
import { GoogleApi } from "./GoogleApiR";
import { Measurement } from "./measurement";
import { Valuation } from "./Valuation";
import { SaleRates } from "./SaleRate";
import { Compliances } from "./Compliances";
import { SpecialRemark } from "./SpecialRemark";
import { Annexures } from "./Annexure";
import { Queries } from "./Queries";
import { Bills } from "./Bills";
import { BankVerticals } from "./bankVerticals";
import { BankProducts } from "./bankProducts";
import { SiteInspectors } from "./SiteInspectors";
import { FinalBills } from "./FinalBills";
import { Avm } from "./Avm";
import { Companies } from "./Companies";
import { GeoTags } from "./GeoTags";
import { StageCalculator } from "./StageCalculator";
import { HomeImprovement } from "./homeImprovement";
import { Documents } from "./Documents";
import { EmployeeLocation } from "./EmployeeLocation";
import { AssignProperty } from "./AssignProperty";
import { PropertyPhotographs } from "./PropertyPhotographs";
import { OfflineProperties } from "./OfflineProperties";
import { Pincodes } from "./Pincodes";
import { BillDashboard } from "./BillDashboard";
import { PaymentMaster } from "./PaymentMaster";
import HardCopies from "../Entites/HardCopies";
import AdminProgressBar from "./AdminProgressBar";
import {Tasks} from "./TaskMaganement";
import {Expenses} from "./ExpensesManagement";
import {Leaves} from "./LeaveManagements";
import {IniciateDocument} from "./IniciateDocument";
import {Graph} from "./Graph";
import {ReadyReckners} from "./ReadyReckner";
import {BillGraph} from "./BillGraph";
import {MailType} from "./MailType";
import {MailTime} from "./MailTime";
import {BranchMaster} from "./BranchMaster";
import {CompanyDocument} from "./CompanyDocument";
import {PropertiesLocation} from "./PropertiesLocation";
import {CompaniesMaster} from "./CompaniesMaster";
import {Matrixs} from "./Matrix";
import {Comparable} from "./Comparable";
import {Assets} from "./Assets";
import {OfferLetters} from "./OfferLetter";
import {RelievingLetters} from "./LeavingLetter";
import {Tickets} from "./Tickets";
import {Learnings} from "./Learnings";
import {ProjectDocument} from "./ProjectDocument";

export const rootReducer = combineReducers({
  login: Login,
  users: Users,
  dropdowns: Dropdowns,
  dropdownDetails: DropdownDetails,
  banks: Banks,
  branches: Branches,
  negativeProjects: NegativeProjects,
  externalData: ExternalData,
  dcrGovPolicy: DcrGovPolicy,
  states: States,
  realEstateState: RealEstateState,
  techPolicy: TechPolicy,
  techTypes: TechTypes,
  underConstructProjects: UnderConstructProjects,
  agreements: AgreementsRenewal,
  properties: Properties,
  completedProperties: CompletedProperties,
  property: Property,
  projects: Projects,
  brokers: Brokers,
  brokerApi: BrokerApi,
  deduce: Deduce,
  projectStage: ProjectStage,
  unitDetails: UnitDetails,
  occupation: Occupation,
  specifications: Specifications,
  surroundings: Surroundings,
  observations: Observations,
  deviation: Deviation,
  ndmc: Ndmc,
  googleApi: GoogleApi,
  measurement: Measurement,
  valuation: Valuation,
  saleRates: SaleRates,
  compliances: Compliances,
  specialRemark: SpecialRemark,
  annexures: Annexures,
  queries: Queries,
  bills: Bills,
  bankVerticals: BankVerticals,
  bankProducts: BankProducts,
  siteInspectors: SiteInspectors,
  finalBills: FinalBills,
  avm: Avm,
  companies: Companies,
  geoTags: GeoTags,
  stageCalculator: StageCalculator,
  homeImprovement: HomeImprovement,
  documents: Documents,
  employeeLocation: EmployeeLocation,
  assignProperty: AssignProperty,
  propertyPhotographs: PropertyPhotographs,
  offlineProperties: OfflineProperties,
  pincodes: Pincodes,
  billDashboard: BillDashboard,
  paymentMaster: PaymentMaster,
  hardCopies: HardCopies,
  AdminProgressBar:AdminProgressBar,
  tasks:Tasks,
  expenses:Expenses,
  leaves:Leaves,
  iniciateDocument:IniciateDocument,
  graph:Graph,
  readyReckners:ReadyReckners,
  billGraph:BillGraph,
  mailType:MailType,
  mailTime:MailTime,
  branchMaster:BranchMaster,
  companyDocument:CompanyDocument,
  propertiesLocation:PropertiesLocation,
  companiesmaster:CompaniesMaster,
  matrixs:Matrixs,
  comparable:Comparable,
  assets:Assets,
  offerLetters:OfferLetters,
  relievingLetters:RelievingLetters,
  tickets:Tickets,
  learnings:Learnings,
  projectDocument:ProjectDocument,
});
