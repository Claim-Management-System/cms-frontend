import React from "react";
import { AppBar, Toolbar, Typography, Divider } from "@mui/material"

interface HeaderProps {
  pageName: string;
}

function Header({ pageName }: HeaderProps) {

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ color: "text.primary", backgroundColor: "#f9fafb" }}
    >
      <Toolbar sx={{ alignItems: "center", padding: '0px !important' }}>
        <Typography 
          variant="h5" 
          sx={{ fontWeight: 500, height: 30, fontFamily: 'ITCAvantG', color: '#4C4E54' }}
        >
          {pageName}
        </Typography>
      </Toolbar>
      <Divider sx={{ marginY: 1.3, backgroundColor: 'rgba(107, 114, 128, 0.2)' }} />
    </AppBar>
  )
}

export default React.memo(Header);