import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Box, Typography, Button } from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function HistoryPage() {
  const classes = useStyles();
  const [History, setHistory] = useState([]);

  useEffect(() => {
    Axios.get("api/users/getHistory").then((response) => {
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        alert("FAiled to get history");
      }
    });
  }, []);
  return (
    <Box m={2}>
      <Box my={2}>
        <Typography variant="h5">History</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Box m={2}>
          <Table
            className={classes.table}
            aria-label="simple table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>Paiement id</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Data de l'achat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {History.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.paymentId}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.dateOfPurchase}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}

export default HistoryPage;
