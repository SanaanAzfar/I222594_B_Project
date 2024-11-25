import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Box,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const UserManagement = () => {
  const [All_users, setUsers] = useState([{ id: 1, name: "John Doe", role: "Organizer", status: "Pending", activity: "2024-11-20", complaints: ["Complaint 1: Spam", "Complaint 2: Fake event"] },{ id: 2, name: "Jane Smith", role: "User", status: "Active", activity: "2024-11-22", complaints: [] },{ id: 3, name: "Alice Johnson", role: "User", status: "Banned", activity: "2024-10-30", complaints: ["Complaint 1: Abusive language"] },{ id: 4, name: "Bob Williams", role: "Organizer", status: "Rejected", activity: "2024-09-15", complaints: [] },]);
  const [searcher, setSearch] = useState("");
  const [roleFilter, setFilterRole] = useState("");
  const [statusFilter, setFilterStatus] = useState("");
  const [orderer_type, setOrderBy] = useState("name");
  const [orderer, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rows_in_page, setRowsPerPage] = useState(5);
  const [user_selector, setSelectedUser] = useState(null);

  const Search_bar = (e) => setSearch(e.target.value);

  const Sorter = (property) => {
    const isAsc = orderer_type === property && orderer === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const Page_Changer = (event, newPage) => setPage(newPage);
  const Row_changer_in_page = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Actions_changer = (id, action) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: action === "approve" ? "Active" : "Rejected" }
          : user
      )
    );
  };

  const Moderator = (id, action) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: action === "ban" ? "Banned" : "Active" }
          : user
      )
    );
  };

  const reject_reverser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "Pending" } : user
      )
    );
  };

  const Complaints_opener = (user) => setSelectedUser(user);
  const Complaints_closer = () => setSelectedUser(null);

  const filteredUsers = All_users
    .filter((user) =>
      user.name.toLowerCase().includes(searcher.toLowerCase()) &&
      (roleFilter ? user.role === roleFilter : true) &&
      (statusFilter ? user.status === statusFilter : true)
    )
    .sort((a, b) => {
      if (a[orderer_type] < b[orderer_type]) return orderer === "asc" ? -1 : 1;
      if (a[orderer_type] > b[orderer_type]) return orderer === "asc" ? 1 : -1;
      return 0;
    });

  const paginatedUsers = filteredUsers.slice(
    page * rows_in_page,
    page * rows_in_page + rows_in_page
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          size="small"
          value={searcher}
          onChange={Search_bar}
        />
        <TextField
          label="Filter by Role"
          variant="outlined"
          size="small"
          select
          value={roleFilter}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Organizer">Organizer</MenuItem>
        </TextField>
        <TextField
          label="Filter by Status"
          variant="outlined"
          size="small"
          select
          value={statusFilter}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Banned">Banned</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderer_type === "name"}
                  direction={orderer_type === "name" ? orderer : "asc"}
                  onClick={() => Sorter("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Complaints</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.activity}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => Complaints_opener(user)}
                  >
                    {user.complaints.length} View
                  </Button>
                </TableCell>
                <TableCell>
                  {user.status === "Pending" && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => Actions_changer(user.id, "approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => Actions_changer(user.id, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {user.status === "Banned" ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => Moderator(user.id, "unban")}
                    >
                      Unban
                    </Button>
                  ) : user.status === "Rejected" ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => reject_reverser(user.id)}
                    >
                      Reverse Reject
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => Moderator(user.id, "ban")}
                    >
                      Ban
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rows_in_pageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rows_in_page={rows_in_page}
        page={page}
        onPageChange={Page_Changer}
        onRowsPerPageChange={Row_changer_in_page}
      />

      {user_selector && (
        <Dialog open={Boolean(user_selector)} onClose={Complaints_closer}>
          <DialogTitle>Complaints for {user_selector.name}</DialogTitle>
          <DialogContent>
            {user_selector.complaints.length > 0 ? (
              <List>
                {user_selector.complaints.map((complaint, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={complaint} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No complaints found for this user.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={Complaints_closer}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default UserManagement;
