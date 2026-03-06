
import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import dashboardLogo from '../assets/dashboard-svgrepo-com.svg'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpCenterIcon from '@mui/icons-material/HelpCenter'
import LogoutIcon from '@mui/icons-material/Logout'
import TableRowsIcon from '@mui/icons-material/TableRows';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TableChartIcon from '@mui/icons-material/TableChart';
import GroupsIcon from '@mui/icons-material/Groups';
import UploadIcon from '@mui/icons-material/Upload';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

/**
 * A wrapper around MenuItem that intercepts clicks.
 * If the user is NOT logged in, it opens the LoginModal instead of navigating.
 */
const ProtectedMenuItem = ({ to, icon, children }) => {
  const { isLoggedIn, requireLogin } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      requireLogin();
    }
  };

  // If logged in, use NavLink as normal. Otherwise, intercept.
  if (isLoggedIn) {
    return (
      <MenuItem icon={icon} component={<NavLink to={to} />}>
        {children}
      </MenuItem>
    );
  }

  return (
    <MenuItem icon={icon} onClick={handleClick}>
      {children}
    </MenuItem>
  );
};


const Sidebarc = () => {
  return (
    <div className="bg-background text-foreground h-screen border-r border-border">
      <Sidebar
        width="260px"
        backgroundColor="transparent"
        rootStyles={{
          height: '100%',
          backgroundColor: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)',
        }}
      >

        <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid var(--border)', display: "flex", alignItems: "center", gap: "20px", }}>
          <img
            src={dashboardLogo}
            alt="Dashboard Logo"
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '10px' }}
          />
          <h2 style={{ margin: '0', color: 'var(--foreground)', fontSize: '22px', paddingBottom: "6px" }}>React Dash</h2>
        </div>
        <Menu
          menuItemStyles={{
            button: {
              color: 'var(--sidebar-foreground)',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'var(--sidebar-accent)',
                color: 'var(--sidebar-accent-foreground)',
              },
              transition: 'all 0.25s ease',
            },
            label: {
              fontWeight: 500,
            },
            icon: {
              color: 'var(--sidebar-foreground)',
              minWidth: '40px',
            },
            subMenuContent: {
              backgroundColor: 'transparent',
            }
          }}
        >

          <SubMenu label="MENU" defaultOpen={true} style={{ color: 'var(--muted-foreground)' }}>
            {/* Dashboard is always accessible */}
            <MenuItem icon={<DashboardIcon />} component={<NavLink to="/" />}>Dashboard</MenuItem>

            {/* Everything else requires login */}
            <ProtectedMenuItem to="/clients" icon={<PersonAddIcon />}>Clients</ProtectedMenuItem>
            <ProtectedMenuItem to="/notification" icon={<NotificationsIcon />}>Notification</ProtectedMenuItem>
            <ProtectedMenuItem to="/activity-feed" icon={<AssignmentIcon />}>Activity Feed</ProtectedMenuItem>
            <ProtectedMenuItem to="/tables" icon={<TableRowsIcon />}>Tables</ProtectedMenuItem>
            <ProtectedMenuItem to="/uploadpage" icon={<UploadIcon />}>Upload Page</ProtectedMenuItem>
            <ProtectedMenuItem to="/auditlogs" icon={<DocumentScannerIcon />}>Audit Logs</ProtectedMenuItem>
            <ProtectedMenuItem to="/teams" icon={<PeopleIcon />}>Team</ProtectedMenuItem>
            <ProtectedMenuItem to="/tablechart" icon={<TableChartIcon />}>Table Chart</ProtectedMenuItem>
            <ProtectedMenuItem to="/employee" icon={<GroupsIcon />}>Case Overview</ProtectedMenuItem>
            <ProtectedMenuItem to="/billing" icon={<ReceiptLongIcon />}>Billing</ProtectedMenuItem>
          </SubMenu>
          <div style={{ marginTop: '20px' }}></div>
          <SubMenu label="GENERAL" defaultOpen={true} style={{ color: 'var(--muted-foreground)' }}>
            <MenuItem icon={<SettingsIcon />}>Setting</MenuItem>
            <MenuItem icon={<HelpCenterIcon />}>Help</MenuItem>
            <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default Sidebarc