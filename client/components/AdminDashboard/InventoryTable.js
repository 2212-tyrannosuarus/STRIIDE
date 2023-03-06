import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  fetchSingleProduct,
  selectOneAdminProduct,
  adminReduce,
  grabSizes,
  selectSizesTable,
} from "../../reducers/adminPageSlice";
import UpdateProduct from "./UpdateProduct";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function InventoryTable() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectOneAdminProduct);
  const sizeTable = useSelector(selectSizesTable);

  function createData(name, black, white, blue, green, pink, purple) {
    return { name, black, white, blue, green, pink, purple };
  }

  const rows = [
    createData(
      sizeTable.firstColumn[0],
      sizeTable.BlackC[0],
      sizeTable.WhiteC[0],
      sizeTable.BlueC[0],
      sizeTable.GreenC[0],
      sizeTable.PinkC[0],
      sizeTable.PurpleC[0]
    ),
    createData(
      sizeTable.firstColumn[1],
      sizeTable.BlackC[1],
      sizeTable.WhiteC[1],
      sizeTable.BlueC[1],
      sizeTable.GreenC[1],
      sizeTable.PinkC[1],
      sizeTable.PurpleC[1]
    ),
    createData(
      sizeTable.firstColumn[2],
      sizeTable.BlackC[2],
      sizeTable.WhiteC[2],
      sizeTable.BlueC[2],
      sizeTable.GreenC[2],
      sizeTable.PinkC[2],
      sizeTable.PurpleC[2]
    ),
    createData(
      sizeTable.firstColumn[3],
      sizeTable.BlackC[3],
      sizeTable.WhiteC[3],
      sizeTable.BlueC[3],
      sizeTable.GreenC[3],
      sizeTable.PinkC[3],
      sizeTable.PurpleC[3]
    ),
    createData(
      sizeTable.firstColumn[4],
      sizeTable.BlackC[4],
      sizeTable.WhiteC[4],
      sizeTable.BlueC[4],
      sizeTable.GreenC[4],
      sizeTable.PinkC[4],
      sizeTable.PurpleC[4]
    ),
    createData(
      sizeTable.firstColumn[5],
      sizeTable.BlackC[5],
      sizeTable.WhiteC[5],
      sizeTable.BlueC[5],
      sizeTable.GreenC[5],
      sizeTable.PinkC[5],
      sizeTable.PurpleC[5]
    ),
    createData(
      sizeTable.firstColumn[6],
      sizeTable.BlackC[6],
      sizeTable.WhiteC[6],
      sizeTable.BlueC[6],
      sizeTable.GreenC[6],
      sizeTable.PinkC[6],
      sizeTable.PurpleC[6]
    ),
    createData(
      sizeTable.firstColumn[7],
      sizeTable.BlackC[7],
      sizeTable.WhiteC[7],
      sizeTable.BlueC[7],
      sizeTable.GreenC[7],
      sizeTable.PinkC[7],
      sizeTable.PurpleC[7]
    ),
    createData(
      sizeTable.firstColumn[8],
      sizeTable.BlackC[8],
      sizeTable.WhiteC[8],
      sizeTable.BlueC[8],
      sizeTable.GreenC[8],
      sizeTable.PinkC[8],
      sizeTable.PurpleC[8]
    ),
    createData(
      sizeTable.firstColumn[9],
      sizeTable.BlackC[9],
      sizeTable.WhiteC[9],
      sizeTable.BlueC[9],
      sizeTable.GreenC[9],
      sizeTable.PinkC[9],
      sizeTable.PurpleC[9]
    ),
    createData(
      sizeTable.firstColumn[10],
      sizeTable.BlackC[10],
      sizeTable.WhiteC[10],
      sizeTable.BlueC[10],
      sizeTable.GreenC[10],
      sizeTable.PinkC[10],
      sizeTable.PurpleC[10]
    ),
    createData(
      sizeTable.firstColumn[11],
      sizeTable.BlackC[11],
      sizeTable.WhiteC[11],
      sizeTable.BlueC[11],
      sizeTable.GreenC[11],
      sizeTable.PinkC[11],
      sizeTable.PurpleC[11]
    ),
    createData(
      sizeTable.firstColumn[12],
      sizeTable.BlackC[12],
      sizeTable.WhiteC[12],
      sizeTable.BlueC[12],
      sizeTable.GreenC[12],
      sizeTable.PinkC[12],
      sizeTable.PurpleC[12]
    ),
    createData(
      sizeTable.firstColumn[13],
      sizeTable.BlackC[13],
      sizeTable.WhiteC[13],
      sizeTable.BlueC[13],
      sizeTable.GreenC[13],
      sizeTable.PinkC[13],
      sizeTable.PurpleC[13]
    ),
    createData(
      sizeTable.firstColumn[14],
      sizeTable.BlackC[14],
      sizeTable.WhiteC[14],
      sizeTable.BlueC[14],
      sizeTable.GreenC[14],
      sizeTable.PinkC[14],
      sizeTable.PurpleC[14]
    ),
    createData(
      sizeTable.firstColumn[15],
      sizeTable.BlackC[15],
      sizeTable.WhiteC[15],
      sizeTable.BlueC[15],
      sizeTable.GreenC[15],
      sizeTable.PinkC[15],
      sizeTable.PurpleC[15]
    ),
    createData(
      sizeTable.firstColumn[16],
      sizeTable.BlackC[16],
      sizeTable.WhiteC[16],
      sizeTable.BlueC[16],
      sizeTable.GreenC[16],
      sizeTable.PinkC[16],
      sizeTable.PurpleC[16]
    ),
    createData(
      sizeTable.firstColumn[17],
      sizeTable.BlackC[17],
      sizeTable.WhiteC[17],
      sizeTable.BlueC[17],
      sizeTable.GreenC[17],
      sizeTable.PinkC[17],
      sizeTable.PurpleC[17]
    ),
    createData(
      sizeTable.firstColumn[18],
      sizeTable.BlackC[18],
      sizeTable.WhiteC[18],
      sizeTable.BlueC[18],
      sizeTable.GreenC[18],
      sizeTable.PinkC[18],
      sizeTable.PurpleC[18]
    ),
    createData(
      sizeTable.firstColumn[19],
      sizeTable.BlackC[19],
      sizeTable.WhiteC[19],
      sizeTable.BlueC[19],
      sizeTable.GreenC[19],
      sizeTable.PinkC[19],
      sizeTable.PurpleC[19]
    ),
  ];

  const handleGetProduct = async (Pid) => {
    await dispatch(fetchSingleProduct(Pid));
    await dispatch(adminReduce.fillShoeTable());
  };

  useEffect(() => {
    dispatch(grabSizes());
  }, []);

  useEffect(() => {
    let string = window.location.pathname;
    let productinvId = "";
    string = string.slice(0, 25);
    if (string === "/adminpage/inventory/edit") {
      handleGetProduct(id);
    }
  }, [window.location.pathname]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{product.name}</StyledTableCell>
            <StyledTableCell align="right">Black</StyledTableCell>
            <StyledTableCell align="right">White</StyledTableCell>
            <StyledTableCell align="right">Blue</StyledTableCell>
            <StyledTableCell align="right">Green</StyledTableCell>
            <StyledTableCell align="right">Pink</StyledTableCell>
            <StyledTableCell align="right">Purple</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.black}</StyledTableCell>
              <StyledTableCell align="right">{row.white}</StyledTableCell>
              <StyledTableCell align="right">{row.blue}</StyledTableCell>
              <StyledTableCell align="right">{row.green}</StyledTableCell>
              <StyledTableCell align="right">{row.pink}</StyledTableCell>
              <StyledTableCell align="right">{row.purple}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
