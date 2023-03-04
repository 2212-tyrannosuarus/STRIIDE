import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein, pink, purple) {
  return { name, calories, fat, carbs, protein, pink, purple };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 2, 4),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4, 5),
  createData("Eclair", 262, 16.0, 24, 6.0, 5, 2),
  createData("Cupcake", 305, 3.7, 67, 4.3, 1, 3),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 2, 5),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function InventoryTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Black</StyledTableCell>
            <StyledTableCell align="right">White&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Blue&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Green&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Pink&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Purple&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
