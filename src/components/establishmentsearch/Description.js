import React,{useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { Box } from "@mui/system";
const Description = ({values,onSubmit}) => {


    const [inputValues, setInputValues] = useState({
        site:"",
        establishmentdescription:"",
        radiobuttonsgroup:""
    })
    const  onChange =(e)=>{
          const name = e.target.name;
          const value = e.target.value;
          console.log(value);
          setInputValues((pre)=>{
             return{
                 ...pre,
                 [name]:value
             }
          })
    }
    const onSubmitFields =( )=>{
        onSubmit(values, inputValues)
    }
    console.log(values);
  return (
     
    <>
      <Box style={{backgroundColor:"#3675b7", padding:"10px", marginTop:"20px"}}>
        <Accordion sx={{backgroundColor:"lightskyblue"}}>
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
              name="siteDescription"
              placeholder="Rappel: un site est un ensemble d’établissements isolés exploités par la même personne physique ou morale.
              Exemple: Lycée dont l’internat, l’externat, le gymnase et le restaurant scolaire sont des établissements isolés.
              Exemple de rédaction du descriptif d’un site : 
              « Le site GROUPE SCOLAIRE DE LA REPUBLIQUE comprend plusieurs établissements isolés:
              - l’établissement ECOLE PRIMAIRE, de type R de 3ecatégorie;
              - L’établissement ECOLE MATERNELLE, de type R de 3ecatégorie;
              - L’établissement RESTAURANT SCOLAIRE, de type N de 4ecatégorie. "
              style={{ width: 600, height:200, padding:"30px" }}
              onChange={onChange}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{backgroundColor:"lightskyblue"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Descriptif présentant l’établissement et les activités</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              name="establishmentdescription"
              placeholder="Décrire en quelques mots le statut, les activités et le type de bâtiment. Le texte apparaitra dans le rapport juste avant le descriptif.
              ETABLISSEMENT SIMPLE
              Ex: Il s’agit d’un EHPAD de 80 lits dans un bâtiment du type R+4. 
              GROUPEMENT D’ETABLISSEMENT
              Ex: Il s’agit d’un groupement d’établissements comprenant xx cellules (commerces, cabinet médical, bureaux). Le bâtiment est du type R+1-1."
              style={{ width: 600,height:200, padding:"30px" }}
              onChange={onChange}
            />
           
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{backgroundColor:"lightskyblue"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Plancher bas du dernier niveau accessible</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{textAlign:"start"}}>
          <FormControl  component="fieldset">
      <RadioGroup
       onChange={onChange}
        name="radiobuttonsgroup"
      >
        <FormControlLabel value="0" control={<Radio />} label="More than 8 m" />
        <FormControlLabel value="1" control={<Radio />} label="Less than 8 m" />
      </RadioGroup>
    </FormControl>
          </AccordionDetails>
        </Accordion>
        <Box sx={{ textAlign: "end", padding: "10px" }}>
              <Button onClick={onSubmitFields} type="submit" variant="contained">
                Valider
              </Button>
            </Box>
      </Box>
    </>
  );
};

export default Description;
