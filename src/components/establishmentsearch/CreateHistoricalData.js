import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import api from "../../api/index";
import _ from 'lodash';
const CreateHistoricalData = ({establishmentid}) => {
  const [dropdownValue, setdropdownValue] = useState({
    objectDropdown: "",
  });
  const [detailValue, setDetailsValue] = useState({
    detailone:""
  })
  useEffect(() => {
    api("get", "/api/v1/historicalobjects/dropdown").then((res) => {
      setdropdownValue((pre) => {
        return {
          ...pre,
          objectDropdown: res,
        };
      });
    });
  }, []);
  
  const [inputValues, setInputValues] = useState({ 
  historicalEventId: "0",
  historicalOpinionId: "0",
  historicalObjectId: "0",
  dateEvent: "",
  details: "",
  establishmentId: establishmentid,
  urbanPlanningRef: ""
  });
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.toUpperCase();
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value.toUpperCase(),
      };
    });
    setDetailsValue(()=>{
      return{
        detailone: inputValues.object=="Projet de construction" && inputValues.opinion =="favourable"? 
        "Optionally give the general nature of the modifications. EX The modifications relate to the smoke extraction of the circulation of the floors. The box in the PRECISIONS column begins with  The changes relate to...":null
      }
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
  api("post","/api/v1/create_historicaldata_establishment", inputValues).then((res)=>(
    console.log("reshis",res)
  ))

  }
  ///////////////
  const handleChangeFiles = async e => {
    let { files } = e.target;

    let formData = new FormData();
    _.forEach(files, file => {
        formData.append('files', file);
    });
    console.log("formimages",formData.getAll('files'));
   api("post","/api/v1/upload_historicaldata_file", formData).then((res)=>{
   console.log("", res);
   })

}

  return (
    <>
      <div>
      <form onSubmit={handleSubmit}>   
                  <input  onChange={handleChange} name="dateEvent" type="date" />
                  <select
                    className="dropdown"
                    type="select"
                    name="historicalObjectId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Projet de construction</option>
                    {dropdownValue.objectDropdown.data?.map((item, i) => (
                      <option value={i}>{item.text}</option>
                    ))}
                  </select>
                  <select
                    className="dropdown"
                    type="select"
                    name="historicalOpinionId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select option</option>
                    <option value="0">Avis favorable</option>
                    <option value="1">Avis défavorable</option>
                    <option value="2">Sans avis</option>
                  </select>
                  <input  onChange={handleChange} value={detailValue.detailone} name="details" type="text" />
                  <input  onChange={handleChange} type="text" name="urbanPlanningRef"/>
                
                  <button type="submit"> Valider </button>
                </form>
               
      </div>
      <Box>
      <input multiple className="file-input" type="file"  onChange={handleChangeFiles} />
      </Box>
    
    </>

    
  );
};

export default CreateHistoricalData;
