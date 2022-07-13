import React, { useEffect, useState } from "react";
import ImplantationData from "./Implantation";
import { Store } from "../../StoreContext";
import { toast } from "react-toastify";
import api from "../../api/index";
const Implantation = (props) => {
  let [accordionData, setAccordionData] = useState([]);
  const [CheckedSections, setCheckedSections] = useState([]);
  const [TabData, setTabData] = useState([]);
  const store = Store();
  useEffect(() => {
    loadData();
    getTabData();
    setAccordionData([])
  }, [store?.implantationDataid]);

  const loadData = () => {
    if (store?.activeNavbarTab != 0 && store?.activeNavbarTab != 1 && store?.caseFileId) {
      console.log("hit");
      let arr = [];
      let arrwithpushedvalues = [];
      let ind;
      api(
        "get",
        `/api/v1/checkList/chapter_selected_sections/${store?.caseFileId}/${store?.implantationDataid}`
      ).then((res) => {
        console.log(res,"ljkhkjkjkjk");
        if (res.status == 200) {
          arrwithpushedvalues = res?.data.map((val) => val?.sectionId);
          res?.data.map((val) => console.log(val?.sectionId, "val?.sectionId"));
          console.log(res.data, "checked");
        }
        api(
          "get",
          `/api/v1/checkList/tabs_checklist/${store?.implantationDataid}/${store?.caseFileId}`
        ).then((res) => {
          if (res.status == 200) {
            res?.data?.map((val) =>
              arrwithpushedvalues.map((i) => {
                ind = val?.sections.findIndex((s) => s?.sectionId === i);
                if (ind >= 0) {
                  val.sections[ind].isSelected = true;
                }
                console.log(ind, "ind");
              })
            );
            console.log(res?.data);
            setAccordionData(res.data);
          }
        });
      });
    }
  };

  const getTabData = () => {
    api("get", "/api/v1/categories/getall").then((res) => {
      setTabData(res?.data);
      console.log(res, "getall");
    });
  };
  console.log(store,"store")
  console.log(accordionData,"accordionData");
  return (
    <>
      {accordionData &&
        accordionData.map((data, i) => {
          return (
            <ImplantationData
              setRightBarData={props.setRightBarData}
              index={i}
              accordionData={data}
              datalength={accordionData?.length}
              TabData={TabData}
            />
          );
        })}
    </>
  );
};
export default Implantation;
