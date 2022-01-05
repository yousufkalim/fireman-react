import React, { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import api from "../../api/index";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Description from './Description'
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import {
  Formik,
  Field,
  Form,
  useField,
  useFormikContext,
  FieldArray,
} from "formik";
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const EstablishmentLevel = ({ establishmentid }) => {
  const [dropdownValue, setdropdownValue] = useState({
    leveldropdown: "",
  });
  useEffect(() => {
   api("get","/api/v1/level/dropdown").then((res)=>{
   console.log(res);
   setdropdownValue((preVal) => {
    return {
      ...preVal,
      leveldropdown: res,
    };
  });
   })
  }, [])
  const onSubmit = (values, data) => {
   console.log(values, data);
   const newarr = values.repeatable.map((object) => ({
    ...object,
    establishmentId: "2",
  }));
  api("post", "/api/v1/create_establishment_levels", newarr).then((res)=>{
   console.log(res);

   if(res.status === 200){
    toast.success("Success");
      const obj = {
        establishmentId: 2,
        siteDescription : "dsgfdsgh"
      }
    api("post", "/api/v1/create_establishment_site_description", obj).then((res)=>{
       console.log("response",res)
    })
   }
  }).catch((err)=>{
    if(err){
      toast.error("error")
    }
  })
  
  console.log("newarr",newarr);
  };

  

 
  return (
    <>
      <Formik
        //onSubmit={() => onSubmit()}
        initialValues={{ repeatable: [] }}
        render={({ values, setFieldValue }) => (
          <Form>
            <FieldArray
              name="repeatable"
              render={(arrayHelpers) => (
                <>
                  {values.repeatable.map((row, i) => (
                    <div
                      style={{
                        display: "flex",
                        textAlign: "start",
                        paddingBottom: "15px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "10%",
                          paddingRight: "5px",
                          fontSize: "12px",
                        }}
                      >
                        <label>Niveau </label>
                        <Field
                      //  onClick={addInputs}  
                          as="select"                     
                          style={{ padding: "8px" }}
                          name={`repeatable.${i}.levelId`}
                        >
                        <option value="">Choisissez s'il vous plaît</option>
                        {dropdownValue?.leveldropdown?.data?.map((item) => (
                        <option value={item.value}>{item.text}</option>
                      ))}
                          </Field>
                        <span  onClick={() => { arrayHelpers.push({})
                         setFieldValue(
                          `repeatable.${i+1}.levelId`,
                          values.repeatable[i].levelId
                        );
                      }}> +</span>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "15%",
                          paddingRight: "5px",
                          fontSize: "12px",
                        }}
                      >
                        <label>Numéro cellule </label>
                        <Field
                        type="number"
                          name={`repeatable.${i}.cellNumber`}
                          style={{ padding: "10px" }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "15%",
                          paddingRight: "5px",
                          fontSize: "12px",
                        }}
                      >
                        <label>Nom cellule </label>
                        <Field
                          name={`repeatable.${i}.cellName`}
                          style={{ padding: "10px" }}
                          //onClick={() => arrayHelpers.push({})}
                          // onClick={addRowInputs}
                        />
                         <span onClick={() => { arrayHelpers.push({}) 
                          setFieldValue(
                            `repeatable.${i+1}.levelId`,
                            values.repeatable[i].levelId
                          );
                          setFieldValue(
                            `repeatable.${i+1}.cellNumber`,
                            values.repeatable[i].cellNumber
                          );
                          setFieldValue(
                            `repeatable.${i+1}.cellName`,
                            values.repeatable[i].details
                          );
                        }
                        }>+</span>
                       
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "15%",
                          paddingRight: "5px",
                          fontSize: "12px",
                        }}
                      >
                        <label>Local </label>
                        <Field
                          name={`repeatable.${i}.details`}
                          style={{ padding: "10px" }}
                        />
                         
                      </Box>
                      
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "15%",
                          paddingRight: "5px",
                          fontSize: "10px",
                        }}
                      >   
                       <span>  Non accessible au public </span>    
                        <Box sx={{textAlign:"center", paddingTop:"10px"}}>  
                        <Field
                        type="checkbox"
                          style={{ padding: "10px", zoom:"2" }}
                          name={`repeatable.${i}.isPublic`}
                        />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "15%",
                          paddingRight: "5px",
                          fontSize: "12px",
                        }}
                      >   
                       <span> Local à risques </span>    
                        <Box sx={{textAlign:"center", paddingTop:"8px"}}>  
                        <Field
                        type="checkbox"
                          style={{ padding: "10px", zoom:"2" }}
                          name={`repeatable.${i}.isRisk`}
                        />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "15%",
                          paddingRight: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {/* <label>Référence d’urbanisme </label> */}
                        <BootstrapTooltip title=" Inscrire le numéro de la demande correspondante (PC, AT, courrier...).">
                          <Button
                            sx={{
                              padding: "1px 2px",
                              fontSize: "8px",
                              color: "dimgray",
                            }}
                          >
                           Commentaires
                          </Button>
                        </BootstrapTooltip>
                       
                        <Field
                          style={{ padding: "10px" }}
                          name={`repeatable.${i}.comments`}
                        />
                      </Box>
                    </div>
                  ))}
                  <Box sx={{ textAlign: "start", padding: "5px" }}>
                    <AddIcon onClick={() => arrayHelpers.push({})} />
                  </Box>
                </>
              )}
            />
            {/* <Box sx={{ textAlign: "end", padding: "10px" }}>
              <Button type="submit" variant="contained">
                Valider
              </Button>
            </Box> */}


            <Description onSubmit={onSubmit} values={values}/>
          </Form>
        )}


      />
    </>
  );
};

export default EstablishmentLevel;
