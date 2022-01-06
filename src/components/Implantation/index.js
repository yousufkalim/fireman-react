import * as React from 'react';
import ImplantationData from "./Implantation";
import Button from '@mui/material/Button';
import Rightarrow from "../../assets/rightarrow.png";
import Leftarrow from "../../assets/leftarrow.png";
import Floppy from "../../assets/floppy.png";
import { IconButton } from '@mui/material';






const Implantation = (props) => {
   
    return (
        <>
        {
            props.accordionData && props.accordionData.map((data)=>{
                return(
                    <ImplantationData accordionData={data} />
                )
            })
        }
                       <div className='bottom_buttons'>
                      <div className='bottom_buttons_left' >
                          <IconButton color="primary" aria-label="upload picture" component="span">
                              <img src={Floppy} />
                          </IconButton>
                      </div>
                      <div className='bottom_buttons_right' >
                          <Button sx={{ background: "#BDC6D8", ':hover': { background: "#BDC6D8" } }} style={{ marginRight: "12px" }} variant="contained"
                              startIcon={<img src={Leftarrow} />}
                          >
                              PRECEDENT
                          </Button>
                          <Button endIcon={<img className='' src={Rightarrow} />} sx={{ background: "#3675B7", ':hover': { background: "#3675B7" } }} variant="contained">
                              SUIVANT
                          </Button>
                      </div>
                  </div>
       </>
    )
}
export default Implantation;