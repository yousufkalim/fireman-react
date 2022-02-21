import Cours1 from "../../assets/cours1.png";
import Cours2 from "../../assets/cours2.png";
import Cours3 from "../../assets/cours3.png";
import Cours4 from "../../assets/resss.png";
import Folder from "../../assets/Folder.png";
import { useEffect, useState } from "react";
import "react-sweet-progress/lib/style.css";
import { UpdateStore } from "../../StoreContext";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import api from "../../api/index";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  width: 150,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "blue"],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#3675B7",
  },
}));
const HomeRight = ({ box, setBox }) => {
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
      {/* <Box>
        <div class="flip-box-right">
          <div class="flip-box-inner-right">
            <div class="flip-box-front-right">
              <div className="v-text">
                <p className="vertical_text">AU COEUR DE L’ACTION </p>
                <div class="vl"></div>
              </div>
              <Box sx={{ marginRight: "10px" }}>
                <img className="img-one-right" src={Cours2} />
                <img className="img-two-right" src={Cours1} />
              </Box>
              <Box className="DOSSIERS_text">
                <img style={{ height: "345px", width: "330px" }} src={Cours3} />

                <div className="text">DOSSIERS EN COURS</div>
              </Box>
            </div>

            <div class="flip-box-back-right">
              <div className="v-text">
                <p className="vertical_text">DOSSIERS EN COURS</p>
                <div class="vl-dosier"></div>
              </div> */}
             
              <div className="hoverbox-right">
            
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
                        <Box className="percentage">
                          <p> {data.completionPercentage}%</p>
                          <BorderLinearProgress
                            sx={{ background: "#E7F0F3" }}
                            variant="determinate"
                            value={data.completionPercentage}
                          />
                        </Box>
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

            {/* </div>
          </div>
        </div>
      </Box>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="accueilHome_right_bottom"
      >
        <div
          onClick={() => {
            update({ activeNavbarTab: "searchestablishment" });
          }}
          className="allonys"
        >
          <img src={Cours4} className="btm-img" />
          <div className="text">UN NOUVEAU DOSSIER ? C’EST PARTI !</div>
          <Box sx={{ padding: "0px 6px" }}>
            <div class="vl"></div>
            <p className="vertical_text">ALLONS-Y</p>
          </Box>
        </div>
      </div> */}
    </>
  );
};

export default HomeRight;
