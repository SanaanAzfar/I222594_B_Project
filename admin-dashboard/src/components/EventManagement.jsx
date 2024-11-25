import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Box,
  Button,
  MenuItem,
} from "@mui/material";

const Alll_Events = () => {
  const [events, setEvents] = useState([{ id: 1, name: "Tech Conference", category: "Conference", status: "Pending" },{ id: 2, name: "Rock Concert", category: "Concert", status: "Denied" },{ id: 3, name: "Art Expo", category: "Exhibition", status: "Approved" },]);

  const [Searcher, setSearcher] = useState("");
  const [categoryFilter, setcategoryFilter] = useState("");
  const [statusFilter, setstatusFilter] = useState("");
  const [Orderer_type, setOrderer_type] = useState("name");
  const [Orderer, setOrderer] = useState("asc");
  const [page, setPage] = useState(0);
  const [Rows_in_page, setRows_in_page] = useState(5);

  const Searcherer = (e) => setSearcher(e.target.value);

  const Sorter = (property) => {
    const isAsc = Orderer_type === property && Orderer === "asc";
    setOrderer(isAsc ? "desc" : "asc");
    setOrderer_type(property);
  };


  const PageChanger = (event, newPage) => setPage(newPage);
  const RowChanger = (event) => {
    setRows_in_page(parseInt(event.target.value, 10));
    setPage(0);
  };


  const Approver = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, status: "Approved" } : event
      )
    );
  };


  const Denier = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, status: "Denied" } : event
      )
    );
  };

  const EventFilterer = events
    .filter((event) =>
      event.name.toLowerCase().includes(Searcher.toLowerCase()) &&
      (categoryFilter ? event.category === categoryFilter : true) &&
      (statusFilter ? event.status === statusFilter : true)
    )
    .sort((a, b) => {
      if (a[Orderer_type] < b[Orderer_type]) return Orderer === "asc" ? -1 : 1;
      if (a[Orderer_type] > b[Orderer_type]) return Orderer === "asc" ? 1 : -1;
      return 0;
    });

  const EventPager = EventFilterer.slice(
    page * Rows_in_page,
    page * Rows_in_page + Rows_in_page
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Searcher by Name"
          variant="outlined"
          size="small"
          value={Searcher}
          onChange={Searcherer}
        />
        <TextField
          label="Filter by Category"
          variant="outlined"
          size="small"
          select
          value={categoryFilter}
          onChange={(e) => setcategoryFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Conference">Conference</MenuItem>
          <MenuItem value="Concert">Concert</MenuItem>
          <MenuItem value="Exhibition">Exhibition</MenuItem>
        </TextField>
        <TextField
          label="Filter by Status"
          variant="outlined"
          size="small"
          select
          value={statusFilter}
          onChange={(e) => setstatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Denied">Denied</MenuItem>
        </TextField>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={Orderer_type === "name"}
                  direction={Orderer_type === "name" ? Orderer : "asc"}
                  onClick={() => Sorter("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={Orderer_type === "category"}
                  direction={Orderer_type === "category" ? Orderer : "asc"}
                  onClick={() => Sorter("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {EventPager.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.status}</TableCell>
                <TableCell>
                  {event.status === "Pending" && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => Approver(event.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => Denier(event.id)}
                      >
                        Deny
                      </Button>
                    </>
                  )}
                  {event.status === "Denied" && (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => Approver(event.id)}
                    >
                      Approve
                    </Button>
                  )}
                  {event.status === "Approved" && (
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => Denier(event.id)}
                    >
                      Deny
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        Rows_in_pageOptions={[5, 10, 25]}
        component="div"
        count={EventFilterer.length}
        Rows_in_page={Rows_in_page}
        page={page}
        onPageChange={PageChanger}
        onRows_in_pageChange={RowChanger}
      />
    </Box>
  );
};

export default Alll_Events;
