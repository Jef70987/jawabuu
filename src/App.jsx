import React from "react";
import './App.css';
import { BrowserRouter as Router , Routes ,Route } from "react-router-dom";
import Teacher from "./components/TeacherPortal/Teacher";
import Admin from "./components/AdminPortal/Admin";
import DeputyAdmin from "./components/DeputyAdminPortal/DeputyAdmin";
import Student from "./components/StudentPortal/Student";
import Finance from "./components/FinancePortal/Finance";
import Bursar from "./components/BursarPortal/Bursar";
import Login from "./components/Authentication/Login";
import Academic from "./components/DirectorStudiesPortal/dos";
import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./components/Authentication/Layout/ProtectedRoute";
function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Login/" element={<Login/>}/>
                <Route path="/StudentPortal/" element={<Student/>}/>
                {/* wrapping all portals with ProtectedRoute */}
                
                <Route path="/AdminPortal/*" element={
                  
                        <Admin/>
                    
                    }/>
                <Route path="/StudentPortal/*" element={
                  
                        <Student/>
                  
                    }/>
                <Route path="/FinancePortal/*" element={
                    
                        <Finance/>
                    
                        }/>
                <Route path="/BursarPortal/*" element={
                    
                        <Bursar/>
                   
                        }/>
                <Route path="/DeputyAdminPortal/*" element={
                    
                        <DeputyAdmin/>
                    
                        }/>
                <Route path="/DirectorStudiesPortal/*" element={
                    
                        <Academic/>
                   
                        }/>
                <Route path="/TeacherPortal/*" element={
                   
                        <Teacher/>
                    
                        }/>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </Router>
    );
}
export default App;