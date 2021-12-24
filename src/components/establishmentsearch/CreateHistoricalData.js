import React, { useState, useEffect } from "react";
import api from "../../api/index";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];
const CreateHistoricalData = () => {
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
  establishmentId: "0",
  urbanPlanningRef: ""
  });
  
  const handleChange = (e) => {
    console.log(inputValues.object,inputValues.opinion );
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((preVal) => {
      return {
        ...preVal,
        [name]: value,
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
  console.log("detailValue", inputValues);
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
                  <input  onChange={handleChange} type="file" />
                  <button type="submit"> Valider </button>
                </form>
      </div>
    </>
  );
};

export default CreateHistoricalData;
