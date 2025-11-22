import React from "react";
import { Routes, Route } from "react-router-dom"
import BursarSidebar from "../sidebars/BursarSidebar";
import BursarDashboard from "./Dashboard";
import PaymentRecords from "./PaymentRecords";
import FeeStructure from "./FeeStructure";
import Payment from "./PaymentManagement";
import Report from "./Report";
import HelpSupport from "./HelpSupport";
import Settings from "./Settings";
import Login from "../Authentication/Login";

const Bursar = () => {
    return(
        <div style={{display: "flex" }}>
            <BursarSidebar/>
            <div style={{flexGrow: 1 , padding: "20px"}}>
                <Routes>
                    <Route path="/" element={<BursarDashboard/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/BursarDashboard" element={<BursarDashboard/>}/>
                    <Route path="/PaymentRecords" element={<PaymentRecords/>}/>
                    <Route path="/FeeStructure" element={<FeeStructure/>}/>
                    <Route path="/Payment" element={<Payment/>}/>
                    <Route path="/Report" element={<Report/>}/>
                    <Route path="/HelpSupport" element={<HelpSupport/>}/>
                    <Route path="/Settings" element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Bursar;