import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Button,
  TableContainer,
  Paper,
  TablePagination,
  Toolbar,
  alpha,
  Tooltip,
  IconButton,
} from "@mui/material";
import AlertDialog from "components/AlretDialog";

const btn_del = {
    borderRadius: 25,
    color: "rgb(240, 243, 227)",
    backgroundColor: "#2ca58d",
    fontSize: "14px",
    width: "80%",
    marginRIght: "50%",
    fontFamily: "GT Walsheim",
  };

const columns = [
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'income', label: 'Income', minWidth: 50 },
    {
      id: 'family_group',
      label: 'Household',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'date_of_birth',
      label: 'Date of birth',
      minWidth: 50,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'relationship',
      label: 'Relationship',
      minWidth: 80,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 200,
      align: 'center',
      format: (value) => value.toFixed(2),
    },
  ];


const ContactsList = (props) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const { contacts, loading } = props

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const selectedTransactionIdsRef = useRef([]);

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden', marginTop:'50px' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,
                 }}
                >
                    <Typography>
                    {column.label}
                    </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => {
                return (
                    <TableRow  role="checkbox" tabIndex={-1} key={contact.id}>
                    {columns.map((column) => {
                        if (column.id === "actions") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                               <div style={{ display:'flex', justifyContent:'center' }} >
                                <div>
                                    <Button
                                      variant="outlined"
                                  style={btn_del}
                                  onClick={() =>
                                    navigate(`/edit/contact/${contact.id}`)
                                  }>edit</Button>
                                </div>
                                <div>
                                <AlertDialog transaction={contact} />
                                </div>
                               </div>
                              </TableCell>
                            );
                          }
                        const value =
                        column.id === "relationship"
                            ? contact.relationship.display_name
                            : contact[column.id];

                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                );
                })}
            </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ContactsList;
