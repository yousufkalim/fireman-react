import React, { useEffect, useState } from "react";
import AccordionComponent from "../Accordion";
import Box from "@mui/material/Box";
import { Store } from "../../StoreContext";
const Implantation = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [expandChild, setExpandchild] = React.useState(false);
  const store = Store();
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
          <h5
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {props.accordionData.chapterName}
          </h5>
        </div>
        {expand
          ? props.accordionData.sections &&
            props.accordionData.sections.map((data, i) => {
              console.log(data, "data");
              return (
                <div>
                  <div className="sections">
                    <AccordionComponent
                      Tabindex={i}
                      chapterindex={props.index}
                      // sectionindex={i}
                      sectionindex={data.sectionId}
                      onSubmit={onSubmit}
                      accordionData={data}
                      completed={true}
                      handleChange={handleChange}
                      expanded={expanded}
                      panelname={data.sectionId}
                      setRightBarData={props.setRightBarData}
                      setExpandchild={setExpandchild}
                      expandChild={expandChild}
                      index={props.index}
                      tabindex={store?.activeNavbarTab}
                      TabData={props?.TabData}
                      orderNo={store?.Orderno}
                      sectionlength={props?.accordionData.sections.length}
                      chapterlength={props?.datalength}
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
