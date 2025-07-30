import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material"
import { Notifications, AccountCircle } from "@mui/icons-material"

interface HeaderProps {
  pageName: string;
}

function Header({ pageName }: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "white", color: "text.primary", backgroundColor: "#f9fafb"}}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: 300, height: 40 }}>
          {pageName}
        </Typography>

        <Box sx={{ height: 40, display: "flex", alignItems: "center", gap: { xs: 0, md: 2 } }}>
          <IconButton sx={{ width: 32, height: 32 }}>
            <Notifications />
          </IconButton>

          <IconButton sx={{ width: 32, height: 32 }}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(Header);