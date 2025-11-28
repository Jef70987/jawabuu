import React from "react";
import { Routes, Route } from "react-router-dom";
import TeacherSidebar from "../sidebars/TeacherSidebar";
import Dashboard from "./Dashboard";
import Assignments from "./Assignments";
import Attendance from "./Attendance";
import HelpSupport from "./HelpSupport";
import Settings from "./Settings";
import Timetable from "./Timetable";
import Reports from "./Reports";
import ClassMng from "./ClassMgnt";
import LearningMng from "./LearningMaterials";
import { Assessment } from "@mui/icons-material";

const Teacher = () => {
    return(
        <div style={{display: "flex" }}>
            <TeacherSidebar/>
            <div style={{ width:"90vw", Height:"100vh"}}>
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                    <Route path="/Assignments" element={<Assignments/>}/>
                    <Route path="/Assessment" element={<Assessment/>}/>
                    <Route path="/Attendance" element={<Attendance/>}/>
                    <Route path="/Class" element={<ClassMng/>}/>
                    <Route path="/Help&Support" element={<HelpSupport/>}/>
                    <Route path="/LearningMaterials" element={<LearningMng/>}/>
                    <Route path="/Timetable" element={<Timetable/>}/>
                    <Route path="/Settings" element={<Settings/>}/>
                    <Route path="/Reports" element={<Reports/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default Teacher;