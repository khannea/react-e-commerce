import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Box, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  removeButton: {
    backgroundColor: "red",
    color: "white",
    fontWeight: "700",
  },
  minitaureConteneur: {
    overflow: "hidden",
    height: "80px",
  },
  minitaure: {
    width: "120px",
  },
});

function UserCardBlock(props) {
  const classes = useStyles();

  const renderItems = () =>
    props.products &&
    props.products.map((product) => (
      <TableRow key={product._id}>
        <TableCell component="th" scope="row">
          {product.title}
        </TableCell>
        <TableCell>
          <Box className={classes.minitaureConteneur}>
            <img
              className={classes.minitaure}
              src={`/api/${product.images[0]}`}
              alt="product"
            />
          </Box>
        </TableCell>
        <TableCell>{product.quantity}</TableCell>
        <TableCell>{product.price} €</TableCell>
        <TableCell>
          <Button
            variant="contained"
            className={classes.removeButton}
            onClick={() => props.removeItem(product._id)}
          >
            Enlever
          </Button>
        </TableCell>
      </TableRow>
    ));

  return (
    <TableContainer component={Paper}>
      <Box m={2}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Miniature</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Prix unitaire</TableCell>
              <TableCell>Enlever du caddie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderItems()}</TableBody>
        </Table>
      </Box>
      <Box m={4}>
        <Typography variant="h5">Total amount: {props.total} €</Typography>
      </Box>
    </TableContainer>
  );
}

export default UserCardBlock;
