import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const Feedback_display = () => {
  const All_feedback = [{ id: 1, name: "John Doe", text: "Great event!", rating: 5, status: "Reviewed" },{ id: 2, name: "Jane Smith", text: "Poor organization.", rating: 2, status: "Pending" },{ id: 3, name: "Alice Johnson", text: "Had a fantastic time!", rating: 4, status: "Pending" },];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
      </Typography>
      <List>
        {All_feedback.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem>
              <ListItemText
                primary={`Name: ${item.name}`}
                secondary={`Feedback: "${item.text}" | Rating: ${item.rating}/5 | Status: ${item.status}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Feedback_display;
