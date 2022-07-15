import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Folder from "../../assets/Folder.png";
import { useEffect, useState } from "react";
import "react-sweet-progress/lib/style.css";
import { UpdateStore } from "../../StoreContext";
import Box from "@mui/material/Box";
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
const HomeRight = ({ 
  box, 
  setBox 
}) => {
  const update = UpdateStore();
  let [projects, setProjects] = useState([]);
  useEffect(() => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/dashboard/latest_casefiles_frontend/1/${userId?.userid}`
    ).then((res) => {
      if (res.status == 200) {
        setProjects(res.data);
      }
    });
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateX: -100, translateY: -100 }}
        animate={{ opacity: 1, translateX: 0, translateY: 0 }}
        transition={{ duration: 1.5 }}
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
                      {data?.communeName} - {data?.caseTypeName}
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>
                      {data?.establishmentName.length>20? data?.establishmentName?.slice(0,40)+"...":data?.establishmentName}
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
      </motion.div>
    </>
  );
};

export default HomeRight;
