import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentSidebar from "../sidebars/StudentSidebar";
import Dashboard from "./Dashboard";
import AcademicRecords from "./AcademicRecord";
import Bot from "./Bot";
import CareerGuidance from "./Analytics";
import FeeManagement from "./FeeManagement";
import Settings from "./Settings";
import StudentProfile from "./StudentProfile";
import ExtraCurriculumn from "./ExtraCurriculumn"
import Login from "../Authentication/Login";
import Notices from "./HostelActivities";
import LearningPlatform from "./learningMaterials";
import StudentHelpSupport from "./HelpSupport";

const Student = () => {
    return(
        <div style={{ display: "flex", height: "100vh", overflow: "hidden",gap:"2px" }}>
            {/* Sidebar */}
            <div style={{ flexShrink: 0 }}>
                <StudentSidebar/>
            </div>
            
            {/* Main Content Area */}
            <div style={{ 
                flex: 1, 
                overflowY: "auto",
                padding: "0px 0rem",
                backgroundColor: "#f8fafc",
                minHeight: "100vh"
            }}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/AcademicRecord" element={<AcademicRecords/>}/>
                    <Route path="/Bot" element={<Bot/>}/>
                    <Route path="/CareerGuidance" element={<CareerGuidance/>}/>
                    <Route path="/FeeManagement" element={<FeeManagement/>}/>
                    <Route path="/Notices" element={<Notices/>}/>
                    <Route path="/Learning" element={<LearningPlatform/>}/>
                    <Route path="/ExtraCurriculumn" element={<ExtraCurriculumn/>}/>
                    <Route path="/Settings" element={<Settings/>}/>
                    <Route path="/Help&Support" element={<StudentHelpSupport/>}/>
                    <Route path="/StudentProfile" element={<StudentProfile/>}/>
                    <Route path="*" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Student;