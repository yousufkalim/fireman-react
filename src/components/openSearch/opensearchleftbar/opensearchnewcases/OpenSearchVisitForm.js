import React, { useState,useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Typography } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const EstablishmentSearchVisitForm = ({
  checkBoxRes,
  compShow,
  indexdata,
  CompName,
  visit,
  casefileId,
  setCheckboxObj,
  postCheckboxesData,
  currentcasescaseFileId
}) => {
  const [toggleUpdateTabs, setToggleUpdateTabs] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
  const [iconState, seticonState] = useState(false)
  const [classState,  setClassState] = useState(true)
  const focusPoint = useRef(null);
  const handleChange = (e) => {
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
      const obj = {
        caseFileCheckListId: id,
        casefileId: casefileId? casefileId: currentcasescaseFileId
      };
      setCheckboxObj((pre) => [...pre, obj]);
    }
    if (!checked) {
      setCheckboxObj((pre) => [
        ...pre.filter((item) => item.caseFileCheckListId !== id),
      ]);
    }
  };

  const onClick = () => {
    setToggleUpdateTabs(!toggleUpdateTabs);
    if(compShow==="filestructure"){
      classState? focusPoint.current.style.display = "block":focusPoint.current.style.display = "none"
    }
    setClassState(!classState)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postCheckboxesData()
    if(checkBoxRes===200 && compShow==="filestructure"){
      focusPoint.current.style.display = "none"
    }
    seticonState(true)
  };
  return (
    <>
     <Box
               sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "0.6px solid #C5D3DB",
                backgroundColor:"#3675B7", 
                borderRadius:"5px", 
                width: "96%",
                margin: "10px auto",
                padding: "10px 10px",
                color:"#ffffff"
              }}
              onClick={onClick}
            >
              <Typography variant="h6">
              Detail of the object
        </Typography>
              <div>
              {iconState? <CheckIcon sx={{backgroundColor:"green"}}/> : null}
              </div>
              
            </Box>
      <Item
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width:"96%",
          margin:"auto"
        }}
      >
        <Box>
          <Grid>
            <form onSubmit={handleSubmit}>
              <Box
               ref={focusPoint}
                className={`${
                  CompName === "currentcases" && toggleUpdateTabs
                    ? "formhide"
                    : "formdisplay"
                }`}
              >
                {visit?.map((item) => (
                  <>
                    <h5> {item.checkHeadingName}</h5>
                    {item?.chkList?.map((val) => (
                      <div className="checkbox-container">
                        <input
                          className="study-form-checkbox"
                          type="checkbox"
                          name="checkbox"
                          defaultChecked={val.isSelected}
                          id={val.caseFileCheckListId}
                          onChange={handleChange}
                        />
                        <label for={val.caseFileCheckListId}> {val.name}</label> <br />
                      </div>
                    ))}
                  </>
                ))}
              </Box>
              <Box sx={{textAlign:"end"}}>
                <button
                  type="submit"
                  className="establishment-search-btn-submit"
                >
                  {" "}
                  To Validate{" "}
                </button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchVisitForm;
