import { makeStyles } from '@material-ui/styles'
const scrollStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '6px',
      height:"6px"
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius:"10px"
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#3675b7',
      borderRadius: "10px",
      backgroundClip:"paddingBox"
    },
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
        outline: "none",
      }
  }
}));


export default scrollStyles;