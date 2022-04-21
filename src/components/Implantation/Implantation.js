import * as React from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import AccordionComponent from "../Accordion";
import Box from "@mui/material/Box";
const Implantation = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [expandChild, setExpandchild] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setExpandchild(!expandChild);
  };
  const onSubmit = (sectionindex, chapterindex) => {
    console.log("id", sectionindex, chapterindex);
  };
  return (
    <>
      <div className="etablissement">
        <div className="chapter">
          <h5>{props.accordionData.chapterName}</h5>

          {expand ? (
            <Box className="icon-container">
              {" "}
              <ExpandLessRoundedIcon
                className="icon"
                onClick={() => {
                  setExpand(false);
                }}
              />{" "}
            </Box>
          ) : (
            <Box className="icon-container">
              {" "}
              <ExpandMoreRoundedIcon
                className="icon"
                onClick={() => {
                  setExpand(true);
                }}
              />{" "}
            </Box>
          )}
        </div>
        {expand
          ? props.accordionData.sections &&
            props.accordionData.sections.map((data, i) => {
              return (
                <div>
                  <div className="sections">
                    <AccordionComponent
                      chapterindex={props.index}
                      sectionindex={i}
                      onSubmit={onSubmit}
                      accordionData={data}
                      completed={true}
                      handleChange={handleChange}
                      expanded={expanded}
                      panelname={data.sectionId}
                      setRightBarData={props.setRightBarData}
                      setExpandchild={setExpandchild}
                      expandChild={expandChild}
                    />
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};
export default Implantation;
