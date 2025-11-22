import React from "react"
import { Routes, Route } from "react-router-dom";
import DeputySidebar from "../sidebars/DeputySidebar";
import Dashboard from "./Dashboard";
import Admission from "./Admission";
import AttendanceResults from "./AttendanceResults";
import EventNotices from "./EventsNotices";
import FinancialManagement from "./FinancialManagement";
import HelpSupport from "./HelpSupport";
import HostelManagement from "./HostelManagement";
import Discipline from "./Discipline";
import Reports from "./Reports";
import PortalSettings from "./PortalSettings";
import Timetable from "./Timetable";
import UserManagement from "./UserManagement";
import Login from "../Authentication/Login";

const DeputyAdmin  = () => {
    return(
        <div style={{display: "flex" }}>
            <DeputySidebar/>
            <div style={{flexGrow: 1 , padding: "20px"}}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/Admission" element={<Admission/>}/>
                    <Route path="/AttendanceResults" element={<AttendanceResults/>}/>
                    <Route path="/EventNotices" element={<EventNotices/>}/>
                    <Route path="/FinancialManagement" element={<FinancialManagement/>}/>
                    <Route path="/HelpSupport" element={<HelpSupport/>}/>
                    <Route path="/HostelManagement" element={<HostelManagement/>}/>
                    <Route path="/Discipline" element={<Discipline/>}/>
                    <Route path="/Reports" element={<Reports/>}/>
                    <Route path="/PortalSettings" element={<PortalSettings/>}/>
                    <Route path="/Timetable" element={<Timetable/>}/>
                    <Route path="/UserManagement" element={<UserManagement/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default DeputyAdmin;