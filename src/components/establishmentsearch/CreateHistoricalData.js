import React,{useState,useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from '../../api/index'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];
const CreateHistoricalData = () => {
  const [dropdownValue, setdropdownValue] = useState({
    object: "",
  });
  useEffect(() => {
   api("get","/api/v1/historicalobjects/dropdown").then((res)=>{
    setdropdownValue((pre)=>{
      return{
        ...pre,
        object:res
      }
    })
   })
  }, [])

  console.log("res",dropdownValue.object);
  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dated</TableCell>
                <TableCell align="right">Object</TableCell>
                <TableCell align="right">Opinion</TableCell>
                <TableCell align="right">
                  Details - Will appear in the report
                </TableCell>
                <TableCell align="right">Urban Planning Reference</TableCell>
                <TableCell align="right">Enclosed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <input name="date" type="date" />
                  </TableCell>
                  <TableCell align="right">
                    <select
                      className="dropdown"
                      type="select"
                      name="caseTypeId"
                      required
                    >
                      <option value="">Projet de construction</option>
                      {dropdownValue.object.data?.map((item, i) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell align="right">
                  <select
                      className="dropdown"
                      type="select"
                      name="caseTypeId"
                      required
                    >
                      <option value="">Projet de construction</option>
                        <option value="0">Avis favorable</option>
                        <option value="1">Avis défavorable</option>
                        <option value="2">Sans avis</option>
                    </select>
                  </TableCell>
                  <TableCell align="right">
                    <input type="text" />
                  </TableCell>
                  <TableCell align="right">
                    <input type="text" />
                  </TableCell>
                  <TableCell align="right">
                    <input type="file" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CreateHistoricalData;
