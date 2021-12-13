import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EstablishmentSearchData = ({ establishmentSearchData }) => {
  console.log(establishmentSearchData);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Classification</TableCell>
              <TableCell align="right">Commune</TableCell>
              <TableCell align="right">EstablishmentName&nbsp;(g)</TableCell>
              <TableCell align="right">Ranking&nbsp;(g)</TableCell>
              <TableCell align="right">ReferenceNo&nbsp;(g)</TableCell>
              <TableCell align="right">Status&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {establishmentSearchData.data?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.classification}
                </TableCell>
                <TableCell align="right">{row.commune}</TableCell>
                <TableCell align="right">{row.establishmentName}</TableCell>
                <TableCell align="right">{row.ranking}</TableCell>
                <TableCell align="right">{row.referenceNo}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EstablishmentSearchData;
