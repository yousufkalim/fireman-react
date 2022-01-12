import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import api from '../../api';
import { toast } from "react-toastify";
import { Store } from "../../StoreContext";
import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import Rightarrow from "../../assets/rightarrow.png";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Ranking = ({establishmentid}) => {
    const [dropdownValue, setdropdownValue] = useState({
        rankingorder: "",
        status: "",
        ranking: "",
        classification: "",
        apidropdowndata:""
      });
      const [inputValues, setInputValues] = useState({
        categoryRankingId: dropdownValue.apidropdowndata.categoryRankingId? dropdownValue.apidropdowndata.categoryRankingId:"",
        rankingStatusId:dropdownValue.apidropdowndata.rankingStatusId? dropdownValue.apidropdowndata.rankingStatusId: "",
        rankingOrderId:dropdownValue.apidropdowndata.rankingOrderId?dropdownValue.apidropdowndata.rankingOrderId: "",
        rankingClassificationId:dropdownValue.apidropdowndata.rankingClassificationId?dropdownValue.apidropdowndata.rankingClassificationId: "",
      });
      const [toggle, setToggle] = useState(false);
      const [iconState, setIconState] = useState(false);
      const store = Store();
      useEffect(() => {
        api("get", "/api/v1/classification/dropdown").then((res) =>
        setdropdownValue((preVal) => {
          return {
            ...preVal,
            classification: res,
          };
        })
      );
      api("get", "/api/v1/status/dropdown").then((res) =>
        setdropdownValue((preVal) => {
          return {
            ...preVal,
            status: res,
          };
        })
      );
      api("get", "/api/v1/categoryranking/dropdown").then((res) =>
        setdropdownValue((preVal) => {
          return {
            ...preVal,
            ranking: res,
          };
        })
      );
      api("get", "/api/v1/rankingorder/dropdown").then((res)=>{
        setdropdownValue((preVal) => {
            return {
              ...preVal,
              rankingorder: res,
            };
          })
      })

      if(store.activeCase === "currentcases"){
        api("get", `/api/v1/get_establishment_ranking/${establishmentid}`).then((res)=>{
            setdropdownValue((pre)=>{
                return{
                  ...pre,
                  apidropdowndata: res.data
                }
            })
           })
      }
      }, [])

      useEffect(() => {
        setInputValues(() => {
            return{
                categoryRankingId: dropdownValue.apidropdowndata.categoryRankingId? dropdownValue.apidropdowndata.categoryRankingId:"",
                rankingStatusId:dropdownValue.apidropdowndata.rankingStatusId? dropdownValue.apidropdowndata.rankingStatusId: "",
                rankingOrderId:dropdownValue.apidropdowndata.rankingOrderId?dropdownValue.apidropdowndata.rankingOrderId: "",
                rankingClassificationId:dropdownValue.apidropdowndata.rankingClassificationId?dropdownValue.apidropdowndata.rankingClassificationId: "",        
            }
               })
    }, [dropdownValue.apidropdowndata])
      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValues((preVal) => {
          return {
            ...preVal,
            [name]: value,
          };
        });
      };
      const focusPoint = useRef(null);
      const handleSubmit =(e)=>{
        e.preventDefault();
        const newObj={
            ...inputValues,
            establishmentId:establishmentid
        }

        console.log(newObj);
       api("put","/api/v1/establishment_ranking_details",newObj).then((res)=>{

        console.log(res);
          if(res.status===200){
              toast.success("success")
          }
       })
        console.log(inputValues);
      }
      console.log(dropdownValue.apidropdowndata.rankingOrderId);
      const toggleSection = () => {
        setToggle(!toggle);
        toggle
          ? (focusPoint.current.style.display = "none")
          : (focusPoint.current.style.display = "block");
      };
    return (
        <>  
        <Box sx={{display:"flex", 
        justifyContent:"space-between",  
        borderBottom:"1px solid #C5D3DB", 
        margin:"12px 4px"}}
        onClick={toggleSection}
        > 
     <Typography sx={{color:"#314A6C"}} variant="h6">
     Classement
</Typography>
<div>
          {iconState ? <DoneIcon/> : null}
          <Typography sx={{ color: "#A2AABE" }} variant="span">
            Réduire
          </Typography>
        </div>
        </Box>
        <Item ref={focusPoint} sx={{ boxShadow: "none" }}> 
           <form
                className="establishment-form"
                type="submit"
                onSubmit={handleSubmit}
              ></form>
           <select
                     className="select-input dropdown-ranking"
                      type="select"
                      name="rankingOrderId"
                      onChange={handleChange}
                      value={inputValues.rankingOrderId}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.rankingorder.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>
                    <select
                     className="select-input dropdown-ranking"
                      type="select"
                      name="rankingStatusId"
                      onChange={handleChange}
                      value={inputValues.rankingStatusId}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.status.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>  
                    <select
                     className="select-input dropdown-ranking"
                      type="select"
                      name="categoryRankingId"
                      value={inputValues.categoryRankingId}
                      onChange={handleChange}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.ranking.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>  
                    <select
                     className="select-input dropdown-ranking"
                      type="select"
                      name="rankingClassificationId"
                      value={inputValues.rankingClassificationId}
                      onChange={handleChange}
                    >
                      <option value="">Choisissez s'il vous plaît</option>
                      {dropdownValue.classification.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.text}
                        </option>
                      ))}
                    </select>  
                    <Box sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    endIcon={<img className="" src={Rightarrow} />}
                    sx={{
                      background: "#3675B7",
                      ":hover": { background: "#3675B7" },
                    }}
                    variant="contained"
                  >
                    Valider
                  </Button>
                </Box>
                    <form/>

                    </Item>
        </>
    )
}

export default Ranking
