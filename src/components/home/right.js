import Cours1 from "../../assets/cours1.png";
import Cours2 from "../../assets/cours2.png";
import Cours3 from "../../assets/cours3.png";
import Cours4 from "../../assets/cours4.png";
import Folder from "../../assets/Folder.png";
import { useEffect, useState } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { Store } from "../../StoreContext";
import { UpdateStore } from "../../StoreContext";
import Box from "@mui/material/Box";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import moment from "moment";
import api from "../../api/index";

const HomeRight = ({box ,setBox}) => {
 
  const update = UpdateStore();
  let history = useHistory();

  let [projects, setProjects] = useState([]);
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/dashboard/latest_casefiles_frontend/1/${userId?.userid}`
    ).then((res) => {
      console.log("faisl", res);
      if (res.status == 200) {
        setProjects(res.data);
      }
    });
  }, []);

  return (
    <>
     
                
      <Box sx={{ position: "relative" }}>
        {box ? (
          <div className="v-text">
            <p className="vertical_text">DOSSIERS EN COURS</p>
            <div class="vl-dosier"></div>
          </div>
        ) : (
          <div className="v-text">
            <p className="vertical_text">AU COEUR DE L’ACTION </p>
            <div class="vl"></div>
          </div>
        )}
      </Box>
      <div  class="flip-box">
        <div  class="flip-box-inner">
          <div class="flip-box-front">
            <div
              className="cours"
              onMouseEnter={() => {
                setBox(true);
                console.log("hovered");
              }}
              onMouseLeave={()=>{ setBox(false)}}
            >
              <div className="coursimages">
                <img className="img-one-right" src={Cours2} />
                <img className="img-two-right" src={Cours1} />
              </div>
              <div className="DOSSIERS_text">
                <img style={{ height: "345px", width: "330px" }} src={Cours3} />
                <div className="text">DOSSIERS EN COURS</div>
              </div>
            </div>
          </div>
          <div class="flip-box-back"  onMouseLeave={() => {
                setBox(false);
                console.log("leave");
              }}>
            <div
              className="hoverbox-right"
            >
              {projects &&
                projects.map((data) => {
                  return (
                    <div className="recre">
                      <div style={{ display: "flex" }}>
                        <img src={Folder} />
                        <div className="text">
                          <p style={{ fontSize: "14px" }}>
                            {data.communeName} - {data.caseTypeName}
                          </p>
                          <p style={{ fontSize: "15px", fontWeight: "600" }}>
                            {data.establishmentName}
                          </p>
                        </div>
                      </div>
                      <div className="progress">
                        <Progress percent={data.completionPercentage} />
                      </div>
                    </div>
                  );
                })}
              <div className="voirtout">
                <p
                  onClick={() => {
                    update({ activeNavbarTab: "currentcases" });
                  }}
                >
                  Voir Tout
                </p>
              </div>
            </div>
          </div>
        </div>
        <div  onMouseLeave={() => {
                setBox(false);
                console.log("leave");
              }} className="accueilHome_right_bottom">
          <div
            onClick={() => {
              update({ activeNavbarTab: "searchestablishment" });
            }}
            className="allonys"
          >
            <img src={Cours4} className="btm-img"/>
            <div className="text">UN NOUVEAU DOSSIER ? C’EST PARTI !</div>
          </div>
          <div>
            <div class="vl"></div>
            <p
              style={{ marginLeft: "13px", marginTop: "9px" }}
              className="vertical_text"
            >
              ALLONS-Y
            </p>
          </div>
        </div>
      </div>

      {
        //    lowerpart
      }
    </>
  );
};

export default HomeRight;
