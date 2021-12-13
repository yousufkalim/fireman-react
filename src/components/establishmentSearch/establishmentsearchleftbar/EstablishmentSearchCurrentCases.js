import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const EstablishmentSearchCurrentCases = ({currentcasesData}) => {
    
    return (
        <>
       <h1>Current cases</h1>  
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CaseTypeName</TableCell>
            <TableCell align="right">caseAverageName</TableCell>
            <TableCell align="right">commisionDate&nbsp;(g)</TableCell>
            <TableCell align="right">createdAt&nbsp;(g)</TableCell>
            <TableCell align="right">employeeName&nbsp;(g)</TableCell>
            <TableCell align="right">refNum&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentcasesData.data?.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.caseTypeName}
              </TableCell>
              <TableCell align="right">{row.caseAverageName}</TableCell>
              <TableCell align="right">{row.commisionDate}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.employeeName}</TableCell>
              <TableCell align="right">{row.refNum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}

export default EstablishmentSearchCurrentCases
