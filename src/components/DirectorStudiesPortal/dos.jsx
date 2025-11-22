import React from "react";
import { Routes, Route } from "react-router-dom";
import  DosSidebarData from "../sidebars/DirectorStudiesSidebar";
import Dashboard from "./Dashboard";
import Assessment from "./Assessment";
import Student from "./Student";
import Attendance from "./Attendance";
import ClassMgnt from "./ClassMgnt";
import Communication from "./Communication";
import HelpSupport from "./HelpSupport";
import LearningMaterials from "./LearningMaterials";
//import PerformanceTracking from "./PerformanceTracking";
import Settings from "./Settings";
import Timetable from "./Timetable";
import Reports from "./Reports";

const Academic = () => {
    return(
        <div style={{display: "flex" }}>
            < DosSidebarData/>
            <div style={{flexGrow: 1 , padding: "20px"}}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/Assessment" element={<Assessment/>}/>
                    <Route path="/Student" element={<Student/>}/>
                    <Route path="/Attendance" element={<Attendance/>}/>
                    <Route path="/ClassMgnt" element={<ClassMgnt/>}/>
                    <Route path="/Communication" element={<Communication/>}/>
                    <Route path="/HelpSupport" element={<HelpSupport/>}/>
                    <Route path="/LearningMaterials" element={<LearningMaterials/>}/>
                    <Route path="/Timetable" element={<Timetable/>}/>
                    <Route path="/Settings" element={<Settings/>}/>
                    
                    <Route path="/Reports" element={<Reports/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default Academic;