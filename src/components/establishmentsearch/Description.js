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
  console.log("description",description);
  const [inputValues, setInputValues] = useState({
    site: description?.siteDescription ? description?.siteDescription : "",
    establishmentdescription: description?.description
      ? description?.description
      : "",
    lessEightMeter: description?.lessEightMeter
      ? description?.lessEightMeter
      : "",
    moreEightMeter: description?.moreEightMeter
      ? description?.moreEightMeter
      : "",
  });

  useEffect(() => {
    setInputValues(() => {
      return {
        site: description?.siteDescription ? description?.siteDescription : "",
        establishmentdescription: description?.description
          ? description?.description
          : "",
        lessEightMeter: description?.lessEightMeter
          ? description?.lessEightMeter
          : "",
        moreEightMeter: description?.moreEightMeter
          ? description?.moreEightMeter
          : "",
      };
    });
  }, [description]);
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value);
    setInputValues((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  
  const onSubmitFields = () => {
    console.log("inputValuesfcgvjhbkn",inputValues);
    onSubmit(values, inputValues);
  };
  return (
    <>
      <Box
        style={{
          backgroundColor: "#3675b7",
          padding: "10px",
          marginTop: "20px",
        }}
     >
        <Accordion sx={{ backgroundColor: "lightskyblue" }}>
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
              placeholder="Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
              Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
              Exemple de rédaction du descriptif d’un site : 
              « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
              - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
              - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
              - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie. "
              style={{ width: 600, height: 200, padding: "30px" }}
              onChange={onChange}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "lightskyblue" }}>
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
              style={{ width: 600, height: 200, padding: "30px" }}
              onChange={onChange}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: "lightskyblue" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Plancher bas du dernier niveau accessible</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "start" }}>
            <div>
              <Box>
              <label>
                  {" "}
                  Less Eight Meter {console.log(inputValues?.moreEightMeter)}
                </label>
                <input
                  type="checkbox"
                  name="lessEightMeter"
                  defaultChecked={description?.lessEightMeter}
                  onChange={onChange}
                />
                <label>
                  {" "}
                  More Eight Meter {console.log(inputValues?.moreEightMeter)}
                </label>
                <input
                  type="checkbox"
                  name="moreEightMeter"
                  defaultChecked={description?.moreEightMeter}
                  onChange={onChange}
                />
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    onClick={onSubmitFields}
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
      </Box>
    </>
  );
};

export default Description;
