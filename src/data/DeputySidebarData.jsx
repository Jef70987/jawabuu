/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BarChartIcon from '@mui/icons-material/BarChart';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';

export const DeputySidebarData = [
        {
    title: "LogOut",
    icon: <LogoutIcon sx={{color:'red',fontSize:30}}/>,
    link: "/Login"
    },
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/DeputyAdminPortal/Dashboard"
    },
    {
        title: "Discipline",
        icon: <DescriptionIcon />,
        link: "/DeputyAdminPortal/Discipline"
    },
    {
        title: "Academic calendar",
        icon: <ScheduleIcon />,
        link: "/DeputyAdminPortal/FinancialManagement"
    },
    {
        title: "Approvals",
        icon: <PeopleIcon />,
        link: "/DeputyAdminPortal/Admission"
    },
    {
        title: "Attendance",
        icon: <ReceiptIcon />,
        link: "/DeputyAdminPortal/AttendanceResults"
    },
    
    {
        title: "Hostel ",
        icon: <HomeIcon />,
        link: "/DeputyAdminPortal/HostelManagementt"
    },
    {
        title: "Timetable ",
        icon: <ScheduleIcon />,
        link: "/DeputyAdminPortal/Timetable"
    },
    
    {
        title: "Notices",
        icon: <EventIcon />,
        link: "/DeputyAdminPortal/EventNotices"
    },
    {
        title: "User Management",
        icon: <PersonIcon />,
        link: "/DeputyAdminPortal/UserManagement"
    },
    {
        title: "Reports",
        icon: <DescriptionIcon />,
        link: "/DeputyAdminPortal/Reports"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/DeputyAdminPortal/PortalSettings"
    },
    {
        title: "Help & Support",
        icon: <HelpIcon />,
        link: "/DeputyAdminPortal/HelpSupport"
    }
];

export default DeputySidebarData;