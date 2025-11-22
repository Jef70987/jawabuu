import React from "react";
import { Routes, Route } from "react-router-dom"
import FinanceSidebar from "../sidebars/FinanceSidebar";
import Dashboard from "./Dashboard";
import FeeManagement from "./FeeManagement";
import PayrollManagement from "./PayrollManagement";
import ExpenseManagement from "./ExpenseManagement";
import Report from "./Report";
import HelpSupport from "./HelpSupport";
import Settings from "./Settings";
import Login from "../Authentication/Login";
import SidebarData from "../../data/FinanceSidebarData";


const Finance = () => {
    return(
        <div style={{display: "flex" }}>
            <FinanceSidebar/>
            <div className="mobile-container" >
                <nav className="top-nav" >
                    {SidebarData.slice(0, 17).map((item, index) => (
                        <a href={item.link} key={index} className="nav-item" >
                            {item.icon}
                            <span>{item.title}</span>
                        </a>
                    ))}
                </nav>
                <div style={{flexGrow: 1 , padding: "20px"}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/Dashboard" element={<Dashboard/>}/>
                        <Route path="/FeeManagement" element={<FeeManagement/>}/>
                        <Route path="/PayrollManagement" element={<PayrollManagement/>}/>
                        <Route path="/ExpenseManagement" element={<ExpenseManagement/>}/>
                        <Route path="/Report" element={<Report/>}/>
                        <Route path="/HelpSupport" element={<HelpSupport/>}/>
                        <Route path="/Settings" element={<Settings/>}/>
                    </Routes>
                </div>
                </div>
        </div>
    );
};

export default Finance;