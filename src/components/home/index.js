import HomeLeft from "./left";
import HomeRight from "./right";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/index";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Folder from "../../assets/Folder.png";
import moment from "moment";
import { UpdateStore } from "../../StoreContext";
import BackspaceSharpIcon from "@mui/icons-material/BackspaceSharp";
import Termines from "../../assets/termines.png";
import Cours3 from "../../assets/courset.png";
import { motion } from "framer-motion/dist/framer-motion";

import bg from "../../assets/bg.jpg";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}
const Home = () => {
  const [activeBlock, setActiveBlock] = useState({
    main: true,
    itemone: false,
    itemtwo: false,
    itemthree: false,
  });
  const [animate, setAnimate] = useState(false)
  let [counts, setCount] = useState({});
  let [projects, setProjects] = useState([]);

  const update = UpdateStore();

  useEffect(() => {
    CountsData();
    getLatest();
  }, []);
  const CountsData = () => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/dashboard/casefiles_userwise_count_frontend/${userId?.userid}`
    ).then((res) => {
      console.log("faisl", res);
      if (res.status == 200) {
        setCount(res.data);
      }
    });
    getLatest(userId);
  };

  const getLatest = () => {
    let userId = localStorage.getItem("userData");
    userId = JSON.parse(userId);
    api(
      "get",
      `/api/v1/dashboard/latest_casefiles_frontend/0/${
        userId && userId?.userid
      }`
    ).then((res) => {
      console.log("faisl", res);
      if (res.status == 200) {
        setProjects(res.data);
      }
    });
  };
  return (
    <>
      <Box sx={{ width: "91%" }}>
        {activeBlock.main ? (
          <>
            <Grid container>
              <Grid sx={{ marginBottom: "40px" }} item xs={12}>
                <HomeLeft />
              </Grid>
              {
                <Grid className="cursor" item xs={4}>
                  <div
                    onClick={() => {
                      setActiveBlock(() => {
                        return {
                          main: false,
                          itemone: true,
                          itemtwo: false,
                          itemthree: false,
                        };
                      });
                    }}
                    className="termines_text"
                  >
                    <img
                      src={Termines}
                      style={{ height: "90%", width: "90%" }}
                    />
                    <div className="text">DOSSIERS TERMINÉS</div>
                  </div>
                </Grid>
              }
              <Grid
              className="cursor"
                onClick={() => {
                  setActiveBlock((pre) => {
                    return {
                      main: false,
                      itemone: false,
                      itemtwo: true,
                      itemthree: false,
                    };
                  });
                }}
                item
                xs={4}
              >
                <div className="DOSSIERS_text">
                  <div className="text">MESSAGE(S) RECU(S)</div>
                </div>
                <img
                  onClick={() => {
                    setActiveBlock(() => {
                      return {
                        main: true,
                        itemone: false,
                        itemtwo: false,
                        itemthree: false,
                      };
                    });
                  }}
                  style={{ height: "90%", width: "90%" }}
                  src={Cours3}
                />
              </Grid>
              <Grid className="cursor" item xs={4}>
                <img
                  style={{ height: "90%", width: "83%" }}
                  onClick={() => {
                    update({ activeNavbarTab: "searchestablishment" });
                  }}
                  src={bg}
                />
              </Grid>
            </Grid>
          </>
        ) : null}
        {activeBlock.itemone ? (
          <>
            <BackspaceSharpIcon
             className="cursor"
              onClick={() => {
                setActiveBlock(() => {
                  return {
                    main: true,
                    itemone: false,
                    itemtwo: false,
                    itemthree: false,
                  };
                });
                setAnimate(true)
              }}
            />
            <motion.div
              initial={{ opacity: 0, translateX: -100, translateY: -100 }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                width: "90%",
                marginTop: "10px",
                padding: "20px",
                borderRadius: "21px",
              }}
              className="travail"
            >
              {projects &&
                projects.map((data) => {
                  return (
                    <Box className="recre">
                      <div style={{ display: "flex" }}>
                        <img src={Folder} />
                        <div className="text">
                          <p style={{ fontSize: "14px" }}>
                            {data.communeName} - {data.caseTypeName}
                          </p>
                          <p style={{ fontSize: "16px", fontWeight: "600" }}>
                            {data.establishmentName}
                          </p>
                        </div>
                      </div>
                      <p className="date">
                        Dernière modification le{" "}
                        {moment(data.updatedDate, "YYYY-MM-DD").format(
                          "DD/MM/YY"
                        )}
                      </p>
                    </Box>
                  );
                })}
              <div className="voirtout">
                <p
                  onClick={() => {
                    update({ activeNavbarTab: "newcases" });
                  }}
                >
                  Voir Tout
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
        {activeBlock.itemtwo ? (
          <>
            <BackspaceSharpIcon
             className="cursor"
              sx={{ marginBottom: "10px" }}
              onClick={() => {
                setActiveBlock(() => {
                  return {
                    main: true,
                    itemone: false,
                    itemtwo: false,
                    itemthree: false,
                  };
                });
              }}
            />
            <HomeRight/>
          </>
        ) : null}
        {activeBlock.itemthree ? (
          <>
            <BackspaceSharpIcon
             className="cursor"
              onClick={() => {
                setActiveBlock(() => {
                  return {
                    main: true,
                    itemone: false,
                    itemtwo: false,
                    itemthree: false,
                  };
                });
              }}
            />
          </>
        ) : null}
      </Box>
    </>
  );
};
export default Home;
