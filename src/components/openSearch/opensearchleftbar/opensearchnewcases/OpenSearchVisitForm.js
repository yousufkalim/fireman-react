import React, { useState,useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
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
        caseFileId: casefileId,
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
      <Item
        sx={{
          marginTop: "5px",
          borderLeft: "10px solid cadetblue",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid gray",
                padding: "10px",
              }}
              onClick={onClick}
            >
              <h5>Detail of the object</h5>
              <div>
              {iconState? <CheckIcon sx={{backgroundColor:"green"}}/> : null}
              <span className="inputs-heading-text"> Reduire</span>
              </div>
              
            </Box>
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
                          checked={val.isSelected? true: false}
                          id={val.caseFileCheckListId}
                          onChange={handleChange}
                        />
                        <label for="checkbox"> {val.name}</label> <br />
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
