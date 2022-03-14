import Termines from "../../assets/termines.png";
import Travail1 from "../../assets/travail1.png";
import Travail2 from "../../assets/travail2.png";
import Folder from "../../assets/Folder.png";
import api from "../../api/index";
import { useEffect, useState } from "react";
import { UpdateStore } from "../../StoreContext";
import moment from "moment";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
const HomeLeft = ({ setBox, box }) => {
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
      <Box className="parent-left-box">
        <Box className="heading1">
          {" "}
          <p>Bonjour Ludovic, vous avez : </p>{" "}
        </Box>
        <Box className="countData">
          <Box sx={{ width: "38%" }}>
            <p className="count">
              {counts.completed ? counts.completed : 0}
            </p>
            <p className="count_des">DOCUMENT(S) TÉRMINÉ(S)</p>
          </Box>
          <Box sx={{ width: "38%" }}>
            <p className="count">
              {counts.inProgress ? counts.inProgress : 0}
            </p>
            <p className="count_des">MESSAGE(S) RECU(S)</p>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeLeft;
