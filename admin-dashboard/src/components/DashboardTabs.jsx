import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = ["/", "/events", "/analytics", "/feedback"].indexOf(location.pathname);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={currentTab} onChange={(e, value) => navigate(["/", "/events", "/analytics", "/feedback"][value])}>
        <Tab label="User Management" />
        <Tab label="Event Management" />
        <Tab label="Analytics" />
        <Tab label="Feedback" />
      </Tabs>
    </Box>
  );
};

export default DashboardTabs;
