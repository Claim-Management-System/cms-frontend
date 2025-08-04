import React, { useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import SecuritiLogo from '../../assets/Securiti_logo.svg';
import { 
  Drawer,
  List,
  ListItem, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useTheme, 
  useMediaQuery,
  AppBar,
  Toolbar,
  Divider,
  Collapse
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  PersonOutline as PersonOutlineIcon,
  Category as CategoryIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  Groups as GroupsIcon,
  People as PeopleIcon
} from "@mui/icons-material"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "./styles.css"


interface SidebarProps {
  children: React.ReactNode
}

interface MenuItem {
  text: string
  icon: React.ReactNode
  path?: string
  active?: boolean
  subItems?: SubMenuItem[]
}

interface SubMenuItem {
  text: string
  path: string
  icon: React.ReactNode
  active?: boolean
}

const userMenuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/',
  },
  {
    text: 'New Request',
    icon: <AddIcon />,
    subItems: [
      { text: 'Outpatient', path: '/new-request/outpatient', icon: <PersonOutlineIcon /> },
      { text: 'Miscellaneous', path: '/new-request/miscellaneous', icon: <CategoryIcon /> },
    ],
  },
  {
    text: 'Claim History',
    icon: <HistoryIcon />,
    subItems: [
      { text: 'Outpatient', path: '/claim-history/outpatient', icon: <PersonOutlineIcon /> },
      { text: 'Miscellaneous', path: '/claim-history/miscellaneous', icon: <CategoryIcon /> },
    ],
  },
];

const adminMenuItems: MenuItem[] = [
  {
    text: 'Admin Dashboard',
    icon: <DashboardIcon />,
    path: '/admin-dashboard',
  },
  {
    text: 'Employee',
    icon: <PeopleIcon />,
    subItems: [
      { text: 'Add Employee', path: '/add-employee', icon: <PersonIcon /> },
      { text: 'View Employees', path: '/employee-list', icon: <GroupsIcon /> },
    ],
  },
  {
    text: 'New Request',
    icon: <AddIcon />,
    subItems: [
      { text: 'Outpatient', path: '/new-request/outpatient', icon: <PersonOutlineIcon /> },
      { text: 'Miscellaneous', path: '/new-request/miscellaneous', icon: <CategoryIcon /> },
    ],
  },
  {
    text: 'Claim Requests',
    icon: <FormatListBulletedIcon />,
    subItems: [
      { text: 'Outpatient', path: '/claim-requests/outpatient', icon: <PersonOutlineIcon /> },
      { text: 'Miscellaneous', path: '/claim-requests/miscellaneous', icon: <CategoryIcon /> },
    ],
  },
  {
    text: 'Claim History',
    icon: <HistoryIcon />,
    subItems: [
      { text: 'Outpatient', path: '/claim-history/outpatient', icon: <PersonOutlineIcon /> },
      { text: 'Miscellaneous', path: '/claim-history/miscellaneous', icon: <CategoryIcon /> },
    ],
  },
];

const drawerWidth = 280

export default function ResponsiveSidebar({ children }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  
  const { user, logoutUser } = useAuth();
  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuItemClick = (path: string, hasSubItems = false) => {
    if (!hasSubItems && path) {
      navigate(path);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  }

  const handleExpandClick = (itemText: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemText) ? prev.filter((item) => item !== itemText) : [...prev, itemText],
    )
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  // Helper to check if a menu or submenu is active
  const checkIsActive = (path?: string) => path && location.pathname === path;

  const drawer = (
    <Box className="drawer-container">
      <Box className="logo-section">
        <Box className="logo-wrapper">
          <img 
            src={SecuritiLogo} 
            alt="Securiti Logo"  
            style={{ 
              maxWidth: '290px', 
              maxHeight: '50px', 
              width: 'auto', 
              height: 'auto', 
              objectFit: 'contain', 
              display: 'block' 
            }}
          />
        </Box>
      </Box>

      {/* Main Menu Items */}
      <Box className="main-menu-section">
        <Divider className="divider" />
        <List>
          {menuItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems.includes(item.text);
            const active = !hasSubItems && checkIsActive(item.path);

            return (
              <Box key={item.text} className="menu-item-box">
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (hasSubItems) {
                        handleExpandClick(item.text);
                      } else if (item.path) {
                        handleMenuItemClick(item.path);
                      }
                    }}
                    className={`list-item-button ${active ? ' active' : ''}`}
                  >
                    <ListItemIcon className={`list-item-icon`}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      className={`list-item-text`}
                    />
                    {hasSubItems && (
                      <Box sx={{ transition: 'transform 0.3s', transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)' }}>
                        <ExpandMoreIcon />
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>

                {hasSubItems && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems?.map((subItem) => (
                        <ListItem className="sub-list-item" key={subItem.text}>
                          <ListItemButton
                            onClick={() => handleMenuItemClick(subItem.path)}
                            className={`sub-list-item-button${checkIsActive(subItem.path) ? ' active' : ''}`}
                          >
                            <ListItemIcon className={`sub-list-item-icon`}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.text}
                              className={`sub-list-item-text`}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Bottom Menu Items */}
      <Box className="bottom-menu-section">
        <Divider className="divider" />
        <List>
          <ListItem key="Profile" disablePadding className="menu-item-box">
            <ListItemButton
              onClick={() => handleMenuItemClick('/profile')}
              className={`list-item-button${checkIsActive('/profile') ? ' active' : ''}`}
            >
              <ListItemIcon className={`list-item-icon${checkIsActive('/profile') ? ' active' : ''}`}><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Profile" className={`list-item-text${checkIsActive('/profile') ? ' active' : ''}`} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Log Out" disablePadding className="menu-item-box">
            <ListItemButton
              onClick={() => handleLogout()}
              className="list-item-button"
            >
              <ListItemIcon className="list-item-icon"><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Log Out" className="list-item-text" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )

  return (
    <Box className="app-container">
      {/* Mobile App Bar */}
      {isMobile && !mobileOpen && (
        <AppBar position="fixed" className="mobile-appbar" sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: '#E8F6FC' }}>
          <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: '#4fc3d7' }}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={SecuritiLogo} alt="Securiti Logo" style={{ height: 32, width: 'auto', display: 'block' }} />
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
          },
          width: isMobile ? undefined : drawerWidth,
          flexShrink: isMobile ? undefined : 0,
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" className="main-content">
        {children}
      </Box>
    </Box>
  )
}