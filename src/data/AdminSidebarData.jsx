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

export const AdminSidebarData = [
  {
    title: "LogOut",
    icon: <LogoutIcon sx={{color:'red',fontSize:30}}/>,
    link: "/Login"
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/AdminPortal/Dashboard"
  },
  {
    title: "Student Mgmnt",
    icon: <SchoolIcon />,
    link: "/AdminPortal/student-management"
  },
  {
    title: "Admission",
    icon: <PeopleIcon />,
    link: "/AdminPortal/Admission"
  },
  {
    title: "Attendance",
    icon: <ReceiptIcon />,
    link: "/AdminPortal/AttendanceResults"
  },
  {
    title: "Finance",
    icon: <MonetizationOnIcon />,
    link: "/AdminPortal/FinancialManagement"
  },
  {
    title: "Hostel Mgmnt",
    icon: <HomeIcon />,
    link: "/AdminPortal/HostelManagementt"
  },
  {
    title: "Timetable Mgmnt",
    icon: <ScheduleIcon />,
    link: "/AdminPortal/Timetable"
  },
  {
    title: "Curriculum",
    icon: <LibraryBooksIcon />,
    link: "/AdminPortal/CurriculumnMgmt"
  },
  {
    title: "Analytics",
    icon: <BarChartIcon />,
    link: "/AdminPortal/PerformanceAnalytics"
  },
  {
    title: "Notices",
    icon: <EventIcon />,
    link: "/AdminPortal/EventNotices"
  },
  {
    title: "User Mgmnt",
    icon: <PersonIcon />,
    link: "/AdminPortal/UserManagement"
  },
  {
    title: "Reports",
    icon: <DescriptionIcon />,
    link: "/AdminPortal/Reports"
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/AdminPortal/PortalSettings"
  },
  {
    title: "Help & Support",
    icon: <HelpIcon />,
    link: "/AdminPortal/HelpSupport"
  }
];

export default AdminSidebarData;