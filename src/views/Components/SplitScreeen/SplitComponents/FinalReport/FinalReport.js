import React from "react";

import RealReport from "./RealReport";
import "./Report1.css";
import { connect } from "react-redux";


//*Component
import Report1 from "./Report1";
import CompleteButton from "./CompleteButton";
import CompleteBtnLevels from "./CompleteBtnLevels";
import AdityaBirlaHousingFinanceLtd from "./AdityaBirlaHousingFinanceLtd";
import AdityaBirlaFinanceLimited from "./AdityaBirlaFinanceLimited";
import AxisFinanceLtd from "./AxisFinanceLtd";
import DeutscheBankMumbai from "./DeutscheBankMumbai";
import EdelweisKurla from "./EdelweisKurla";
import GodrejHousingFinance from "./GodrejHousingFinance";
import HdbReportFormat from "./HdbReportFormat";
import JanaSmallFinancebankLtd from "./JanaSmallFinancebankLtd";
import PoonawalaAndheri from "./PoonawalaAndheri";
import ShriRamFinanceLimited from "./ShriRamFinanceLimited";
import UgroCapitalLtd from "./UgroCapitalLtd";
import UtakarshVashi from "./UtakarshVashi";
import YesBankLimited from "./YesBankLimited";
import NpaTechnicalEsfb from "./NpaTechnicalEsfb";
import CsbFormat from "./CsbFormat";
import Dcbbank from "./Dcbbank";
import Fedfina from "./Fedfina";
import HdbReport from "./HdbReport";
import IdfcReport from "./IdfcReport";
import KogtaFinantial from "./KogtaFinantial";
import ReportOne from "./ReportOne";
import RblReport from "./RblReport";
import RohanewFromat from "./RohanewFromat";
import RohaReport from "./RohaReport";
import Report122 from "./Report122";
function FinalReport(props) {
  return (
    <div>
      Final Report 
      {/* {props?.login?.login?.user?.role == "Level-3"|| props?.login?.login?.user?.role == "admin" ? <CompleteButton /> : <CompleteBtnLevels/>} */}
      <div className="w-85">
        {/*<RohaReport/>*/}
       {/* <RohanewFromat/> */}
         {/*  <RblReport/> */}
        {/* <ReportOne/> */}
        {/*<KogtaFinantial/>*/} 
     {/* <IdfcReport/> */}
      {/*  <HdbReport/> */}
       {/* <CsbFormat/> */}
      {/* <Dcbbank/> */}
      {/* <Fedfina/> */}




       {/* <AdityaBirlaHousingFinanceLtd /> */}
         <Report1/> 
       {/* <AdityaBirlaFinanceLimited/> */}
        {/* <AxisFinanceLtd/> */}
      {/* <DeutscheBankMumbai/> */}
       {/* <EdelweisKurla/> */}
      {/* <GodrejHousingFinance/> */}
      {/*  <HdbReportFormat/> */}
     {/*  <JanaSmallFinancebankLtd/> */}
      {/* <PoonawalaAndheri/> */}
      {/* <ShriRamFinanceLimited/> */}
     {/* <UgroCapitalLtd/>  */}
     {/* <UtakarshVashi/> */}
   {/* <YesBankLimited/> */}
   {/* <NpaTechnicalEsfb/> */}
 {/*  <HdbReport/> */}
        {/* <RealReport /> */}

      </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalReport);