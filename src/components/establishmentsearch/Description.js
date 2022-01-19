import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Rightarrow from "../../assets/rightarrow.png";
const Description = ({ values, onSubmit, description }) => {
  const [inputValues, setInputValues] = useState({
    site: description?.siteDescription ? description?.siteDescription : "",
    establishmentdescription: description?.description
      ? description?.description
      : "",
    lessEightMeter:description?.lessEightMeter?description?.lessEightMeter: "",
    moreEightMeter: description?.moreEightMeter?description?.moreEightMeter: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const onChangeCheckBox =(e)=>{
    const name = e.target.name;
    const checked= e.target.checked;
    setInputValues((pre) => {
      return {
        ...pre,
        [name]: checked,
      };
    });
  }
  console.log(inputValues);
  
  const onSubmitFields = () => {
    onSubmit(values, inputValues);
  };
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          marginTop: "20px",
          color:"#C5D3DB"
        }}
     >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Site (si concerné)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              name="site"
              value={inputValues.site}
              className="textarea-width"
              placeholder="Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
              Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
              Exemple de rédaction du descriptif d’un site : 
              « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
              - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
              - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
              - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie. "
              sx={{ width: 600, height: 200, padding: "30px", background:"aliceblue" }}
              onChange={onChange}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              Descriptif présentant l’établissement et les activités
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              name="establishmentdescription"
              value={inputValues.establishmentdescription}
              placeholder="Décrire en quelques mots le statut, les activités et le type de bâtiment. Le texte apparaitra dans le rapport juste avant le descriptif.
              ETABLISSEMENT SIMPLE
              Ex: Il s’agit d’un EHPAD de 80 lits dans un bâtiment du type R+4. 
              GROUPEMENT D’ETABLISSEMENT
              Ex: Il s’agit d’un groupement d’établissements comprenant xx cellules (commerces, cabinet médical, bureaux). Le bâtiment est du type R+1-1."
              className="textarea-width"
              onChange={onChange}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Plancher bas du dernier niveau accessible</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "start" }}>
           
              <Box sx={{
                display:"flex",
                paddingBottom:"10px"
            }}>
              <label>
                  {" "}
                  Less Eight Meter 
                </label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="lessEightMeter"
                  defaultChecked={description?.lessEightMeter}
                  onChange={onChangeCheckBox}
                />
                </Box>
                <Box
                sx={{display:"flex"}}
                >
                <label>
                  {" "}
                  More Eight Meter 
                </label>
                <input
                  className="checkbox"
                  type="checkbox"
                  name="moreEightMeter"
                  defaultChecked={description?.moreEightMeter}
                  onChange={onChangeCheckBox}
                />
              </Box>
           
          </AccordionDetails>
        </Accordion>
        <Box sx={{ textAlign: "right", padding:"10px" }}>
                  <Button
                    type="submit"
                    onClick={onSubmitFields}
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
      </Box>
    </>
  );
};

export default Description;
