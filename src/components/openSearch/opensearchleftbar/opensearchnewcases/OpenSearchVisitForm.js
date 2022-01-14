import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Rightarrow from "../../../../assets/rightarrow.png";
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
  currentcasescaseFileId,
}) => {
  const [toggleUpdateTabs, setToggleUpdateTabs] = useState(
    CompName === "currentcases" && indexdata.sectionindex === 1 ? true : false
  );
  const [iconState, seticonState] = useState(false);
  const [classState, setClassState] = useState(true);
  const focusPoint = useRef(null);
  const handleChange = (e) => {
    const checked = e.target.checked;
    const id = e.target.id;
    if (checked) {
      const obj = {
        caseFileCheckListId: id,
        casefileId: casefileId ? casefileId : currentcasescaseFileId,
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
    if (compShow === "filestructure") {
      classState
        ? (focusPoint.current.style.display = "block")
        : (focusPoint.current.style.display = "none");
    }
    setClassState(!classState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postCheckboxesData();
    if (checkBoxRes === 200 && compShow === "filestructure") {
      focusPoint.current.style.display = "none";
    }
    seticonState(true);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "0.6px solid #C5D3DB",
          backgroundColor: "#3675B7",
          borderRadius: "5px",
          width: "96%",
          margin: "10px auto",
          padding: "8px 10px",
          color: "#ffffff",
        }}
        onClick={onClick}
      >
        <Typography variant="h6">Detail of the object</Typography>
        <div>
          {iconState ? <CheckIcon /> : null}
        </div>
      </Box>
      <Item
        ref={focusPoint}
        sx={{
          marginTop: "15px",
          borderRadius: "10px",
          boxShadow: "none",
          width: "96%",
          margin: "auto",
        }}
      >
        <Box>
          <Grid>
            <form onSubmit={handleSubmit}>
              <Box
                className={`${
                  CompName === "currentcases" && toggleUpdateTabs
                    ? "formhide"
                    : "formdisplay"
                }`}
              >
                {visit?.map((item) => (
                  <>
                    <Box sx={{ textAlign: "start", padding: "20px 0px" }}>
                      <label className="label-color">
                        {item.checkHeadingName}
                      </label>
                    </Box>
                    <Divider />
                    {item?.chkList?.map((val) => (
                      <div class="container">
                        <div class="group">
                          <input
                            type="checkbox"
                            defaultChecked={val.isSelected}
                            id={val.caseFileCheckListId}
                            onChange={handleChange}
                          />
                          <label
                            className="dropdown-checkbox"
                            for={val.caseFileCheckListId}
                          ></label>
                        </div>
                        <Box
                          sx={{
                            padding: "20px",
                            border: "1px solid rgba(0, 31, 79, 0.1)",
                            boxSizing: "border-box",
                            boxShadow: "0px 6px 5px rgba(0, 0, 0, 0.03)",
                            borderRadius: "10px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "90%",
                              margin: "auto",
                              fontWeight: "bold",
                              fontSize: "15px",
                              lineHeight: "22px",
                              color: "#3675B7",
                            }}
                          >
                            {val.name}
                          </Box>
                        </Box>
                      </div>
                    ))}
                  </>
                ))}
              </Box>
              <Box sx={{ textAlign: "right", padding: "10px" }}>
                <Button
                  type="submit"
                  endIcon={<img className='icon-validate' src={Rightarrow} />}
                  sx={{
                    background: "#3675B7",
                    ":hover": { background: "#3675B7" },
                  }}
                  variant="contained"
                >
                  Valider
                </Button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Item>
    </>
  );
};

export default EstablishmentSearchVisitForm;
