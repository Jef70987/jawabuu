import React from "react"
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../sidebars/AdminSidebar";
import Dashboard from "./Dashboard";
import Admission from "./Admission";
import AttendanceResults from "./AttendanceResults";
import CurriculumnMgmt from "./CurriculumnMgmt";
import EventNotices from "./EventsNotices";
import FinancialManagement from "./FinancialManagement";
import HelpSupport from "./HelpSupport";
import HostelManagement from "./HostelManagement";
import PerformanceAnalytics from "./PerformanceAnalytics";
import Reports from "./Reports";
import PortalSettings from "./PortalSettings";
import Timetable from "./Timetable";
import UserManagement from "./UserManagement";
import Login from "../Authentication/Login";

const Admin  = () => {
    return(
        <div style={{display: "flex" }}>
            <AdminSidebar/>
            <div style={{flexGrow: 1 , padding: "20px"}}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/Admission" element={<Admission/>}/>
                    <Route path="/AttendanceResults" element={<AttendanceResults/>}/>
                    <Route path="/CurriculumnMgmt" element={<CurriculumnMgmt/>}/>
                    <Route path="/EventNotices" element={<EventNotices/>}/>
                    <Route path="/FinancialManagement" element={<FinancialManagement/>}/>
                    <Route path="/HelpSupport" element={<HelpSupport/>}/>
                    <Route path="/HostelManagement" element={<HostelManagement/>}/>
                    <Route path="/PerformanceAnalytics" element={<PerformanceAnalytics/>}/>
                    <Route path="/Reports" element={<Reports/>}/>
                    <Route path="/PortalSettings" element={<PortalSettings/>}/>
                    <Route path="/Timetable" element={<Timetable/>}/>
                    <Route path="/UserManagement" element={<UserManagement/>}/>
                </Routes>
            </div>
        </div>
    );
};
 export default Admin;