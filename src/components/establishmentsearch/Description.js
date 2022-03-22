import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Store } from "../../StoreContext";
import Rightarrow from "../../assets/rightarrow.png";
import { useTranslation, Trans } from "react-i18next";
import don from '../../assets/donne.svg'
import Tooltip from '@mui/material/Tooltip';
const Description = ({ values, onSubmit, description, buttonEnability }) => {
  const { t, i18n } = useTranslation();
  const store = Store();
  const [tooltip, setTooltip] = useState(
    {one:`Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
  Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
  Exemple de rédaction du descriptif d’un site : 
  « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
  - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
  - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
  - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie.`,
  two:`Décrire en quelques mots le statut, les activités et le type de bâtiment. Le texte apparaitra dans le rapport juste avant le descriptif.
  ETABLISSEMENT SIMPLE
  Ex: Il s’agit d’un EHPAD de 80 lits dans un bâtiment du type R+4. 
  GROUPEMENT D’ETABLISSEMENT
  Ex: Il s’agit d’un groupement d’établissements comprenant xx cellules (commerces, cabinet médical, bureaux). Le bâtiment est du type R+1-1."
  className="textarea-width`
    })
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
    setInputValues({
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
    })
   }, [description]);
   
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
  const onChangeCheckBox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    setInputValues((pre) => {
      return {
        ...pre,
        [name]: checked,
      };
    });
  };
  const onSubmitFields = () => {
    onSubmit(values, inputValues);
  };
  
 
  
  console.log("description",description);
  console.log("values",values);
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          marginTop: "20px",
          color: "#C5D3DB",
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography  className="label-textarea">{t("Site (if applicable)")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Tooltip title={tooltip.one}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              name="site"
              value={inputValues?.site}
              className="textarea-width"
              placeholder="Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
              Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
              Exemple de rédaction du descriptif d’un site : 
              « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
              - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
              - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
              - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie. "
              onChange={onChange}
            />
             </Tooltip>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="label-textarea" >
              {t("Description presenting the establishment and the activities")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Tooltip title={tooltip.two}>
            <TextareaAutosize
            style={{
              background:"#F1F5F9"
            }}
              aria-label="minimum height"
              minRows={3}
              name="establishmentdescription"
              value={inputValues?.establishmentdescription}
              placeholder="Décrire en quelques mots le statut, les activités et le type de bâtiment. Le texte apparaitra dans le rapport juste avant le descriptif.
              ETABLISSEMENT SIMPLE
              Ex: Il s’agit d’un EHPAD de 80 lits dans un bâtiment du type R+4. 
              GROUPEMENT D’ETABLISSEMENT
              Ex: Il s’agit d’un groupement d’établissements comprenant xx cellules (commerces, cabinet médical, bureaux). Le bâtiment est du type R+1-1."
              className="textarea-width"
              onChange={onChange}
            />
              </Tooltip>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className="label-textarea" >
              {t("Low floor of the last accessible level")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "start" }}>
            <Box
              sx={{
                display: "flex",
                paddingBottom: "10px",
              }}
            >
              <label className="label-descriptif"> {t("Less Eight Meter")}</label>
              <input
                className="checkbox"
                type="checkbox"
                name="lessEightMeter"
                defaultChecked={description?.lessEightMeter}
                onChange={onChangeCheckBox}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <label className="label-descriptif"> {t("More Eight Meter")}</label>
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
        <Box sx={{ textAlign: "right", padding: "10px" }}>
          <Button
            type="submit"
            onClick={onSubmitFields}
            disabled={buttonEnability?.establishmentlevelbutton}
            endIcon={<img className="icon-validate" src={Rightarrow} />}
            sx={{
              background: "#3675B7",
              ":hover": { background: "#3675B7" },
            }}
            variant="contained"
          >
            {t("VALIDATE")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Description;
