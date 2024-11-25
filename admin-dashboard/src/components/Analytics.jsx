import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Grid, Paper, Button, MenuItem, Select } from "@mui/material";

const Analytics = () => {
  const eventStats = [{ category: "Concerts", revenue: 5000 },{ category: "Conferences", revenue: 3000 },{ category: "Workshops", revenue: 2000 },];

  const All_Events = 120;
  const All_Users = 450;
  const All_Revenue = eventStats.reduce((sum, item) => sum + item.revenue, 0);
  const All_tickets = [{ type: "VIP", sold: 100 },{ type: "Regular", sold: 200 },{ type: "Early Bird", sold: 50 },];
  const All_feedback = [
    { id: 1, text: "Great event!", rating: 5 },
    { id: 2, text: "Average experience.", rating: 3 },
    { id: 3, text: "Poor organization.", rating: 2 },
  ];

  const Report_downloader = (reportType) => {
    let givenData;

    switch (reportType) {
      case "user":
        givenData = `
          User Analytics Report
          ----------------------
          Total Users: ${All_Users}
          Active Users: ${Math.floor(All_Users * 0.8)}
          Organizers: ${Math.floor(All_Users * 0.2)}
        `;
        break;
      case "ticket":
        givenData = `
          Ticket Sales Report
          --------------------
          ${All_tickets
            .map((ticket) => `${ticket.type}: ${ticket.sold} tickets sold`)
            .join("\n")}
          Total Tickets Sold: ${All_tickets.reduce((sum, t) => sum + t.sold, 0)}
        `;
        break;
      case "event":
        givenData = `
          Event Analytics Report
          -----------------------
          Total Events: ${All_Events}
          Revenue Breakdown:
          ${eventStats
            .map((event) => `${event.category}: $${event.revenue}`)
            .join("\n")}
          Total Revenue: $${All_Revenue}
        `;
        break;
      case "feedback":
        givenData = `
          Feedback Report
          ----------------
          ${All_feedback
            .map((fb) => `Feedback ID: ${fb.id}, Rating: ${fb.rating}, Comment: "${fb.text}"`)
            .join("\n")}
          Average Rating: ${
            All_feedback.reduce((sum, fb) => sum + fb.rating, 0) / All_feedback.length
          }
        `;
        break;
      default:
        return;
    }

    const blob = new Blob([givenData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportType}_report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Events</Typography>
            <Typography variant="h4">{All_Events}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{All_Users}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${All_Revenue}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Revenue Breakdown by Category
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart givenData={eventStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis givenDataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar givenDataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Generate Reports
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Report_downloader("user")}
            >
              User Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Report_downloader("ticket")}
            >
              Ticket Sales Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Report_downloader("event")}
            >
              Event Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => Report_downloader("feedback")}
            >
              Feedback Report
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Analytics;
