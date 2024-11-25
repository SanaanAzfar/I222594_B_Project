import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CssBaseline, Box, Drawer, List, ListItem, ListItemText, Toolbar, AppBar, Typography } from "@mui/material";
import DashboardTabs from "./components/DashboardTabs";
import UserManagement from "./components/UserManagement";
import EventManagement from "./components/EventManagement";
import Analytics from "./components/Analytics";
import FeedbackModeration from "./components/FeedbackModeration";

// Drawer width
const DW = 240;

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: DW,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: DW, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemText primary="User Management" />
              </ListItem>
              <ListItem button component={Link} to="/events">
                <ListItemText primary="Event Management" />
              </ListItem>
              <ListItem button component={Link} to="/analytics">
                <ListItemText primary="Analytics" />
              </ListItem>
              <ListItem button component={Link} to="/feedback">
                <ListItemText primary="Feedback" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar /> {/* Offset for the AppBar */}
          <Routes>
            <Route path="/" element={<UserManagement />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/feedback" element={<FeedbackModeration />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;


// 3. Admin Interface:
// Admins need a comprehensive dashboard to oversee the platform, including user management, event approval, and report generation.

// Key Components:
// User and Organizer Management:
// Admin view to approve/deny user and organizer registrations.
// Ability to monitor user activity, manage complaints, and moderate content.
// Event Approval and Category Management:
// View all submitted events and approve/deny based on content and compliance.
// Categorize events (e.g., concerts, conferences).
// Reports and Analytics:
// Dashboards showing platform-wide stats like total events, total users, and revenue.
// Generate and download various reports (e.g., revenue by event category, platform growth).
// Feedback Moderation:
// Review attendee feedback for compliance with guidelines.
// Design Considerations:
// Dashboard with multi-tab navigation for different sections (user management, event management, analytics).
// Charts, tables, and summary cards for quick overview of platform metrics.
// // Searchable lists of users, events, and feedback.
// 5. Admin Panel Search:
// The search functionality is essential in the admin interface for managing users, events, and vendors.

// Key Features:
// Search by Keyword: For events, vendors, users (attendees, organizers).
// Advanced Filters: By event category, ticket availability, user status.
// Sorting and Pagination: To handle large sets of data efficiently.
// Design Considerations:
// Search bar at the top of the admin panel.
// Advanced filter options next to the search bar to help narrow results.
// Results should be displayed in sortable tables with pagination.