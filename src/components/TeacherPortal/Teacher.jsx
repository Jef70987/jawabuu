import React from "react";
import { Routes, Route } from "react-router-dom";
import TeacherSidebar from "../sidebars/TeacherSidebar";
import Dashboard from "./Dashboard";
import Assessment from "./Assessment";
import Assignments from "./Assignments";
import Attendance from "./Attendance";
import ClassMgnt from "./ClassMgnt";
import Communication from "./Communication";
import HelpSupport from "./HelpSupport";
import LearningMaterials from "./LearningMaterials";
//import PerformanceTracking from "./PerformanceTracking";
import Settings from "./Settings";
import Timetable from "./Timetable";
import Reports from "./Reports";
import Login from "../Authentication/Login";

const Teacher = () => {
    return(
        <div style={{display: "flex" }}>
            <TeacherSidebar/>
            <div style={{ width:"90vw", Height:"100vh"}}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/Assessment" element={<Assessment/>}/>
                    <Route path="/Assignments" element={<Assignments/>}/>
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
export default Teacher;