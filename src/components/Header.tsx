import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Divider } from "@mui/material"
import { AccountCircle } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  pageName: string;
}

function Header({ pageName }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "white", color: "text.primary", backgroundColor: "#f9fafb" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", padding: '15px !important' }}>
        <Typography 
          variant="h5" 
          sx={{ fontWeight: 500, height: 30, fontFamily: 'ITCAvantG', color: '#4C4E54' }}
        >
          {pageName}
        </Typography>

        <IconButton 
          sx={{ width: 32, height: 32}} 
          onClick={() => navigate('/profile')}
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
      <Divider sx={{ marginY: 1.3, backgroundColor: 'rgba(107, 114, 128, 0.2)' }} />
    </AppBar>
  )
}

export default React.memo(Header);