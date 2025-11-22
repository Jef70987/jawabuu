/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BarChartIcon from '@mui/icons-material/BarChart';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const  DosSidebarData = [
    {
    title: "LogOut",
    icon: <LogoutIcon sx={{color:'red',fontSize:30}}/>,
    link: "/Login"
    },
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/DirectorStudiesPortal/Dashboard"
    },
    {
        title: "Class ",
        icon: <ClassIcon />,
        link: "/DirectorStudiesPortal/ClassMgnt"
    },
    {
        title: "Assessment",
        icon: <AssessmentIcon />,
        link: "/DirectorStudiesPortal/Assessment"
    },
    {
        title: "Student",
        icon: <AssignmentIcon />,
        link: "/DirectorStudiesPortal/Student"
    },
    {
        title: "Attendance",
        icon: <ReceiptIcon />,
        link: "/DirectorStudiesPortal/Attendance"
    },
    {
        title: "Learning",
        icon: <LibraryBooksIcon />,
        link: "/DirectorStudiesPortal/LearningMaterials"
    },
    {
        title: "Analytics",
        icon: <BarChartIcon />,
        link: "/DirectorStudiesPortal/PerformanceTracking"
    },
    {
        title: "Communication",
        icon: <EmailIcon />,
        link: "/DirectorStudiesPortal/Communication"
    },
    {
        title: "Timetable",
        icon: <ScheduleIcon />,
        link: "/DirectorStudiesPortal/Timetable"
    },
    {
        title: "Profession",
        icon: <SchoolIcon />,
        link: "/DirectorStudiesPortal/professional-development"
    },
    {
        title: "Reports",
        icon: <DescriptionIcon />,
        link: "/DirectorStudiesPortal/Reports"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/DirectorStudiesPortal/Settings"
    }
];

export default DosSidebarData;