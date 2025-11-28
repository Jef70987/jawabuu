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
import HelpIcon from '@mui/icons-material/Help';

export const TeacherSidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/TeacherPortal/Dashboard"
  },
  {
    title: "Class ",
    icon: <ClassIcon />,
    link: "/TeacherPortal/Class"
  },
  {
    title: "Assessment",
    icon: <AssessmentIcon />,
    link: "/TeacherPortal/Assessment"
  },
  {
    title: "Assignment",
    icon: <AssignmentIcon />,
    link: "/TeacherPortal/Assignments"
  },
  {
    title: "Attendance",
    icon: <ReceiptIcon />,
    link: "/TeacherPortal/Attendance"
  },
  {
    title: "Learning",
    icon: <LibraryBooksIcon />,
    link: "/TeacherPortal/LearningMaterials"
  },

  {
    title: "Timetable",
    icon: <ScheduleIcon />,
    link: "/TeacherPortal/Timetable"
  },
 
  {
    title: "Reports",
    icon: <DescriptionIcon />,
    link: "/TeacherPortal/Reports"
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    link: "/TeacherPortal/Settings"
  },
  {
    title: "Help & Support",
    icon: <HelpIcon sx={{fontSize:30}}/>,
    link: "/TeacherPortal/Help&Support"
  },
];

export default TeacherSidebarData;